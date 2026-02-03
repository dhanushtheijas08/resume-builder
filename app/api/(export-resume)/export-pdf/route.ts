import { getResumeHtml } from "@/lib/renderResumeHtml";
import { fetchResumeById } from "@/lib/queries/resume";
import { OBJECT_ID_REGEX } from "@/lib/const";
import { NextRequest, NextResponse } from "next/server";
import { ActionError } from "@/lib/safe-action";
import { ResumeData } from "@/components/resume/resume-preview";
import { LaunchOptions } from "puppeteer-core";
import { uploadResumePdf, getResumeDownloadUrl } from "@/lib/file-uploader";
import prisma from "@/lib/prisma";
import { getEnv } from "@/lib/env";

const CHROMIUM_PACK_URL = getEnv("CHROMIUM_PACK_URL");

const A4_CONFIG = {
  HEIGHT_PX: 1123,
  PADDING_PX: 40,
  get USABLE_HEIGHT() {
    return this.HEIGHT_PX - this.PADDING_PX * 2;
  },
};

let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

const getChromiumPath = async (): Promise<string | null> => {
  if (cachedExecutablePath) return cachedExecutablePath;

  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium
      .executablePath(CHROMIUM_PACK_URL)
      .then((path) => {
        cachedExecutablePath = path;
        console.log("Chromium path resolved:", path);
        return path;
      })
      .catch((error) => {
        console.error("Failed to get Chromium path:", error);
        downloadPromise = null;
        throw error;
      });
  }

  return downloadPromise;
};

const getBrowserLaunchOptions = async (): Promise<{
  puppeteer: typeof import("puppeteer-core") | typeof import("puppeteer");
  launchOptions: LaunchOptions;
}> => {
  const baseLaunchOptions: LaunchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };

  if (process.env.NODE_ENV === "production") {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    const puppeteer = await import("puppeteer-core");
    const chromiumPath = await getChromiumPath();

    return {
      puppeteer,
      launchOptions: {
        ...baseLaunchOptions,
        args: chromium.args,
        executablePath: chromiumPath || undefined,
      },
    };
  }

  const puppeteer = await import("puppeteer");
  return { puppeteer, launchOptions: baseLaunchOptions };
};

const paginateResumeContent = () => {
  const USABLE_HEIGHT = 1123 - 40 * 2;

  function getFullHeight(element: HTMLElement): number {
    const styles = window.getComputedStyle(element);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    return element.offsetHeight + marginTop + marginBottom;
  }

  const container = document.getElementById("resume-container")!;
  const sections = Array.from(container.querySelectorAll("section"));

  const pages: HTMLElement[][] = [];
  let currentPage: HTMLElement[] = [];
  let usedHeight = 0;

  for (const section of sections) {
    const sectionHeight = getFullHeight(section as HTMLElement);

    if (usedHeight + sectionHeight <= USABLE_HEIGHT) {
      currentPage.push(section as HTMLElement);
      usedHeight += sectionHeight;
      continue;
    }

    for (const child of Array.from(section.children) as HTMLElement[]) {
      const h = getFullHeight(child);

      if (usedHeight + h > USABLE_HEIGHT) {
        pages.push([...currentPage]);
        currentPage = [];
        usedHeight = 0;
      }

      currentPage.push(child);
      usedHeight += h;
    }
  }

  if (currentPage.length) pages.push([...currentPage]);

  // Rebuild DOM with pages
  container.innerHTML = "";
  pages.forEach((pageElements) => {
    const pageDiv = document.createElement("div");
    pageDiv.className = "page";
    pageElements.forEach((el) => {
      pageDiv.appendChild(el.cloneNode(true));
    });
    container.appendChild(pageDiv);
  });
};

const generatePdfHtml = async (resumeData: ResumeData): Promise<string> => {
  const html = await getResumeHtml({ resumeData });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>
          @page { 
            size: A4; 
            margin: 0;
          }
          body { 
            margin: 0;
            padding: 0;
          }
          
          #resume-container {
            width: 210mm;
            margin: 0;
            padding: 0;
          }

          .page {
            width: 210mm;
            min-height: 297mm;
            max-height: 297mm;
            padding: ${A4_CONFIG.PADDING_PX}px;
            box-sizing: border-box;
            page-break-after: always;
            break-after: page;
            overflow: hidden;
          }

          .page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
          
          .resume-ul {
            @apply list-disc pl-6 my-2;
          }

          .resume-ol {
            @apply list-decimal pl-6 my-2;
          }

          .resume-li {
            @apply leading-6;
          }

          ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }

          ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }

          li {
            line-height: 1.5rem;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
};

const generatePdfBuffer = async (
  resumeData: ResumeData,
): Promise<{ buffer: Uint8Array; closeBrowser: () => Promise<void> }> => {
  const { puppeteer, launchOptions } = await getBrowserLaunchOptions();
  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    const html = await generatePdfHtml(resumeData);

    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluate(paginateResumeContent);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
      preferCSSPageSize: true,
    });

    return {
      buffer: pdfBuffer,
      closeBrowser: () => browser.close(),
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
};

const mapResumeToData = (
  resume: NonNullable<Awaited<ReturnType<typeof fetchResumeById>>>,
): ResumeData => ({
  profile: resume.profile,
  workExperiences: resume.workExperiences,
  educations: resume.educations,
  skills: resume.skills,
  projects: resume.projects,
  certifications: resume.certifications,
  awards: resume.awards,
  publications: resume.publications,
  customSections: resume.customSection ?? [],
});

export async function POST(request: NextRequest) {
  let closeBrowser: (() => Promise<void>) | null = null;

  try {
    const body = await request.json();
    const { resumeId } = body;

    if (!resumeId || !OBJECT_ID_REGEX.test(resumeId)) {
      return NextResponse.json(
        { error: "Invalid or missing resumeId" },
        { status: 400 },
      );
    }

    const resume = await fetchResumeById(resumeId);
    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (
      resume.exportedResumeUrl &&
      resume.lastExportedAt &&
      resume.updatedAt.getTime() <= resume.lastExportedAt.getTime()
    ) {
      const url = await getResumeDownloadUrl(
        resume.exportedResumeUrl,
        resume.title,
      );
      return NextResponse.json({ url }, { status: 200 });
    }

    const resumeData = mapResumeToData(resume);
    const { buffer, closeBrowser: close } = await generatePdfBuffer(resumeData);
    closeBrowser = close;

    const key = await uploadResumePdf({
      fileBuffer: buffer,
      userId: resume.userId,
      resumeId: resume.id,
      fileName: resume.title,
    });

    await closeBrowser();
    closeBrowser = null;

    await prisma.resume.update({
      where: { id: resume.id },
      data: {
        exportedResumeUrl: key,
        lastExportedAt: new Date(),
      },
    });

    const url = await getResumeDownloadUrl(key, resume.title);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error generating PDF:", error);

    if (error instanceof ActionError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  } finally {
    if (closeBrowser) {
      await closeBrowser();
    }
  }
}

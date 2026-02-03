import { getResumeHtml } from "@/lib/renderResumeHtml";
import { fetchResumeById } from "@/lib/queries/resume";
import { OBJECT_ID_REGEX } from "@/lib/const";
import { NextRequest } from "next/server";
import { ActionError } from "@/lib/safe-action";
import { ResumeData } from "@/components/resume/resume-preview";
import { LaunchOptions } from "puppeteer-core";

let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

const getChromiumPath = async (): Promise<string | null> => {
  if (cachedExecutablePath) return cachedExecutablePath;
  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium
      .executablePath()
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

// chromium.tar;
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const resumeId = searchParams.get("resumeId");

  if (!resumeId || !OBJECT_ID_REGEX.test(resumeId)) {
    return new Response(
      JSON.stringify({ error: "Invalid or missing resumeId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  let browser = null;

  try {
    const resume = await fetchResumeById(resumeId);

    if (!resume) {
      return new Response(JSON.stringify({ error: "Resume not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resumeData = {
      profile: resume.profile,
      workExperiences: resume.workExperiences,
      educations: resume.educations,
      skills: resume.skills,
      projects: resume.projects,
      certifications: resume.certifications,
      awards: resume.awards,
      publications: resume.publications,
      customSections: resume.customSection ?? [],
    };

    let puppeteer = null;
    let launchOptions: LaunchOptions = {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };

    if (process.env.NODE_ENV === "production") {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      puppeteer = await import("puppeteer-core");

      const chromiumPath = await getChromiumPath();
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: chromiumPath || undefined,
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch({
      ...launchOptions,
    });
    const page = await browser.newPage();

    const html = await generatePdf(resumeData);
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    await page.evaluate(() => {
      const A4_HEIGHT_PX = 1123;
      const PADDING_PX = 40;
      const USABLE_HEIGHT = A4_HEIGHT_PX - PADDING_PX * 2;

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
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (error instanceof ActionError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

const generatePdf = async (resumeData: ResumeData) => {
  const html = await getResumeHtml({
    resumeData,
  });
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
            padding: 40px;
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
            padding-left: 1.5rem; /* pl-6 */
            margin-top: 0.5rem;   /* my-2 */
            margin-bottom: 0.5rem;
          }

          ol {
            list-style-type: decimal;
            padding-left: 1.5rem; /* pl-6 */
            margin-top: 0.5rem;   /* my-2 */
            margin-bottom: 0.5rem;
          }

          li {
            line-height: 1.5rem; /* leading-6 */
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
};

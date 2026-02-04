import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PAGE_SIZE = 9;

const EXPERIENCE_FILTER_RANGES: Record<
  string,
  { min: number; max: number | null }
> = {
  "Entry Level": { min: 0, max: 2 },
  "Mid Level": { min: 2, max: 5 },
  Senior: { min: 5, max: 8 },
  Lead: { min: 8, max: 12 },
  Executive: { min: 12, max: null },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = searchParams.get("page") ?? "1";
    const pageSizeParam =
      searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE.toString();

    const page = Math.max(parseInt(pageParam, 10) || 1, 1);
    const pageSize = Math.max(
      parseInt(pageSizeParam, 10) || DEFAULT_PAGE_SIZE,
      1,
    );

    const role = searchParams.get("role");
    const company = searchParams.get("company");
    const experienceLabel = searchParams.get("experience");

    const where: Record<string, unknown> = {};

    if (role && role !== "All") {
      where.role = role;
    }

    if (company && company !== "All") {
      where.company = company;
    }

    if (experienceLabel && experienceLabel !== "All") {
      const range = EXPERIENCE_FILTER_RANGES[experienceLabel];

      if (range) {
        if (range.max === null) {
          where.experience = {
            gte: range.min,
          };
        } else {
          where.experience = {
            gte: range.min,
            lt: range.max,
          };
        }
      }
    }

    const [total, templates] = await Promise.all([
      prisma.resumeTemplate.count({ where }),
      prisma.resumeTemplate.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.max(Math.ceil(total / pageSize), 1);

    console.log({ templates });

    return NextResponse.json({
      data: {
        templates,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error("[RESUME_TEMPLATES_GET_ERROR]", error);

    return NextResponse.json(
      { error: "Failed to fetch resume templates" },
      { status: 500 },
    );
  }
}

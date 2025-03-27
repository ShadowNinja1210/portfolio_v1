import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mohitjeswani.live";

  const robots = `
    User-agent: *
    Allow: /
    Disallow: /api/
    
    Sitemap: ${baseUrl}/sitemap.xml
  `;

  return new NextResponse(robots, {
    headers: { "Content-Type": "text/plain" },
  });
};

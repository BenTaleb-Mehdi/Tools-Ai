import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // 1. Read posts.json nishan
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
  const fileContents = fs.readFileSync(jsonPath, 'utf8');
  const posts = JSON.parse(fileContents);

  // 2. Build RSS XML string
  let rssItemsXml = '';
  posts.forEach((post: any) => {
    rssItemsXml += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>${post.link}</link>
        <guid isPermaLink="true">${post.link}</guid>
        <enclosure url="${post.image_url}" type="image/jpeg" />
      </item>
    `;
  });

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>The AI Artisan Feed</title>
        <link>https://prompttocraft.vercel.app</link>
        <description>AI Tools and Smart Selling Hacks for Etsy</description>
        <language>en-us</language>
        ${rssItemsXml}
      </channel>
    </rss>
  `;

  // 3. Return as XML Content-Type
  return new NextResponse(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
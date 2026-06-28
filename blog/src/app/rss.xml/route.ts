import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'posts.json');
  const fileContents = fs.readFileSync(jsonPath, 'utf8');
  const posts = JSON.parse(fileContents);

  // 📢 9wleb: Hna 7et dynamic l-domain dyalk kifma m-verifiy f Pinterest nishan!
  // (Ila m-verifiy b http:// dir http://)
  const CLAIMED_DOMAIN = "https://prompttocraft.vercel.app"; 

  let rssItemsXml = '';
  posts.forEach((post: any) => {
    // T-akked anaho l-link khaddal nfs l-domain exact
    const cleanLink = post.link.replace(/^https?:\/\/prompttocraft\.vercel\.app/, CLAIMED_DOMAIN);
    const cleanImage = post.image_url.replace(/^https?:\/\/prompttocraft\.vercel\.app/, CLAIMED_DOMAIN);

    rssItemsXml += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>${cleanLink}</link>
        <guid isPermaLink="true">${cleanLink}</guid>
        <enclosure url="${cleanImage}" type="image/jpeg" />
      </item>
    `;
  });

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>The AI Artisan Feed</title>
        <link>${CLAIMED_DOMAIN}</link>
        <description>AI Tools and Smart Selling Hacks for Etsy</description>
        <language>en-us</language>
        ${rssItemsXml}
      </channel>
    </rss>
  `;

  return new NextResponse(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
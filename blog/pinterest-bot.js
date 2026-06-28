const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const postToPin = posts.find(post => post.pinned === false);

if (!postToPin) {
  console.log("🎉 Kolshi l-posts mlo7in f Pinterest dba!");
  process.exit(0);
}

// 9wleb: strip spaces o programmatically remove quotes if they exist
let PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN?.trim();
let BOARD_ID = process.env.PINTEREST_BOARD_ID?.trim();

if (PINTEREST_TOKEN && PINTEREST_TOKEN.startsWith('"') && PINTEREST_TOKEN.endsWith('"')) {
  PINTEREST_TOKEN = PINTEREST_TOKEN.slice(1, -1);
}
if (BOARD_ID && BOARD_ID.startsWith('"') && BOARD_ID.endsWith('"')) {
  BOARD_ID = BOARD_ID.slice(1, -1);
}

// 🔍 PRINT DEBUG INFO
console.log("⚙️ [DEBUG] Token Length:", PINTEREST_TOKEN ? PINTEREST_TOKEN.length : 0);
console.log("⚙️ [DEBUG] Token Starts With:", PINTEREST_TOKEN ? PINTEREST_TOKEN.substring(0, 5) : "null");
console.log("⚙️ [DEBUG] Board ID Sent:", BOARD_ID);

async function pinToPinterest() {
  const response = await fetch('https://api.pinterest.com/v5/pins', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINTEREST_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "link": postToPin.link,
      "title": postToPin.title,
      "description": postToPin.description,
      "board_id": BOARD_ID,
      "media_source": {
        "source_type": "image_url",
        "url": postToPin.image_url
      }
    })
  });

  const data = await response.json();

  if (response.ok) {
    console.log(`✅ Pin Created successfully for: ${postToPin.title}`);
    postToPin.pinned = true;
    fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
    console.log("💾 JSON updated.");
  } else {
    console.error("❌ Pinterest API Error:", data);
    process.exit(1);
  }
}

pinToPinterest();
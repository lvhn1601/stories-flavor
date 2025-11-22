const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const NGROK_PORT = 3000;

async function getNgrokUrl() {
  try {
    const res = await fetch("http://127.0.0.1:4040/api/tunnels");
    const json = await res.json();
    return json.tunnels[0]?.public_url || null;
  } catch (err) {
    return null;
  }
}

async function run() {
  console.log("🚀 Starting Next.js dev server...\n");

  // 1️⃣ Start Next.js
  const next = exec("npm run dev");

  next.stdout.on("data", (data) => process.stdout.write(data));
  next.stderr.on("data", (data) => process.stderr.write(data));

  // 2️⃣ Start Ngrok after Next.js boots
  setTimeout(() => {
    console.log("\n🌐 Starting Ngrok...\n");
    exec(`ngrok http ${NGROK_PORT}`);
  }, 1500);

  // 3️⃣ Wait a bit then fetch NGROK URL
  setTimeout(async () => {
    const url = await getNgrokUrl();

    if (!url) {
      console.log("❌ Could not get ngrok URL. Is ngrok running?");
      return;
    }

    console.log("🌍 NGROK PUBLIC URL:", url);

    // 4️⃣ Update .env.development
    const envPath = path.join(process.cwd(), ".env");
    let env = fs.readFileSync(envPath, "utf-8");

    env = env.replace(/NGROK_DOMAIN=.*/g, `NGROK_DOMAIN=${url}`);

    fs.writeFileSync(envPath, env);

    console.log("✅ Updated .env.development with NGROK_DOMAIN");
  }, 4000);
}

run();

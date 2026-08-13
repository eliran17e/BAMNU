import { CONTRACT } from "./config";

export const journey = [
  { day: "DAY 1", title: "One idea.", copy: "One stubborn panda.", image: "/assets/day-one.webp", alt: "BAMNU panda in a bamboo forest" },
  { day: "THE GRIND", title: "Make. Post. Repeat.", copy: "Logos, videos, memes, setbacks, stress, laughter—and very little sleep.", image: "/assets/the-grind.webp", alt: "BAMNU panda cooking in a bamboo kitchen" },
  { day: "DAY 38", title: "BAMNU launches.", copy: "Not the finish line. Just the first chapter finally leaving the group chat.", image: "/assets/day-38.webp", alt: "BAMNU panda at a desk" },
  { day: "TODAY", title: "You’re here.", copy: "Now the community writes what happens next.", image: "/assets/community-stage.webp", alt: "BAMNU panda with the community" },
];

export const principles = ["NO FAKE HYPE", "NO PRETENDING", "BUILD IN PUBLIC", "KEEP SHOWING UP", "REFUSE TO QUIT", "TOGETHER WE BUILD", "TOGETHER WE GROW"];

export const roadmap = [
  { phase: "PHASE 1", title: "THE BIRTH", emoji: "🐼", status: "done", items: [["✅", "Create BAMNU"], ["✅", "Build the community"], ["✅", "Launch the website & socials"], ["🔥", "Official Launch — 10.08.2026"]] },
  { phase: "PHASE 2", title: "THE TAKEOVER", emoji: "🚀", status: "active", items: [["🔥", "Grow the BAMNU family"], ["📢", "Meme campaigns & community events"], ["🤝", "Collaborations with creators & communities"], ["📈", "Increase visibility across X & TikTok"]] },
  { phase: "PHASE 3", title: "BAMNU EVERYWHERE", emoji: "🌎", status: "next", items: [["🌎", "Expand the community"], ["🔥", "Bigger marketing campaigns"], ["🐼", "More memes, more content, more chaos"], ["🤝", "New partnerships & opportunities"]] },
  { phase: "PHASE 4", title: "THE LONG RUN", emoji: "🏆", status: "next", items: [["💎", "Keep building"], ["🐼", "Keep growing"], ["🚀", "Keep pushing"], ["♾️", "BAMNU is here to stay."]] },
];

// One S-curve per phase; pathLength is normalized to 1 so scroll progress maps directly.
export const ROAD_PATH = "M50 0 C10 80 10 170 50 250 C90 330 90 420 50 500 C10 580 10 670 50 750 C90 830 90 920 50 1000";
export const STOP_FRACTIONS = [0.125, 0.375, 0.625, 0.875];

export const buySteps = [
  ["01", "GET A WALLET", "Use a Solana-compatible wallet you trust."],
  ["02", "ADD SOL", "Fund it with enough SOL for your trade and network fees."],
  ["03", "OPEN PUMP.FUN", "Use the official BAMNU link on this page."],
  ["04", "VERIFY + DECIDE", "Match the full contract address. Trade responsibly."],
];

export const faqsFor = (day: number) => [
  ["What is BAMNU?", "BAMNU is a Solana meme coin and an internet character built publicly from zero—one stubborn step at a time."],
  ["Why a panda?", "Because pandas look calm while quietly refusing to cooperate. That felt right."],
  ["How was BAMNU created?", `The creator has shared ${day} days of logos, videos, memes, milestones, setbacks, and building in public.`],
  ["Where can I buy $BAMNU?", "Only through the official Pump.fun link shown throughout this site. Always verify the complete contract address."],
  ["What is the official contract address?", CONTRACT],
  ["Is BAMNU financial advice?", "No. BAMNU is a meme coin, crypto is highly volatile, and nothing here is financial advice."],
  ["Where can I follow the journey?", "Follow @bamnu83 on X and @bamnu98 on TikTok for the next chapter."],
];

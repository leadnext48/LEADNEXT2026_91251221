import type { MetadataRoute } from "next"

// Generates /robots.txt — allows all crawlers and points to the sitemap.
// Keep the host/sitemap domain in sync with SITE_URL in layout.tsx.
const SITE_URL = "https://www.lead.ac.in"

// AI / LLM crawlers we explicitly welcome (GEO). "*" already allows these, but
// naming them makes our intent unambiguous to the AI search engines that read
// their own user-agent rules first.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (ChatGPT) indexing
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // ChatGPT browsing on user request
  "Google-Extended", // Gemini / Google AI grounding
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "ClaudeBot", // Anthropic (Claude)
  "Claude-Web",
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
  "Bytespider", // TikTok/Doubao
  "Amazonbot",
  "meta-externalagent", // Meta AI
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

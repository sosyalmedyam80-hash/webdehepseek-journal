import os
import json
import feedparser
import google.generativeai as genai

# Güvenli ortam değişkeninden veya doğrudan API anahtarından yapılandırma
api_key = os.environ.get("GEMINI_API_KEY") or "AQ.Ab8RN6JQoq2-qgSa9HJLLyhJsLXAGYbKysGfws3iB7P0Oe8Siw"
genai.configure(api_key=api_key)

def harvest_and_rewrite():
    print("🤖 Agent 15 (RSS Harvester) aktif...")
    rss_urls = [
        "https://techcrunch.com/feed/",
        "https://cointelegraph.com/rss"
    ]
    new_articles = []
    for url in rss_urls:
        feed = feedparser.parse(url)
        for entry in feed.entries[:1]:
            title = entry.title
            summary = entry.get('summary', '')
            new_articles.append({
                "title": title,
                "author": "Selin Yılmaz",
                "category": "Teknoloji",
                "date": "2026-10-07",
                "excerpt": summary[:150] + "..."
            })

    data_path = "halk/news.json"
    if os.path.exists(data_path):
        with open(data_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
    else:
        existing = []
        
    updated_news = new_articles + existing
    os.makedirs("halk", exist_ok=True)
    with open(data_path, "w", encoding="utf-8") as f:
        json.dump(updated_news, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    harvest_and_rewrite()

import urllib.request
import xml.etree.ElementTree as ET
import json
import os
import datetime

RSS_FEEDS = [
    "https://feeds.feedburner.com/reuters/technologyNews",
    "https://www.theverge.com/rss/index.xml",
    "https://cointelegraph.com/rss",
    "https://techcrunch.com/feed/"
]

def fetch_rss_headlines():
    headlines = []
    headers = {'User-Agent': 'Mozilla/5.0'}
    for url in RSS_FEEDS:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response:
                tree = ET.fromstring(response.read())
                for item in tree.findall('.//item')[:10]:
                    title = item.find('title').text if item.find('title') is not None else ""
                    desc = item.find('description').text if item.find('description') is not None else ""
                    if title:
                        headlines.append({"title": title, "desc": desc})
        except Exception as e:
            pass
    return headlines[:45]

def generate_webdehep_news():
    raw_news = fetch_rss_headlines()
    today_str = datetime.datetime.now().strftime("%d %B %Y")
    categories = [
        "Teknoloji & Dijital Dönüşüm", "Yapay Zeka & Gelecek", 
        "Finans & Küresel Piyasalar", "Kripto & Web3", "SaaS & Bulut Yazılımları"
    ]
    processed_articles = []
    for i, item in enumerate(raw_news):
        cat = categories[i % len(categories)]
        processed_articles.append({
            "id": f"news-{i+100}",
            "title": item["title"],
            "summary": item["desc"][:180] + "..." if len(item["desc"]) > 180 else item["desc"],
            "category": cat,
            "subcategory": "Pazar Raporları",
            "content": f"{item['desc']}\n\nWebdeHepSeek Analitik Heyeti tarafından derlenen verilere göre bu gelişme sektörel dinamikleri doğrudan etkileyecektir.",
            "author": "Ahmet Karadağ & Teknoloji Masası",
            "date": today_str,
            "readTime": "3 dk",
            "tags": [cat.split()[0], "Gündem", "Analiz"]
        })
    os.makedirs("public", exist_ok=True)
    existing_articles = []
    if os.path.exists("public/haberler.json"):
        try:
            with open("public/haberler.json", "r", encoding="utf-8") as f:
                existing_articles = json.load(f)
        except Exception:
            existing_articles = []

    # Merge new RSS articles with existing articles without duplicate IDs
    existing_ids = {a.get("id") for a in existing_articles}
    new_to_add = [a for a in processed_articles if a["id"] not in existing_ids]
    final_dataset = new_to_add + existing_articles

    with open("public/haberler.json", "w", encoding="utf-8") as f:
        json.dump(final_dataset, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    generate_webdehep_news()

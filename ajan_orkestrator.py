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
                for item in tree.findall('.//item')[:12]:
                    title = item.find('title').text if item.find('title') is not None else ""
                    desc = item.find('description').text if item.find('description') is not None else ""
                    if title:
                        headlines.append({"title": title, "desc": desc})
        except Exception:
            pass
    return headlines[:54]

def generate_webdehep_news():
    raw_news = fetch_rss_headlines()
    today_str = datetime.datetime.now().strftime("%d %B %Y")
    categories = [
        "Teknoloji & Dijital Dönüşüm", "Yapay Zeka & Gelecek", 
        "Finans & Küresel Piyasalar", "Kripto & Web3", "SaaS & Bulut Yazılımları",
        "Siber Güvenlik & Veri Koruma", "Otomotiv & Mobilite"
    ]
    
    category_images = {
        "Teknoloji & Dijital Dönüşüm": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
        "Yapay Zeka & Gelecek": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        "Finans & Küresel Piyasalar": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        "Kripto & Web3": "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1200&q=80",
        "SaaS & Bulut Yazılımları": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "Siber Güvenlik & Veri Koruma": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        "Otomotiv & Mobilite": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    }

    processed_articles = []
    for i, item in enumerate(raw_news):
        cat = categories[i % len(categories)]
        clean_desc = item['desc'].replace('<p>', '').replace('</p>', '')[:220]
        img_url = category_images.get(cat, "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80")
        processed_articles.append({
            "id": f"auto-{i+1}",
            "title": item["title"],
            "excerpt": clean_desc + "...",
            "category": cat,
            "subcategory": "Piyasa ve Teknoloji Raporları",
            "imageUrl": img_url,
            "sections": [
                {
                    "id": f"auto-sec-1",
                    "heading": "Haber Analizi",
                    "body": f"{clean_desc}\n\nWebdeHepSeek Analitik Heyeti değerlendirmesine göre, bu gelişme küresel pazardaki rekabet dengelerini doğrudan etkileyecektir."
                }
            ],
            "author": "Ahmet Karadağ & Teknoloji Masası",
            "date": today_str,
            "readTime": "3 dk",
            "tags": [cat.split()[0], "Gündem", "Haber"]
        })
    os.makedirs("public", exist_ok=True)
    with open("public/haberler.json", "w", encoding="utf-8") as f:
        json.dump(processed_articles, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    generate_webdehep_news()

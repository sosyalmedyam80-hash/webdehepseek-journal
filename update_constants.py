import json

with open("public/haberler.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

with open("src/constants.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Find where MOCK_NEWS starts
start_tag = "export const MOCK_NEWS: NewsItem[] = ["
end_tag = "export const LEGAL_DOCUMENTS = {"

start_idx = content.find(start_tag)
end_idx = content.find(end_tag)

if start_idx != -1 and end_idx != -1:
    mock_news_json = json.dumps(articles, ensure_ascii=False, indent=2)
    new_mock_news_ts = f"export const MOCK_NEWS: NewsItem[] = {mock_news_json};\n\n"
    new_content = content[:start_idx] + new_mock_news_ts + content[end_idx:]
    
    with open("src/constants.ts", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("src/constants.ts successfully updated with MOCK_NEWS containing 54 articles.")
else:
    print(f"Error finding tags: start_idx={start_idx}, end_idx={end_idx}")

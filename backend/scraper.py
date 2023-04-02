# import requests
from bs4 import BeautifulSoup
import urllib.request

def clean_unicode(text):
    text = text.encode().decode('unicode_escape')
    text = text.encode('ascii', 'ignore').decode().replace('\n', ' ').replace('\t', ' ')
    return text.strip()


def scrape(link):
    url=link
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html_content = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html_content,'html.parser')
    article_text_div = soup.find('article')
    elements = article_text_div.find_all(['h1','h2','h3','p'])
    article = ""
    for element in elements:
        article += (clean_unicode(str(element.text)))
    return article
from scraper import scrape
from summary import summarize

class Data:
    "This class is blueprint for the data to be returned"
    def __init__(self, url:str):
        self.url = url
        self.__plain_text = ""
        self.__summary_text = ""
    
    def scrape_clean_and_summarize(self):
        self.__plain_text = scrape(self.url)
        self.__summary_text = summarize(self.__plain_text)
        return {
            "url": self.url,
            "plain_text": self.__plain_text,
            "summary_text": self.__summary_text
        }

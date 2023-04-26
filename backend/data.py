from scraper import scrape
from summary import summarize

class DataWithUrl:
    "This class is blueprint for the data to be returned"
    def __init__(self, url:str):
        self.url = url
        self.__plain_text = ""
        self.__summary_text = ""
    
    def scrape_clean_and_summarize(self):
        self.__plain_text = scrape(self.url)
        if self.__plain_text == "The URL for the article cannot be scraped. Please enter the text":
            self.__summary_text = self.__plain_text
        else:
            self.__summary_text = summarize(self.__plain_text)
        return {
            "url": self.url,
            "plain_text": self.__plain_text,
            "summary_text": self.__summary_text
        }

class DataWithPlainText:
    "This class is a blueprint for the data to be returned"
    def __init__(self, plain_text:str):
        self.plain_text = plain_text
        self.__summary_for_plain_text = ""
    
    def summarize_plain_text(self):
        self.__summary_for_plain_text = summarize(self.plain_text)
        return {
            "plain_text":self.plain_text,
            "summary_text":self.__summary_for_plain_text
        }

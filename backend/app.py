from flask import Flask, jsonify, redirect, url_for, request
from flask_cors import CORS
from data import Data
from scraper import scrape
from summary import summarize
app = Flask(__name__)
CORS(app)
input = {
	'url': ''
}

@app.route('/', methods = ["GET", "POST"])
def root():
	if request.method == "POST":
		feed = request.get_json()
		input['url'] = feed['url']
		return ('Successful POST', 201)
	else:
		return jsonify({'project': 'Web Articles Summarization Extension', 
	'version': '0.1'})


@app.route('/data', methods = ['GET'])
def form_data():
	data_object = Data(input['url'])
	data = data_object.scrape_clean_and_summarize()
	return jsonify(data)

if __name__ == '__main__':
	app.run(debug = True)
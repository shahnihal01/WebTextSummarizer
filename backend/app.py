from flask import Flask, jsonify, redirect, url_for, request
from flask_cors import CORS
from data import DataWithUrl, DataWithPlainText

app = Flask(__name__)
CORS(app)
input = {
	'url': '',
	'plain_text': ''
}

@app.route('/', methods=['GET'])
def root():
	return jsonify({'project': 'Web Articles Summarization Extension', 
	'version': '0.1'})

@app.route('/url', methods = ["GET", "POST"])
def parse_url():
	if request.method == "POST":
		feed = request.get_json()
		input['url'] = feed['url']
		input['plain_text']=''
		return ('Successful POST', 201)
	else:
		return jsonify({'project': 'Web Articles Summarization Extension', 
	'version': '0.1'})

@app.route('/text', methods = ['GET', 'POST'])
def parse_plain_text():
	if request.method == "POST":
		input_plain_text = request.get_json()
		input['plain_text'] = input_plain_text['plain_text']
		return ('Successful POST', 201)
	else:
		return jsonify({'project': 'Web Articles Summarization Extension', 
	'version': '0.1'})


@app.route('/data', methods = ['GET'])
def form_data():
	if input['plain_text'] == '':
		data_object = DataWithUrl(input['url'])
		data = data_object.scrape_clean_and_summarize()
		return jsonify(data)
	else:
		data_object = DataWithPlainText(input['plain_text'])
		data = data_object.summarize_plain_text()
		return jsonify(data)

if __name__ == '__main__':
	app.run(debug = True)
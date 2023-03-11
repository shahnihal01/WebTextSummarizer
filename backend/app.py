from flask import Flask, jsonify, render_template, redirect, url_for, request
from scraper import scrape
from summary import summarize
app = Flask(__name__)
data = {
		"url" : "" ,
		"plain_text" : "",
		"summary" : ""
	}
@app.route('/', methods = ["GET", "POST"])
def root():
	if request.method == "POST":
		url = request.form["link"]
		data["url"] = url
		textdata = scrape(url)
		data["plain_text"] = scrape(url)
		data["summary"] = summarize(textdata)
		return render_template('index.html')
	else:
		return render_template('index.html')


@app.route('/api', methods = ['GET'])
def details():
	return jsonify({'project': 'Web Articles Summarization Extension', 
	'version': '0.1'})

@app.route('/data', methods = ['GET'])
def form_data():
	return jsonify(data)

if __name__ == '__main__':
	app.run(debug = True)
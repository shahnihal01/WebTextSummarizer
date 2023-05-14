# Summarize Any Web Article with SummUP

If you're tired of reading long articles and want a quick summary, SummUP is the perfect solution for you! SummUP is a browser extension that uses BART (Bidirectional and Auto-Regressive Transformer) model for summarization. It is made using ReactJS for front-end and Flask for back-end.

https://github.com/shahnihal01/WebTextSummarizer/assets/82139908/81ac7f4a-3717-4587-b309-c12b96982336

## Building the Extension

To build the SummUP extension, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/shahnihal01/WebTextSummarizer.git`
2. Navigate to the `web-text-sum` directory: `cd web-text-sum`
3. Install the required dependencies: `npm install` for front-end and `pip install -r requirements.txt` for back-end.
4. Build the front-end: `npm run build`
5. Build the back-end: `python app.py`

This will create a `build` folder containing the extension files.

## Running the Extension Locally

To load and unpack the `build` folder in the browser and run the SummUP extension locally, follow these steps:

1. Open the browser and go to the extension page.
2. Enable developer mode.
3. Click on "Load unpacked" and select the `build` folder.
4. Once the folder is loaded, the SummUP icon will appear in the browser toolbar.
5. Click on the SummUP icon to activate the extension on any web page.

## Properties of BART Model

The summarization model is built using BART. BART is a neural network-based language model that is trained to perform sequence-to-sequence tasks such as summarization, translation, and text generation. Some of its key properties include:

- BART is a pre-trained model, which means it has been trained on a large corpus of text data and can be fine-tuned for a specific task.
- It uses a combination of auto-encoder and auto-regressive techniques to generate high-quality summaries.
- BART is bidirectional, which means it can take into account both the previous and the next words in a sequence when generating a summary.
- BART uses attention mechanisms to focus on the most relevant parts of the input text when generating a summary. This helps it generate more accurate and relevant summaries.

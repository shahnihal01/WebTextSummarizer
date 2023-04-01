# import openai, os
import torch
from transformers import BartTokenizer, BartForConditionalGeneration, BartConfig

def summarize(text:str):
    model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')
    tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
    text = text.replace('.', '.<eos>')
    text = text.replace('!', '!<eos>')
    text = text.replace('?', '?<eos>')
    sentences = text.split('<eos>')
    print(len(sentences))
    max_chunk = len(sentences)//3
    chunks = []

    for i in range(0, len(sentences), max_chunk):
        chunk = ' '.join(sentences[i:i+max_chunk])
        print(chunk)
        print('--------------------')
        chunks.append(chunk)

    summaries = []
    for chunk in chunks:
        inputs = tokenizer(chunk, max_length=1024, truncation=True, padding='longest', return_tensors='pt')

        summary_ids = model.generate(inputs['input_ids'], min_length=10, max_length=80, num_beams=5, early_stopping=True)
        summary=[]
        for id in summary_ids:
            summary.append(tokenizer.decode(id, skip_special_tokens=True))

        print(summary)
        if summary:
            summaries.append(' '.join(summary))

    final_summary = ' '.join(summaries)

    return final_summary

# def summarize(text:str):
#     openai.api_key  = os.getenv('OpenAISecretKey')
#     text = text.replace('. ', '.<eos> ')
#     text = text.replace('!', '!<eos>')
#     text = text.replace('?', '?<eos>')
#     text = text.strip('\n')
#     sentences = text.split('<eos>')
#     print(len(sentences))

#     chunks=[]
#     max_chunk = len(sentences)//3
#     for i in range(0, len(sentences), max_chunk):
#         chunk = ' '.join(sentences[i:i+max_chunk])
#         print(chunk)
#         print('--------------------')
#         chunks.append(chunk)

#     summaries = []
#     for chunk in chunks:
#         summary = openai.Completion.create(model="text-davinci-003", prompt=chunk, temperature=1, max_tokens=70)
#         summaries.append(''.join(summary.choices[0].text))
#     # ["choices"][0]["text"]
#     final_summary = ''.join(summaries)
#     final_summary = final_summary.replace("\n", "")
#     print(final_summary)
#     return final_summary
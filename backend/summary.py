import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
# from transformers import BartTokenizer, BartForConditionalGeneration, pipeline

def summarize(text:str):

    # load Pegasus tokenizer and model
    tokenizer = PegasusTokenizer.from_pretrained('google/pegasus-large')
    model = PegasusForConditionalGeneration.from_pretrained('google/pegasus-large')
    text = text.replace('.', '.<eos>')
    text = text.replace('!', '!<eos>')
    text = text.replace('?', '?<eos>')
    sentences = text.split('<eos>')
    print(len(sentences))
    max_chunk = len(sentences)//3
    # current_chunk = 0
    chunks = []

    # for sentence in sentences:
    #     if len(chunks) == current_chunk + 1:
    #         if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunk:
    #             chunks[current_chunk].extend(sentence.split(' '))
    #         else:
    #             current_chunk += 1
    #             chunks.append(sentence.split(' '))
    #     else:
    #         chunks.append(sentence.split(' '))
    
    # for chunk_id in range(len(chunks)):
    #     chunks[chunk_id] = ' '.join(chunks[chunk_id])
    # # encode the input text using the tokenizer
    # inputs = tokenizer(chunks, max_length=1024, truncation=True, padding='longest', return_tensors='pt')

    # # generate the summary using the Pegasus model
    # summary_ids = model.generate(inputs['input_ids'], max_length=140, num_beams=5, early_stopping=True)
    # summary=[]
    # for id in summary_ids:
    #     summary.append(tokenizer.decode(id, skip_special_tokens=True))

    # print(summary)

    for i in range(0, len(sentences), max_chunk):
        chunk = ' '.join(sentences[i:i+max_chunk])
        print(chunk)
        print('--------------------')
        chunks.append(chunk)

    summaries = []
    for chunk in chunks:
        # encode the input text using the tokenizer
        inputs = tokenizer(chunk, max_length=1024, truncation=True, padding='longest', return_tensors='pt')

        # generate the summary using the Pegasus model
        summary_ids = model.generate(inputs['input_ids'], min_length=10, max_length=80, num_beams=5, early_stopping=True)
        summary=[]
        for id in summary_ids:
            summary.append(tokenizer.decode(id, skip_special_tokens=True))

        print(summary)
        if summary:
            summaries.append(' '.join(summary))

    final_summary = ' '.join(summaries)

    # print the summary
    return final_summary


    # # Load the Bart tokenizer and model
    # tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
    # model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

    # # Encode the text using the tokenizer
    # input_ids = tokenizer.encode(text, padding='max_length', truncation=True, max_length=1024, return_tensors='pt')

    # # Generate a summary using the model
    # output = model.generate(input_ids, max_length=100, num_beams=4, early_stopping=True, do_sample=False)

    # # Decode the summary using the tokenizer
    # summary = tokenizer.decode(output[0], skip_special_tokens=True)
    # return summary
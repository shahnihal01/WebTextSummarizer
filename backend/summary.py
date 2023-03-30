import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
# from transformers import BartTokenizer, BartForConditionalGeneration, pipeline

def summarize(text:str):

    # load Pegasus tokenizer and model
    tokenizer = PegasusTokenizer.from_pretrained('google/pegasus-large')
    model = PegasusForConditionalGeneration.from_pretrained('google/pegasus-large')

    # encode the input text using the tokenizer
    inputs = tokenizer(text, max_length=1024, truncation=True, padding='longest', return_tensors='pt')

    # generate the summary using the Pegasus model
    summary_ids = model.generate(inputs['input_ids'], max_length=50, num_beams=5, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    # print the summary
    return summary


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
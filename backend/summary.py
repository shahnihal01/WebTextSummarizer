import torch
from transformers import BartTokenizer, BartForConditionalGeneration

def summarize(text):
    # Load the Bart tokenizer and model
    tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
    model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

    # Encode the text using the tokenizer
    input_ids = tokenizer.encode(text, padding='max_length', truncation=True, max_length=1024, return_tensors='pt')

    # Generate a summary using the model
    output = model.generate(input_ids, max_length=100, num_beams=4, early_stopping=True, do_sample=False)

    # Decode the summary using the tokenizer
    summary = tokenizer.decode(output[0], skip_special_tokens=True)
    return summary
import numpy as np
import pandas as pd

class ClimateEngine:

    def __init__(self, openai):
        self.openai = openai

    def get_embedding(self, text, model):
        text = text.replace("\n", " ")
        return self.openai.Embedding.create(input = [text], model=model)['data'][0]['embedding']

    def __cosine_similarity(self, a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def generate_doc_embed(self, content, doc_model, title="", log=False):
        
        if log and content is not None: print('generate embedding for ', content[:3])
            
        # get the doc text to generate embedding
        if title != "":
            content += " " + title
        
        # generate the embedding (doc_model)
        embed = self.get_embedding(content, model=doc_model)
        
        return embed

    # search the book pages for the answer
    def search_similarity(self, df, content_col, query, query_model, n=3):
        
        # 1- get query embedding
        query_embedding = self.get_embedding(query,model=query_model)
        
        # 2- get similarity scores
        scores = df[content_col].apply(lambda doc: self.__cosine_similarity(doc, query_embedding))
        
        # 3- get indicies of the highest scores
        top_idx = np.argsort(scores)[::-1][:n]
        
        # print top n pages
        result = df.iloc[top_idx, :]
        
        return result

    def get_best_answer_temp(self, model, prompt_in, temperature=0.7, max_tokens=256, best_of=2, 
                    return_all=False, stop_token='[end]', log=False):
        """
        API documentation: https://beta.openai.com/docs/api-reference/completions/create
         - n (Defaults to 1) How many completions to generate for each prompt.
         - best_of (Defaults to 1) how many answers to generate in the backend.
         - stop=["\n"]
        """
        
        response = self.openai.Completion.create(
          model="text-davinci-002",
          prompt=prompt_in,
          temperature=0.7,
          max_tokens=256,
          top_p=1,
          best_of=2,
          frequency_penalty=0,
          presence_penalty=0,
          stop=["[end]"]
        )
        
        return response

    def get_best_answer(self, model, prompt_in, temperature=0.7, max_tokens=256, best_of=2, 
                    return_all=False, stop_token='[end]', log=False):
        """
        API documentation: https://beta.openai.com/docs/api-reference/completions/create
         - n (Defaults to 1) How many completions to generate for each prompt.
         - best_of (Defaults to 1) how many answers to generate in the backend.
         - stop=["\n"]
        """
        if log:
            print('temperature: ', temperature)
            print('best_of: ', best_of)
            print('stop_token: ', [stop_token])
            print('answer model: ', model)
        
        response = self.openai.Completion.create(
          model=model,
          prompt=prompt_in,
          temperature=temperature,
          max_tokens=max_tokens,
          top_p=1,
          frequency_penalty=0,
          presence_penalty=0,
          best_of=best_of,
          stop=[stop_token])
        
        
        if return_all:
            return response
        else:
            return response["choices"][0]["text"].strip()

    def get_multiple_answer(self, model, prompt_in, temperature=0.6, max_tokens=300, stop_token='[end]'):
        """
        API documentation: https://beta.openai.com/docs/api-reference/completions/create
         - n (Defaults to 1) How many completions to generate for each prompt.
         - best_of (Defaults to 1) how many answers to generate in the backend.
         - stop=["\n"]
        """
        response = self.openai.Completion.create(
          model=model,
          prompt=prompt_in,
          temperature=temperature,
          max_tokens=max_tokens,
          top_p=1,
          best_of=3,
          stop=['{}'.format(stop_token)],
          n=2)   
        
        return response["choices"]

    
    def get_top_n_context(self, df, question, query_search_model, top_n = 2, search_col= 'extend_embed'):

        filter_df = self.search_similarity(df, search_col, question, query_search_model, n=top_n)

        return '\n'.join(filter_df.content.values)

    def get_top_n_metadata(self, df, question, query_search_model, top_n = 2, search_col= 'extend_embed'):

        filter_df = self.search_similarity(df, search_col, question, query_search_model, n=top_n)

        return filter_df

    def read_file_lines(self,file_name):
        lines = ""
        with open(file_name,'r', encoding='utf-8-sig') as f:
            lines = f.readlines()

        return '\n'.join(lines)
    
    def test():
        print("module imported successfully")
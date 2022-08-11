import uuid
import json
import random
import lorem
import nltk
# PLEASE UNCOMMENT THIS IF USING SCRIPT FOR FIRST TIME
# YOU CAN COMMENT IT OUT AFTER RUNNING FOR THE FIRST TIME
# nltk.download('gutenberg') 
from nltk.corpus import gutenberg
import requests

moby = set(nltk.Text(gutenberg.words('melville-moby_dick.txt')))
moby = [word.lower() for word in moby if len(word) >2]

article_obj  = {}
article_list = []
thumbnail_list = []

r = requests.get('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=15')
r_json = json.loads(r.text)
for i in r_json:
	thumbnail_list.append(i['thumbnailUrl'])

i = 0;
# generate 15 article objects
while len(article_list) <= 14:
	rand_uuid = str(uuid.uuid4())
	rand_title_p1 = moby[int(random.random()*len(set(moby)))]
	rand_title_p2 = moby[int(random.random()*len(set(moby)))]
	rand_title = rand_title_p1.capitalize() + ' ' + rand_title_p2.capitalize()
	rand_summary = lorem.sentence()
	rand_body = lorem.paragraph()
	if rand_uuid not in article_obj.values() and rand_title not in article_obj.values() and rand_summary not in article_obj.values() and rand_body not in article_obj.values():
		article_obj['articleId'] = rand_uuid
		article_obj['title'] = rand_title
		article_obj['summary'] = rand_summary
		article_obj['body'] = rand_body
		article_obj['imageURL'] = thumbnail_list[i]
		article_list.append(article_obj)
	article_obj = {}
	i = i + 1

print('generate article data')

with open('./src/data/articles.json', 'w') as f:
    json.dump(article_list, f, ensure_ascii=False, indent=4)
from flask import Flask, request, jsonify, make_response
import urllib2
import json
import datetime
import time
import sys
import argparse


app = Flask(__name__, static_url_path='')
tasks = {}
@app.route('/')
def root():
  return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/api/nyt/', methods=['GET'])
def get_task():
    apiKey="6462dcd33e1d47bc2be98167e19c86ab:10:72958436"
    dataFromJavascript = request.args.get("data");
    print dataFromJavascript
    response = urllib2.urlopen('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+dataFromJavascript+'&api-key='+apiKey)
    data = json.load(response)
    #print data['response']['docs'][0]['lead_paragraph']
    #"http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$('#getInput').val()+"&api-key="+apiKey
    response.close()
    return jsonify(data),201

if __name__ == '__main__':
    app.run(debug=True)

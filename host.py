from flask import Flask, request, jsonify, make_response
import urllib2
import urllib
import json
import MySQLdb

app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
  return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/api/nyt/', methods=['GET'])
def get_task():
    apiKey="ad725028bcb4e7e7c54824d7ab446f98:18:72958436"
    keywords = request.args.get("data");
    db = MySQLdb.connect(#host="dursley.socs.uoguelph.ca",
                         host="tacotaco.asuscomm.com", # our host, do not modify
                         user="nreymer", # your username (same as in lab)
                         passwd="0797359", # your password (your student id number)
                         db="nreymer") # name of the data base, your username, do not modify

    cur = db.cursor()
    cur.execute("SELECT * FROM NYT")
    query = ""
    jResult = ""
    for row in cur.fetchall() :
        if(keywords == row[1]):
            query = row[1]
            jResult = row[2]

    if query!=keywords:
        response = urllib2.urlopen('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keywords+'&limit=15&api-key='+apiKey)
        docs = json.load(response)
        docs = docs["response"]["docs"]
        for doc in docs:
            for key in doc.keys():
                if(str(key) != 'web_url' and str(key) != 'headline' and str(key) != 'snippet'):
                    doc.pop(key, None)
        response.close();
        insertThis=("INSERT INTO NYT "
                        "VALUES (NULL,%s,%s)")
        docs=json.dumps(docs)
        loadthis=(keywords,docs)
        cur.execute(insertThis,loadthis)


        db.commit();
        return docs,201
    else:
        readIn=json.dumps(jResult,ensure_ascii=False)
        readIn=json.loads(readIn)
        return readIn,201

    cur.close()
    db.close()

@app.route('/api/nyt/movies/', methods=['GET'])
def get_movies():
        apiKey="e5a0a995c289ffff9a87a95e6c3acc93:3:72958436"
        response = urllib2.urlopen('http://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key='+apiKey)
        data = json.load(response)
        response.close()
        return jsonify(data),201

@app.route('/api/nyt/top/', methods=['GET'])
def get_top():
    apiKey="fba1c9e4f2166b88131b44710e70e6fe:8:72958436"
    response = urllib2.urlopen('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key='+apiKey)
    data = json.load(response)
    response.close()
    return jsonify(data),201

@app.route('/api/nyt/new/', methods=['GET'])
def get_mew():
    apiKey="9f7388a15ad205dddbe2fcc082c14edd:3:72958436"
    response = urllib2.urlopen('http://api.nytimes.com/svc/news/v3/content/nyt/all/.json?limit=24&api-key='+apiKey)
    data = json.load(response)
    response.close()
    return jsonify(data),201

@app.route('/api/nyt/science/', methods=['GET'])
def get_sci():
    apiKey="fba1c9e4f2166b88131b44710e70e6fe%3A8%3A72958436"
    response = urllib2.urlopen('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/science/7.json?api-key='+apiKey)
    data = json.load(response)
    response.close()
    return jsonify(data),201

@app.route('/api/nyt/politics/', methods=['GET'])
def get_pol():
    apiKey="fba1c9e4f2166b88131b44710e70e6fe%3A8%3A72958436"
    response = urllib2.urlopen('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/politics/7.json?api-key='+apiKey)
    data = json.load(response)
    response.close()
    return jsonify(data),201

if __name__ == '__main__':
    app.run(debug=True)

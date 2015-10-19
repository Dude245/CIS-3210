from flask import Flask, request, jsonify, make_response
import urllib2
import urllib
import json
import MySQLdb
import hashlib

app = Flask(__name__, static_url_path='')
tasks = {}



# Routes
@app.route('/')
def root():
  return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/api/nyt/', methods=['GET'])
def get_task():
    apiKey="6462dcd33e1d47bc2be98167e19c86ab:10:72958436"
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
        #print "NYT"

        response = urllib2.urlopen('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keywords+'&limit=10&api-key='+apiKey)
        #print 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keywords+'&api-key='+apiKey
        docs = json.load(response)
        docs = docs["response"]["docs"]
        for doc in docs:
            for key in doc.keys():
                if(str(key) != 'web_url' and str(key) != 'headline'):
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
        #print "DB"
        readIn=json.dumps(jResult,ensure_ascii=False)
        readIn=json.loads(readIn)
        return readIn,201

    cur.close()
    db.close()

@app.route('/api/nyt/static/', methods=['GET'])
def get_static():
    jFile = open("static/JSON",'r')
    line=""
    data=""
    staticR=""
    line = jFile.readline()
    data = json.loads(line)

    staticR = json.dumps(data)
    jFile.close()
    return staticR,201


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify, make_response
import urllib2
import urllib
import json
import MySQLdb

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
    db = MySQLdb.connect(host="dursley.socs.uoguelph.ca", # our host, do not modify
                         user="nreymer", # your username (same as in lab)
                         passwd="0797359", # your password (your student id number)
                         db="nreymer") # name of the data base, your username, do not modify

    cur = db.cursor()
    cur.execute("SELECT * FROM test5")
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
        data = json.load(response)
        # print data['response']['docs'][0]['headline']['main']
        # print data['response']['docs'][0]['web_url']

        # sample=[{data['response']['docs'][0]['headline']['main']:data['response']['docs'][0]['web_url']}]
        # print sample[0]
        response.close()
        query=json.dumps(data)
        insertThis=("INSERT INTO test5 "
                        "VALUES (NULL,%s,%s)")
        data=(keywords,query)
        cur.execute(insertThis,data)
        db.commit();
        return query,201
    else:
        #print "DB"
        readIn=json.dumps(jResult,ensure_ascii=False)
        readIn=json.loads(readIn)
        # sample = [{'text':'headline'},{'url':'test'},
        #             {'text2':'headline2'},{'url2':'test2'}]
        # saywhat=json.dumps(sample)
        # saywhat=json.loads(saywhat)
        # print saywhat[0]
        # print saywhat[1]
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

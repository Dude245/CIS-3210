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
    JSON = ""
    for row in cur.fetchall() :
        if(keywords == row[1]):
            query = row[1]
            JSON = row[2]

    if query!=keywords:
        print "NYT"
        response = urllib2.urlopen('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keywords+'&api-key='+apiKey)
        #print 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keywords+'&api-key='+apiKey
        data = json.load(response)
        response.close()
        JSON=json.dumps(data)
        JSON = JSON.replace("'","''")
        cur.execute("INSERT INTO test5 VALUES(NULL,"+"\'"+keywords+"\'"+","+"\'"+JSON+"\'"+");")
        db.commit();
        return jsonify(data),201
    else:
        print "DB"
        # test=json.dumps(JSON)
        # JSON = JSON.replace("\\\\\","")

        #print JSON+"\n\n"
        #OUT=json.loads(JSON)
        return JSON,201

    cur.close()
    db.close()

if __name__ == '__main__':
    app.run(debug=True)

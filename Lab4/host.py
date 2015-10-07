from flask import Flask, request, jsonify, make_response
import urllib2
import urllib
import json
import MySQLdb

app = Flask(__name__, static_url_path='')
tasks = {}



db = MySQLdb.connect(host="dursley.socs.uoguelph.ca", # our host, do not modify
                     user="nreymer", # your username (same as in lab)
                     passwd="0797359", # your password (your student id number)
                     db="nreymer") # name of the data base, your username, do not modify
cur = db.cursor()
##############################
cur.execute("SELECT * FROM test4")


for row in cur.fetchall() :
     print row


cur.close()
db.close()
print "ok"
###############################
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
    response = urllib2.urlopen('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+keywords+'&api-key='+apiKey)
    data = json.load(response)
    response.close()
    return jsonify(data),201

if __name__ == '__main__':
    app.run(debug=True)

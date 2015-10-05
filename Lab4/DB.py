"""
An example to get you started on CIS*3210 Lab 4.

Make sure your account works on Monday, if it doesn't
email help@socs.uoguelph.ca with your details.
"""

import MySQLdb

db = MySQLdb.connect(host="dursley.socs.uoguelph.ca", # our host, do not modify
                     user="nreymer", # your username (same as in lab)
                     passwd="0797359", # your password (your student id number)
                     db="nreymer") # name of the data base, your username, do not modify



cur = db.cursor()

#replace with your own tables once you create some
cur.execute("SELECT username FROM users")


for row in cur.fetchall() :
    print row[0]


cur.close()
db.close()
print "ok"

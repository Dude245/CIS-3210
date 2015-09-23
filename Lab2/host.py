from flask import Flask, request, jsonify
from flask_restful import Resource, Api, abort

app = Flask(__name__, static_url_path='')
api = Api(app)

todos = {}
def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in todos:
        abort(404, message="That doesn't exist :( ".format(todo_id))

class TodoSimple(Resource):
    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return {todo_id: todos[todo_id]}

    def put(self, todo_id):
        todos[todo_id] = request.form['data']
        print request.form['data']
        return {todo_id: todos[todo_id]}

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del todos[todo_id]
        return 'Deleted'

@app.route('/')
def staticHost():
    return app.send_static_file('index.html');

api.add_resource(TodoSimple, '/api/<string:todo_id>')

if __name__ == '__main__':
    app.run(debug=True)

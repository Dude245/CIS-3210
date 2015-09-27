# http://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
from flask import Flask, request, jsonify, make_response

app = Flask(__name__, static_url_path='')
tasks = {}
# Routes
@app.route('/')
def root():
  return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/api/<path:task_id>', methods=['GET'])
def get_task(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': task[0]})



@app.route('/api/<path:task_id>', methods=['PUT'])
def put_task(task_id):
    tasks['task_id']=request.form['data'];
    return jsonify({task_id:tasks['task_id']}),201

@app.route('/api/<path:task_id>', methods=['POST'])
def post_task(task_id):
    tasks['task_id']=request.form['data'];
    return jsonify({task_id:tasks['task_id']}),201

@app.route('/api/<path:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    tasks.remove(task[0])
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)

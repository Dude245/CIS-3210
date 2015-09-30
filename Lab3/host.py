from flask import Flask, request, jsonify, make_response
app = Flask(__name__, static_url_path='')
tasks = {}
file = open("static/JSON")

# Routes
@app.route('/')
def root():
  return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/api/<path:task_id>', methods=['GET','OPTIONS'])
def get_task(task_id):
    return jsonify({task_id:tasks[task_id]}),201
#
# @app.route('/api/<path:task_id>', methods=['PUT'])
# def put_task(task_id):
#     tasks[task_id]=request.form['data'];
#     return jsonify({task_id:tasks[task_id]}),201
#
# @app.route('/api/<path:task_id>', methods=['POST'])
# def post_task(task_id):
#     tasks[task_id]=request.form['data'];
#     return jsonify({task_id:tasks[task_id]}),201
#
# @app.route('/api/<path:task_id>', methods=['DELETE'])
# def delete_task(task_id):
#     print task_id
#     del tasks[task_id];
#     return jsonify({'success':'Deleted'}),201

if __name__ == '__main__':
    app.run(debug=True)

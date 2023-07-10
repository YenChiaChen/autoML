import dblib
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS


app = Flask(__name__)

@app.route('/datasets', methods=['GET'])
def get_datasets():
    return make_response(jsonify(dblib.getAllDatasets()), 200)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

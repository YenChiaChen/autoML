import dblib
import os

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename

UPLOAD_FOLDER =  './upload'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

@app.route('/datasets', methods=['GET'])
def get_datasets():
    return make_response(jsonify(dblib.getAllDatasets()), 200)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify(error='No file part'), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify(error='No selected file'), 400
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify(success=True)
    except Exception as e:
        return jsonify(error=str(e)), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

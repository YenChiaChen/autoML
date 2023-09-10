from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return jsonify(message='Hello, World!')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error="No selected file"), 400

    # Read the CSV file with pandas to get headers
    df = pd.read_csv(file)
    headers = df.columns.tolist()
    
    # Save the file or do other processing if needed
    file.save(f"./uploads/{file.filename}")

    return jsonify(headers=headers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

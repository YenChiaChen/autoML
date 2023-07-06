

from flask import Flask, request, jsonify
import joblib
from werkzeug.utils import secure_filename
import os
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from flask_cors import CORS


UPLOAD_FOLDER =  './upload'
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Train the models when starting the server
digits = load_digits()
X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target, test_size=0.5, shuffle=False)

models = {
    'LogisticRegression': LogisticRegression(),
    'DecisionTree': DecisionTreeClassifier(),
    'RandomForest': RandomForestClassifier()
}

for name, model in models.items():
    model.fit(X_train, y_train)
    joblib.dump(model, f"{name}.joblib")

@app.route('/predict', methods=['POST'])
def predict():
    dataset = request.json.get('dataset')

    # You can use the dataset variable here to load different models based on the dataset
    predictions = {}
    for name, model in models.items():
        model.fit(X_train, y_train)
        predictions[name] = accuracy_score(y_test, model.predict(X_test))

    return jsonify(predictions)

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
    
@app.route('/datasets', methods=['GET'])
def list_datasets():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify(files)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

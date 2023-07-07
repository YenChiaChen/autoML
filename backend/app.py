

from flask import Flask, request, jsonify
import joblib
from werkzeug.utils import secure_filename
import os
import pandas as pd
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LinearRegression
from flask_cors import CORS


UPLOAD_FOLDER =  './upload'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

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

@app.route('/models', methods=['POST'])
def train_models():
    selected_options = request.json.get('options', [])
    file = request.json.get('fileName')
    data = pd.read_csv('./upload/' + str(file))
    print(data.head())
    accuracies = {}
    for option in selected_options:
        if option == 'Naive Bayes':
            # Train Naive Bayes model
            model = GaussianNB()
            accuracy = train_and_get_accuracy(model, data)
            accuracies[option] = accuracy
        elif option == 'Random Forest':
            # Train Random Forest model
            model = RandomForestClassifier()
            accuracy = train_and_get_accuracy(model, data)
            accuracies[option] = accuracy
        elif option == 'Linear Regression':
            # Train Linear Regression model
            model = LinearRegression()
            accuracy = train_and_get_accuracy(model, data)
            accuracies[option] = accuracy
    return jsonify(accuracies)

def train_and_get_accuracy(model, df, label_column='label'):
    # Split the DataFrame into features (X) and labels (y)
    X = df.drop(label_column, axis=1)
    y = df[label_column]

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model.fit(X_train, y_train)

    # Predict the target values for the testing set
    y_pred = model.predict(X_test)

    # Calculate the accuracy
    accuracy = accuracy_score(y_test, y_pred)
    return accuracy

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

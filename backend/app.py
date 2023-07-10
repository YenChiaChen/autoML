

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
import numpy as np


UPLOAD_FOLDER =  './upload'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# Train the models when starting the server
# digits = load_digits()
# X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target, test_size=0.5, shuffle=False)

# models = {
#     'LogisticRegression': LogisticRegression(),
#     'DecisionTree': DecisionTreeClassifier(),
#     'RandomForest': RandomForestClassifier()
# }

# for name, model in models.items():
#     model.fit(X_train, y_train)
#     joblib.dump(model, f"{name}.joblib")

@app.route('/ml/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Ensure models and dataset are provided
    # if not data or 'models' not in data or 'dataset' not in data:
    #     return jsonify({"message": "Models and dataset are required"}), 400

    models = data['models']
    dataset = data['dataset']

    # Placeholder logic. Replace with your actual ML model logic.
    # for model in models:
    #     if model not in SUPPORT_MODELS:
    #         return jsonify({"message": f"Unsupported model: {model}"}), 400

    # Perform some operations on the models and dataset...
    # Compute the precision, recall, f1, etc. for each model.
    # This is just an example. Replace with your real computation.
    results = {model: {"precision": 0.9, "recall": 0.8, "f1": 0.85} for model in models}

    return jsonify(results)

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

@app.route('/datasets/<string:dataset>/columns', methods=['GET'])
def get_columns(dataset):
    df = pd.read_csv('./upload/' + str(dataset))
    columns = df.columns.tolist()
    return jsonify(columns)

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


@app.route('/datasets/<string:dataset>/column/<string:column>/eda', methods=['GET'])
def get_column_eda(dataset, column):
    df = pd.read_csv('./upload/' + str(dataset))

    if column not in df.columns:
        return jsonify({'error': 'Column not found'}), 404
    
    series = df[column]

    eda = {
        'mean': numpy_to_python_type(np.mean(series)),
        'median': numpy_to_python_type(np.median(series)),
        'min': numpy_to_python_type(np.min(series)),
        'max': numpy_to_python_type(np.max(series)),
        'unique_count': numpy_to_python_type(series.nunique()),
        'null_count': numpy_to_python_type(series.isnull().sum()),
    }

    return jsonify(eda)

@app.route('/datasets/<string:dataset>/eda', methods=['GET'])
def get_dataset_eda(dataset):

    df = pd.read_csv('./upload/' + str(dataset))
    missing_cells = df.isnull().sum().sum()
    total_cells = df.size

    eda = {
        'number_of_variables': numpy_to_python_type(df.shape[1]),
        'number_of_observations': numpy_to_python_type(df.shape[0]),
        'missing_cells': numpy_to_python_type(missing_cells),
        'missing_cells_percentage': numpy_to_python_type(missing_cells / total_cells * 100),
        'duplicated_rows': numpy_to_python_type(df.duplicated().sum()),
        'duplicated_rows_percentage': numpy_to_python_type(df.duplicated().sum() / df.shape[0] * 100),
        'total_size_in_memory': numpy_to_python_type(df.memory_usage(deep=True).sum()/ (1024 * 1024) ),
    }

    return jsonify(eda)

@app.route('/datasets/<string:dataset>/column/<string:column>/values', methods=['GET'])
def get_column_values(dataset, column):    
    df = pd.read_csv('./upload/' + str(dataset))

    if column not in df.columns:
        return jsonify({'error': 'Column not found'}), 404

    values = df[column].dropna().tolist()
    return jsonify(values)

@app.route('/ml/models', methods=['GET'])
def get_support_models():
    SUPPORT_MODELS = ['SVM', 'KNN', 'RF', 'MLP']

    return jsonify(SUPPORT_MODELS)

 
def numpy_to_python_type(val):
    if isinstance(val, (np.int_, np.intc, np.intp, np.int8,
        np.int16, np.int32, np.int64, np.uint8,
        np.uint16, np.uint32, np.uint64)):

        return int(val)

    elif isinstance(val, (np.float_, np.float16, np.float32, 
        np.float64)):
        
        return float(val)

    elif isinstance(val, (np.complex_, np.complex64, np.complex128)):
        return complex(val)

    else:
        return val
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

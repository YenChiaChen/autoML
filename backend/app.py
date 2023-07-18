

from flask import Flask, request, jsonify, send_from_directory
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
import sqlite3
from datetime import datetime
from pandas_profiling import ProfileReport

UPLOAD_FOLDER =  './upload'
TEMP_FOLDER = './temp'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TEMP_FOLDER'] = TEMP_FOLDER
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

# connect to the database
from flask import g

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect('file_info.db')
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/profile', methods=['POST'])
def profile():
    filename = request.json['filename']
    df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    profile = ProfileReport(df, explorative=True)
    profile_filename = os.path.join('reports', f"{os.path.splitext(filename)[0]}_profile.html")
    profile.to_file(profile_filename)
    return jsonify({'profile_filename': profile_filename})

@app.route('/profiles/reports/<path:filename>', methods=['GET'])
def serve_profile(filename):
    return send_from_directory(directory=os.path.join(os.getcwd(), 'reports'), path=filename)

def process_df(df):
    columns_info = []

    for col in df.columns:
        missing_count = df[col].isnull().sum()
        total_count = len(df[col])

        # Replace these with your actual logic
        category = "categorical"
        handling_strategy = "drop"
        examples = df[col].dropna().head(3).tolist()

        columns_info.append({
            "name": col,
            "category": category,
            "missing_values": {
                "count": int(missing_count),
                "percentage": float("{:.2f}".format(float((missing_count / total_count) * 100))),
            },
            "handling_strategy": handling_strategy,
            "examples": examples,
        })

    return columns_info

@app.route('/api/dataframe_info', methods=['POST'])
def dataframe_info():
    filename = request.json.get('filename')

    if filename is None:
        return jsonify({"error": "No filename provided"}), 400

    try:
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        columns_info = process_df(df)

        return jsonify({"columns": columns_info})
    except Exception as e:
        return jsonify({"error": str(e)}), 500





@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        db = get_db()
        c = db.cursor()
        if 'file' not in request.files:
            return jsonify(error='No file part'), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify(error='No selected file'), 400
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        # gather file info
        uploadtime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        datasize = os.path.getsize(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        column_number = len(df.columns)

        # save file info to database
        c.execute("INSERT INTO files VALUES (?, ?, ?, ?)", (filename, uploadtime, datasize, column_number))
        db.commit()
        
        return jsonify(success=True)
    except Exception as e:
        return jsonify(error=str(e)), 500
    
def is_categorical(array_like):
    return array_like.dtype.name == 'object'

@app.route('/dataset/types/<filename>', methods=['GET', 'POST'])
def get_dataset(filename):
    df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    data = {}

    if request.method == 'GET':
        for column in df.columns:
            unique_values = df[column].dropna().unique()
            examples = unique_values[:3].tolist()

            data[column] = {
                'type': str(df[column].dtype),
                'isCategorical': is_categorical(df[column]),
                'examples': examples
            }

        return jsonify(data)
    elif request.method == 'POST':
        data = request.json
        # Update and save the dataset as a temp CSV file
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        for column, datatype in data.items():
            if datatype['type'] != df[column].dtype.name:
                if datatype['type'] == 'category':
                    df[column] = df[column].astype('category')
                else:
                    df[column] = df[column].astype(datatype['type'])
            df.to_csv(os.path.join(app.config['TEMP_FOLDER'], filename), index=False)
        
        return jsonify({"message": "Dataset updated successfully"}), 200
    
@app.route('/delete', methods=['DELETE'])
def delete_file():
    try:
        filename = request.json['filename']
        db = get_db()
        c = db.cursor()
        # delete from database
        c.execute("DELETE FROM files WHERE filename=?", (filename,))
        db.commit()

        # remove the file from the server if needed
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return jsonify(success=True)
    except Exception as e:
        return jsonify(error=str(e)), 500

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

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     try:
#         if 'file' not in request.files:
#             return jsonify(error='No file part'), 400
#         file = request.files['file']
#         if file.filename == '':
#             return jsonify(error='No selected file'), 400
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         return jsonify(success=True)
#     except Exception as e:
#         return jsonify(error=str(e)), 500
    
@app.route('/datasets', methods=['GET'])
def list_datasets():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify(files)

@app.route('/datasets/preview/<filename>', methods=['GET'])
def get_dataset_preview(filename):
    if filename in os.listdir(app.config['UPLOAD_FOLDER']):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        df = pd.read_csv(file_path)
        preview_data = df.head(10).fillna(value = 'NaN').to_dict(orient='records')  # Fill NaN values with None
        return jsonify(preview_data)
    else:
        return jsonify({"error": "File not found"}), 404



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

@app.route('/datainfo', methods=['GET'])
def get_datainfo():
    try:
        db = get_db()
        c = db.cursor()
        # query all rows in the 'files' table
        c.execute("SELECT * FROM files")
        data = c.fetchall()
        
        # convert to list of dicts for jsonify
        data = [dict(zip(["filename", "uploadtime", "datasize", "column_number"], row)) for row in data]
        return jsonify(data)
    except Exception as e:
        return jsonify(error=str(e)), 500


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

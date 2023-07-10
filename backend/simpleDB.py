import sqlite3
import json
import os

# Create a SQLite database connection
conn = sqlite3.connect('datasets.db')
cursor = conn.cursor()

# Create a new table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS datasets(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_name TEXT,
    dataset TEXT,
    data_type TEXT,
    delimiter TEXT,
    encoding TEXT,
    schema TEXT
)
""")

# Directory where the json files are located
directory = 'jobs'

# Iterate through all the json files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".json"):
        filepath = os.path.join(directory, filename)

        # Open the json file and load its content
        with open(filepath, 'r') as f:
            data = json.load(f)

            # Insert data into the table
            cursor.execute("""
            INSERT INTO datasets(dataset_name, dataset, data_type, delimiter, encoding, schema) VALUES (?, ?, ?, ?, ?, ?)
            """, (data['DatasetName'], data['Dataset'], data['DataType'], data['Delimiter'], data['Encoding'], json.dumps(data['Schema'])))

# Commit the transaction
conn.commit()

# Close the connection
conn.close()

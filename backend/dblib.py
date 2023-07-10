import sqlite3
import json

def getAllDatasets():
    conn = sqlite3.connect('datasets.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM datasets")
    rows = cursor.fetchall()

    conn.close()

    datasets = []
    for row in rows:
        datasets.append({
            'id': row[0],
            'dataset_name': row[1],
            'dataset': row[2],
            'data_type': row[3],
            'delimiter': row[4],
            'encoding': row[5],
            'schema': json.loads(row[6]) 
        })
    return datasets
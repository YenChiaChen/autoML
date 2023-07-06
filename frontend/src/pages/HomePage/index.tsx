import React, { useState } from "react";
import { usePredictQuery } from "../../api";
import DataSetList from "./DatasetList";

const HomePage: React.FC = () => {
  const [startPredict, setStartPredict] = useState(false);
  const [dataset, setDataset] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const { data: prediction, error, isLoading } = usePredictQuery(dataset, {
    skip: !file,
  });

  const handleDatasetSelect = (dataset: string) => {
    setDataset(dataset);
    console.log(dataset)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setIsUploadComplete(true); // Set upload status to true
    }
  };

  const handlePredictClick = () => {
    setStartPredict(true);
  }

  return (
    <div className="HomePage">
      <h1>HomePage</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick} disabled={!file}>
        Upload
      </button>
      <DataSetList onSelectDataset={handleDatasetSelect} isUploadComplete={isUploadComplete} />
      <select value={dataset} onChange={(e) => setDataset(e.target.value)}>
        <option value="mnist">MNIST</option>
        {/* add other datasets here */}
      </select>
      <button onClick={handlePredictClick} disabled={isLoading}>
        Predict
      </button>
      {isLoading && <p>Loading prediction...</p>}
      {prediction && (
        <p>
          Prediction:
          <br />
          Logistic Regression: {prediction['LogisticRegression']}
          <br />
          Decision Tree: {prediction['DecisionTree']}
          <br />
          Random Forest: {prediction['RandomForest']}
        </p>
      )}
    </div>
  );
}

export default HomePage;

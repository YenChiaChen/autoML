import React, { useState } from "react";
import DataSetList from "./DatasetList";

const HomePage: React.FC = () => {
  const [startPredict, setStartPredict] = useState(false);
  const [dataset, setDataset] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

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
    </div>
  );
}

export default HomePage;

import React, { useState } from 'react';
import DataList from './DataList';

interface DataSelectPageProps {
  dataset: string;
  setDataset: (dataset: string) => void;
}

const DataSelectPage: React.FC<DataSelectPageProps> = ({ dataset, setDataset }) => {
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  
  const handleDatasetSelect = (dataset: string) => {
    setDataset(dataset);
  };

  return (
    <div className='grid grid-cols-2 gap-2'>
      <p>Upload</p>
      <DataList onSelectDataset={handleDatasetSelect} isUploadComplete={isUploadComplete} />
    </div>
  );
};

export default DataSelectPage;

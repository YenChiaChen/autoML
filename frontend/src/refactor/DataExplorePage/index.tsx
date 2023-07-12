import React, { useState } from 'react';
import { UploadButton } from './UploadButton'; 
import DataTable from './DataTable';

const DataExplorePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataset, setDataset] = useState('');

  const handleFileUpload = (uploadedFile: File | null, loadingStatus: boolean) => {
    setFile(uploadedFile);
    setIsLoading(loadingStatus);

    if (!loadingStatus) {
      setIsUploadComplete(true);
    }
  };

  const handleDatasetSelect = (dataset: string) => {
    setDataset(dataset);
    console.log(dataset)
  };

  return (
    <div className='mx-20 p-5 rounded-sm bg-white shadow'>
      <UploadButton onFileUpload={handleFileUpload} setIsUploadComplete={setIsUploadComplete} />
      {isLoading && <p>Loading...</p>}
      <DataTable onSelectDataset={handleDatasetSelect} isUploadComplete={isUploadComplete} />
    </div>
  );
};

export default DataExplorePage;

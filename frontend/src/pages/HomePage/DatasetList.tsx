import React, { useEffect, useState } from 'react'
import { useListDatasetsQuery } from '../../api';
import { FileUploader } from "react-drag-drop-files";

interface DataSetListProps {
    onSelectDataset: (dataset: string) => void;
    isUploadComplete: boolean;
  }
  

const DataSetList: React.FC<DataSetListProps> = ({ onSelectDataset, isUploadComplete }) => {
  const { data: datasets, error, isLoading, refetch } = useListDatasetsQuery();
  const [file, setFile] = useState<File | null>(null);

  const handleDatasetClick = (dataset: string) => {
    onSelectDataset(dataset);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
    console.log(file)
  };

  useEffect(() => {
    if (isUploadComplete) {
      // Call the useListDatasetsQuery() again to fetch the updated list of datasets
      refetch();
    }
  }, [isUploadComplete, refetch]);
  

  if (isLoading) return <p>Loading datasets...</p>;
  if (error) return <p>Somethings wrong...</p>

  return (
    <ul className='bg-white fixed left-0 top-0 min-h-full shadow'>
        <p className=''>Dataset</p>
      {datasets?.map(dataset => (
        <li className='px-12 py-4' key={dataset} onClick={() => handleDatasetClick(dataset)}>
          {dataset}
        </li>
      ))}
      

    <div className="p-4 flex flex-col items-center gap-2 bg-violet-50 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer">
      <input type="file" className="hidden" onChange={handleFileChange} />
    </div>

    </ul>
  );
};

export default DataSetList;
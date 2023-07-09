import React, { useEffect, useState } from 'react'
import { useListDatasetsQuery } from '../../api';

interface DataSetListProps {
    onSelectDataset: (dataset: string) => void;
    isUploadComplete: boolean;
  }
  
  const DataList: React.FC<DataSetListProps> = ({ onSelectDataset, isUploadComplete }) => {
    const { data: datasets, error, isLoading, refetch } = useListDatasetsQuery();
    const [file, setFile] = useState<File | null>(null);
    const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  
    const handleDatasetClick = (dataset: string) => {
      onSelectDataset(dataset);
      setSelectedDataset(dataset); // record selected dataset
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        setFile(e.target.files[0]);
      }
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
      <div className='bg-white shadow'>
        <p className='px-12 py-4'>Dataset</p>
        <hr  />
        <ul>
          {datasets?.map(dataset => (
            <li 
              className='px-12 py-4 cursor-pointer hover:bg-gray-200 flex justify-between items-center' 
              key={dataset} 
              onClick={() => handleDatasetClick(dataset)}
            >
              {dataset}
              {selectedDataset === dataset && (
                <svg className='h-6 w-6 fill-current text-green-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DataList;
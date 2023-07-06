import React, { useEffect } from 'react'
import { useListDatasetsQuery } from '../../api';

interface DataSetListProps {
    onSelectDataset: (dataset: string) => void;
    isUploadComplete: boolean;
  }
  

const DataSetList: React.FC<DataSetListProps> = ({ onSelectDataset, isUploadComplete }) => {
  const { data: datasets, error, isLoading, refetch } = useListDatasetsQuery();

  const handleDatasetClick = (dataset: string) => {
    onSelectDataset(dataset);
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
    <ul>
      {datasets?.map(dataset => (
        <li key={dataset} onClick={() => handleDatasetClick(dataset)}>
          {dataset}
        </li>
      ))}
    </ul>
  );
};

export default DataSetList;
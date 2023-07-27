import React, { useEffect, useState } from 'react'
import { useGetFilesQuery } from '../../api';

interface DatasetSelectProps {
    selectedDataset: string;
    setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
  }
  


const DatasetSelectCard: React.FC<DatasetSelectProps> = ({selectedDataset, setSelectedDataset}) => {
    const { data: files, error, isLoading, refetch } = useGetFilesQuery()

    if(files){
        console.log(files)
    }
    
    if (isLoading) return <p>Loading datasets...</p>;
    if (error) return <p>Something's wrong...</p>

    return (
        <>
<div className="form-control w-full max-w-xs">
  <select className="select select-bordered">
    <option disabled selected>Pick one</option>
    <option>Star Wars</option>
    <option>Harry Potter</option>
    <option>Lord of the Rings</option>
    <option>Planet of the Apes</option>
    <option>Star Trek</option>
  </select>
</div>

        </>

    );
};

export default DatasetSelectCard;

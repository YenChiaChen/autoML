import React from "react";
import { useGetFilesQuery } from "../../api";

interface DatasetSelectProps {
  selectedDataset: string;
  setSelectedDataset: React.Dispatch<React.SetStateAction<string>>;
}

interface FileData {
  filename: string;
  uploadtime: string;
  datasize: number;
  column_number: number;
}

const DatasetSelectCard: React.FC<DatasetSelectProps> = ({
  selectedDataset,
  setSelectedDataset,
}) => {
  const { data: files, error, isLoading, refetch } = useGetFilesQuery();

  if (isLoading) return <p>Loading datasets...</p>;
  if (error) return <p>Something's wrong...</p>;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedDataset(selectedValue);
    console.log(selectedDataset)
  };

  return (
    <>
      <div className="form-control w-full max-w-xs mt-10">
        <select className="select select-bordered" onChange={handleChange}>
          <option disabled selected>
            Select Dataset
          </option>
          {files?.map((dataset: FileData, index) => (
            <option  key={index} value={dataset.filename}>{dataset.filename}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DatasetSelectCard;

import React, {useState} from "react"
import DataList from "./DataList";

const SelectDataPage: React.FC = () => {

    const [dataset, setDataset] = useState('')
    const [isUploadComplete, setIsUploadComplete] = useState(false)
    const handleDatasetSelect = (dataset: string) => {
        setDataset(dataset);
        console.log(dataset)
      };
  
  return (
    <>
        <div className='grid grid-cols-2 gap-2'>
            <p>Upload</p>
            <DataList onSelectDataset={handleDatasetSelect} isUploadComplete={isUploadComplete}  />
        </div>
    </>
  );
};

export default SelectDataPage;

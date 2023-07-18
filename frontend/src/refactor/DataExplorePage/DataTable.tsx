import React, { useEffect, useState } from 'react'
import { useGetFilesQuery } from '../../api';
import { UploadButton } from './UploadButton';
import DeleteButton from './DeleteButton';
import DatasetPreview from './DataPreview';
import DatasetProfiler from './ProfilingView';
import DatasetPreprocessing from './Preprocessing'

interface FileData {
    filename: string;
    uploadtime: string;
    datasize: number;
    column_number: number;
}

const DataTable: React.FC = () => {
    const { data: files, error, isLoading, refetch } = useGetFilesQuery()
    const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const [uploading, setUploading] = useState(false)
    
    const handleDatasetClick = (dataset: string) => {
        setSelectedDataset(selectedDataset !== dataset ? dataset : null);
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, dataset: string) => {
        if (e.target.checked) {
            setSelectedFiles([...selectedFiles, dataset]);
        } else {
            setSelectedFiles(selectedFiles.filter(file => file !== dataset));
        }
        console.log(selectedFiles)
    };

    const handleFileUpload = (uploadedFile: File | null, loadingStatus: boolean) => {
        setUploading(loadingStatus);
    
        if (!loadingStatus) {
          setIsUploadComplete(true);
        }
      };
      const handleToggleChange = (dataset: string, checked: boolean) => {
        setSelectedDataset(checked ? dataset : null);
    };
    
    useEffect(() => {
        if (isUploadComplete) {
            refetch();
        }
    }, [isUploadComplete, refetch]);
    
    if (isLoading) return <p>Loading datasets...</p>;
    if (error) return <p>Something's wrong...</p>

    return (
        <>
       <div className="max-w-full">
  <UploadButton onFileUpload={handleFileUpload} setIsUploadComplete={setIsUploadComplete} />
  <DeleteButton selectedFiles={selectedFiles}  />
  {uploading && <p>Loading...</p>}
  <div className="mt-10 overflow-x">
    <table className="table table-auto overflow-scroll w-full">
      <thead>
        <tr>
          <th></th>
          <th>Dataset</th>
          <th>Column Numbers</th>
          <th>Data Size</th>
          <th>Upload Time</th>
          <th>Analysis Panel</th>
        </tr>
      </thead>
      <tbody>
        {files?.map((dataset:FileData, index) => (
          <React.Fragment key={index}>
            <tr className='hover'>
              <td><input type="checkbox" className="checkbox checkbox-sm" onChange={(e) => handleCheckboxChange(e, dataset.filename)}/></td>
              <td>{dataset.filename}</td>
              <td>{dataset.column_number}</td>
              <td>{Math.round((dataset.datasize / (1024*1024)) * 100) / 100} MB</td>
              <td>{dataset.uploadtime}</td>
              <td><input type="checkbox" className="toggle toggle-sm" onChange={(e) => handleToggleChange(dataset.filename, e.target.checked)} /></td>
            </tr>
            {selectedDataset === dataset.filename && (
              <tr>
                <td colSpan={6}>
                    <DatasetPreview filename={dataset.filename} />
                    <DatasetProfiler filename={dataset.filename} />
                    {/* <DatasetPreprocessing filename={dataset.filename} /> */}
                    <div className='my-5'>&nbsp;</div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </>

    );
};

export default DataTable;

import React, { useEffect, useState } from 'react'
import { useGetFilesQuery } from '../../api';

interface DataSetListProps {
    onSelectDataset: (dataset: string) => void;
    isUploadComplete: boolean;
}
interface FileData {
    filename: string;
    uploadtime: string;
    datasize: number;
    column_number: number;
}

const DataTable: React.FC<DataSetListProps> = ({ onSelectDataset, isUploadComplete }) => {
    const { data: files, error, isLoading, refetch } = useGetFilesQuery()
    const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
    
    const handleDatasetClick = (dataset: string) => {
        setSelectedDataset(selectedDataset !== dataset ? dataset : null);
        onSelectDataset(dataset);
    };
    
    useEffect(() => {
        if (isUploadComplete) {
            refetch();
        }
    }, [isUploadComplete, refetch]);
    
    if (isLoading) return <p>Loading datasets...</p>;
    if (error) return <p>Something's wrong...</p>

    return (
        <div className="overflow-x-auto mt-10">
            <table className="table">
                <thead>
                    <tr>
                        <th>Dataset</th>
                        <th>Column Numbers</th>
                        <th>Data Size</th>
                        <th>Upload Time</th>
                    </tr>
                </thead>
                <tbody>
                    {files?.map((dataset:FileData, index) => (
                        <>
                            <tr className='hover' key={dataset.filename} onClick={() => handleDatasetClick(dataset.filename)}>
                                <td>{dataset.filename}</td>
                                <td>{dataset.column_number}</td>
                                <td>{Math.round((dataset.datasize / (1024*1024)) * 100) / 100} MB</td>
                                <td>{dataset.uploadtime}</td>
                            </tr>
                            {selectedDataset === dataset.filename && (
                                <tr>
                                    <td colSpan={4}>
                                        {/* Add your information panel here */}
                                        <div>Your extra information for {dataset.filename}</div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

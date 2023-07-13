import React, { useState } from 'react';
import { useGetDatasetPreviewQuery } from '../../api';

interface DatasetPreviewProps {
  filename: string;
}

const DatasetPreview: React.FC<DatasetPreviewProps> = ({ filename }) => {
  const { data: previewData, error, isLoading } = useGetDatasetPreviewQuery(filename);

  if (isLoading) return <p>Loading preview...</p>;
  if (error) {console.log(error); return <p>Something's wrong...</p>};

  return (
    <div tabIndex={0} className="collapse collapse-plus border border-base-300 shadow">
  <div className="collapse-title text-sm font-medium">
    Preview
  </div>
  <div className="collapse-content"> 
  <div className="overflow-auto h-[300px] w-[800px] my-10">
          <table className="table table-xs table-auto min-w-full table-pin-rows">
            <thead>
              <tr>
                {Object.keys(previewData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((item: Record<string, any>, index: number) => (
                <tr key={index}>
                  {Object.values(item).map((value: any, i: number) => (
                    <td key={i}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  </div>
  </div>
  );
};

export default DatasetPreview;

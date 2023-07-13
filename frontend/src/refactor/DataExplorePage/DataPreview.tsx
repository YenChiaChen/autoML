import React from 'react';
import { useGetDatasetPreviewQuery } from '../../api';

interface DatasetPreviewProps {
  filename: string;
}

const DatasetPreview: React.FC<DatasetPreviewProps> = ({ filename }) => {
  const { data: previewData, error, isLoading } = useGetDatasetPreviewQuery(filename);

  if (isLoading) return <p>Loading preview...</p>;
  if (error) {console.log(error); return <p>Something's wrong...</p>};

  return (
    <div className='p-5 bg-white rounded-xl shadow-xl'>
        <p className='text-sm text-[#333333] my-5'>Preview</p>
<div className="overflow-auto h-[300px] w-[800px]">  {/* Adjust the height value to what you need */}
  <table className="table table-xs table-auto min-w-full table-pin-rows">
    <thead>
      <tr>
        {/* Generate the header row based on the keys of the first item */}
        {Object.keys(previewData[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {/* Generate the data rows */}
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

  );
};

export default DatasetPreview;

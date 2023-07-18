// DataFrameInfoTable.tsx
import React from 'react';
import { useGetColumnsQuery } from '../../../api';

interface DatasetComponentProps {
    filename: string;
}  

export const DataFrameInfoTable: React.FC<DatasetComponentProps> = ({ filename }) =>  {
  const { data,error, isLoading } = useGetColumnsQuery(filename);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(error){
    console.log(error)
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Missing Values</th>
          <th className="px-4 py-2">Handling Strategy</th>
          <th className="px-4 py-2">Examples</th>
        </tr>
      </thead>
      <tbody>
  {data && data.columns.map((column) => (
    <tr key={column.name}>
      <td className="border px-4 py-2">{column.name}</td>
      <td className="border px-4 py-2">{column.category}</td>
      <td className="border px-4 py-2">
        {`${column.missing_values.count} (${column.missing_values.percentage}%)`}
      </td>
      <td className="border px-4 py-2">{column.handling_strategy}</td>
      <td className="border px-4 py-2">{column.examples.join(', ')}</td>
    </tr>
  ))}
</tbody>
    </table>
  );
};

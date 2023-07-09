import React, { useState } from 'react';
import { useGetSupportModelsQuery } from '../../api'

const ModelSelectPage: React.FC = () => {
    const { data, error, isLoading } = useGetSupportModelsQuery();
  
    if (isLoading) return <div>Loading...</div>;
  
    return (
      <div>
        <h1>Support Models</h1>
        <ul>
          {data?.map((model, index) => (
            <li key={index}>{model}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ModelSelectPage;

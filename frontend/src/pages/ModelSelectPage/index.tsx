// ModelSelectPage.tsx
import React from 'react';
import { useGetSupportModelsQuery } from '../../api';

interface ModelSelectPageProps {
  selectedModels: string[];
  setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModelSelectPage: React.FC<ModelSelectPageProps> = ({ selectedModels, setSelectedModels }) => {
  const { data, error, isLoading } = useGetSupportModelsQuery();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedModels((prev) => [...prev, event.target.value]);
    } else {
      setSelectedModels((prev) =>
        prev.filter((model) => model !== event.target.value)
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Support Models</h1>
      {data?.map((model, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              value={model}
              onChange={handleCheckboxChange}
              checked={selectedModels.includes(model)}
            />
            {model}
          </label>
        </div>
      ))}
      <div>
        <h2>Selected Models:</h2>
        <ul>
          {selectedModels.map((model, index) => (
            <li key={index}>{model}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModelSelectPage;

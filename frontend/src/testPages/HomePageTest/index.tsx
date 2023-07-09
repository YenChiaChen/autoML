import React, { useState } from "react";
import { useModelsMutation } from "../../api";
import DataSetList from "../HomePage/DatasetList";

const options = ['Naive Bayes', 'Random Forest', 'Linear Regression'];

const HomePageTest: React.FC = () => {
    const [dataset, setDataset] = useState('')
    const [isUploadComplete, setIsUploadComplete] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [createModels, { isLoading }] = useModelsMutation();
    const [accuracies, setAccuracies] = useState<Record<string, number>>({});
    const handleDatasetSelect = (dataset: string) => {
        setDataset(dataset);
        console.log(dataset)
      };
    
  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      options: selectedOptions,
      fileName: dataset,
    };

    createModels(data)
      .unwrap()
      .then((response) => {
        // Handle successful response
        console.log('Models created successfully!');
        setAccuracies(response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating models:', error);
      });
  };
  return (
    <>
        <DataSetList onSelectDataset={handleDatasetSelect} isUploadComplete={isUploadComplete} />
        <div className='sm:ml-60'>Current Dataset: { dataset }</div>
        <div className="p-4 sm:ml-60">
      <form onSubmit={handleFormSubmit}>
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="form-checkbox"
            />
            <span>{option}</span>
          </label>
        ))}
        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <div className="mt-4">
        {Object.entries(accuracies).map(([option, accuracy]) => (
          <p key={option}>
            {option}: {accuracy.toFixed(2)}
          </p>
        ))}
      </div>
    </div>
    </>
  )
}

export default HomePageTest;

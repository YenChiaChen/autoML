import React, { useState } from "react";
import Stepper from "./components/Stepper";
import { useFetchDatasetsQuery } from "../api";

const HomePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Select Dataset",
    "Dataset Preview",
    "Choose Your Model",
    "Result",
  ];
  const { data: datasets, error, isLoading } = useFetchDatasetsQuery();
  const content = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {datasets?.map((dataset) => (
          <div key={dataset.id}>
            <h2>{dataset.dataset_name}</h2>
            <p>Dataset: {dataset.dataset}</p>
            <p>Data Type: {dataset.data_type}</p>
            <p>Delimiter: {dataset.delimiter}</p>
            <p>Encoding: {dataset.encoding}</p>
            <p>Schema: {JSON.stringify(dataset.schema, null, 2)}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full my-10 flex justify-center items-center">
        <ul className="steps">
          {steps.map((step, index) => (
            <Stepper
              key={index}
              index={index}
              step={step}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          ))}
        </ul>
      </div>

      <div className="px-20 mt-10">
        <div className="w-75 bg-gray-100 p-10 rounded-xl">
          <p>{content()}</p>

          <div className="w-full flex justify-end">
            <button className="btn bg-blue-500 hover:bg-blue-300 text-white">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

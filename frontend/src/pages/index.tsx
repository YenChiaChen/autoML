import React, {useState} from "react"
import Stepper from "./components/Stepper";
import DataSelectPage from "./DataSelectPage";
import DataShowPage from "./DataShowPage";
const HomePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Select Dataset", "Dataset Preview", "Choose Your Model", "Result"];
  const [dataset, setDataset] = useState('');

  const renderStepComponent = () => {
    switch(currentStep) {
      case 0:
        return <DataSelectPage dataset={dataset} setDataset={setDataset} />
      case 1:
        return <DataShowPage dataset={dataset} />
      case 2:
        return <p>Select Model Page</p>
      case 3:
        return <p>Result Page</p>
      default:
        return <p>Select Dataset Page</p>
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }
  
  return (
    <>
        <div className='w-full my-10 flex justify-center items-center'>
          <ul className="steps">
            {steps.map((step, index) => (
              <Stepper key={index} index={index} step={step} currentStep={currentStep} setCurrentStep={setCurrentStep} />
            ))}
          </ul>
        </div>

        <div className='px-20 mt-10'>
            <div className='w-75 bg-gray-100 p-10'>
                {renderStepComponent()}
                <div className='mt-10 flex justify-items-end w-full mr-10'>
                     <button className='btn' onClick={nextStep}>Next Step</button>
                </div>
            </div>
        </div>
    </>
  );
};

export default HomePage;

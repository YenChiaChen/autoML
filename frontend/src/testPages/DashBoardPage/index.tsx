import React, {useState} from "react"
import Step from "./Step";
import SelectDataPage from "../SelectDataPage";

const DashBoardPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Select Dataset", "Dataset Preview", "Choose Your Model", "Result", "Fine-Tuning", "Download"];
  
  return (
    <>
        <div className='w-full my-10 flex justify-center items-center'>
          <ul className="steps">
            {steps.map((step, index) => (
              <Step key={index} index={index} step={step} currentStep={currentStep} setCurrentStep={setCurrentStep} />
            ))}
          </ul>
        </div>

        <div className='px-20 mt-10'>
            <div className='w-75 bg-gray-100 p-10'>
                <SelectDataPage />
            </div>
        </div>

    </>
  );
};

export default DashBoardPage;

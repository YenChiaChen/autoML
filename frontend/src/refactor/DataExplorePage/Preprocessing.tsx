import React, { useState } from 'react';
import ProprocessTypes from './PreprocessComponent/PreprocessTypes'

interface DatasetPreviewProps {
    filename: string;
}

// This is a dummy component. You can replace it with the real component for step 2.
const StepTwoComponent: React.FC<DatasetPreviewProps> = ({ filename }) => {
    return <div>Step Two Component for {filename}</div>;
};

const DatasetPreprocessing: React.FC<DatasetPreviewProps> = ({ filename }) => {
    const [step, setStep] = useState(1);
  
    const handleNextStep = () => {
        setStep(step + 1);
    };

    const renderStepComponent = () => {
        switch (step) {
            case 1:
                return <ProprocessTypes filename={filename} />;
            case 2:
                return <StepTwoComponent filename={filename} />;
            default:
                return <ProprocessTypes filename={filename} />;
        }
    };

    return (
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 mt-5">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title text-sm font-medium">
                Auto Preprocessing 
            </div>
            <div className="collapse-content"> 
                <p>Step {step}</p>
                {renderStepComponent()}
                <div className='w-full my-5 text-right'>
                    <button className='btn' onClick={handleNextStep}>Next Step</button>
                </div>
            </div>
        </div>
    );
};

export default DatasetPreprocessing;

import React, { useState } from 'react';
import {DataFrameInfoTable} from './PreprocessComponent/DataFrameInfoTable';

interface DatasetPreviewProps {
    filename: string;
}

const DatasetPreprocessing: React.FC<DatasetPreviewProps> = ({ filename }) => {
    const [step, setStep] = useState(1);
    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleLastStep = () => {
        setStep(step - 1);
    }

    const renderStepComponent = () => {
        switch (step) {
            case 1:
                return <DataFrameInfoTable filename={filename}  />
            case 2:
                return <p>Loading</p>
            default:
                return <p>Loading</p>;
        }
    };

    return (
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 mt-5">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title text-sm font-medium">
                Auto Preprocessing 
            </div>
            <div className="collapse-content"> 
                <p>Columns Setting</p>
                {renderStepComponent()}
                <div className='w-full my-5 text-right'> 
                    {step>1 &&<button className='btn' onClick={handleLastStep}>Previous</button>}
                    {step>1 &&<button className='btn ml-5 btn-primary' onClick={handleNextStep}>Next Step</button>}
                </div>
            </div>
        </div>
    );
};

export default DatasetPreprocessing;

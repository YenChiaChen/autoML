import React, { useState } from 'react';
import ProprocessTypes from './PreprocessComponent/PreprocessTypes'
import TargetColumn from './PreprocessComponent/TargetColumn';
import { useGetDatasetTypesQuery } from '../../api';

interface DatasetPreviewProps {
    filename: string;
}
interface DataType {
    type: string;
    isCategorical: boolean;
    examples: string[];
}

interface Dataset {
    [key: string]: DataType;
}

// This is a dummy component. You can replace it with the real component for step 2.
const StepTwoComponent: React.FC<DatasetPreviewProps> = ({ filename }) => {
    return <div>Step Two Component for {filename}</div>;
};

const DatasetPreprocessing: React.FC<DatasetPreviewProps> = ({ filename }) => {
    const [step, setStep] = useState(1);
    const [targetColumn, setTargetColumn] = useState('');
    const { data: dataset, error, isLoading } = useGetDatasetTypesQuery(filename);
    const handleNextStep = () => {
        setStep(step + 1);
        console.log(targetColumn)
    };

    const handleLastStep = () => {
        setStep(step - 1);
    }

    const renderStepComponent = () => {
        switch (step) {
            case 1:
                if (dataset)
                    return <TargetColumn dataset={dataset} onTargetColumnSelected={setTargetColumn} />
                else
                    return <p>Loading</p>
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
                    {step>1 &&<button className='btn' onClick={handleLastStep}>Previous</button>}
                    <button className='btn ml-5 btn-primary' onClick={handleNextStep}>Next Step</button>
                </div>
            </div>
        </div>
    );
};

export default DatasetPreprocessing;

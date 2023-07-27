
import React, { useState } from 'react';
import DatasetSelectCard from './DatasetSelectCard';

enum Steps {
  UPLOAD = 'UPLOAD',
  CLEAN = 'CLEAN',
  SAVE = 'SAVE',
}

const PreprocessingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<Steps>(Steps.UPLOAD);
  const [selectedDataset, setSelectedDataset] = useState<string>('');

  const handleNextStep = (step: Steps) => {
    switch (step) {
      case Steps.UPLOAD:
        setActiveStep(Steps.CLEAN);
        break;
      case Steps.CLEAN:
        setActiveStep(Steps.SAVE);
        break;
      case Steps.SAVE:
        console.log('Done');
        break;
    }
  };

  const Card: React.FC<{ step: Steps; children: React.ReactNode }> = ({ step, children }) => (
    <div
      className={`m-2 p-4 ${activeStep === step ? 'bg-white' : 'bg-gray-200'} w-full card shadow`}
      onClick={() => activeStep === step && handleNextStep(step)}
    >
      {children}
    </div>
  );

  return (
    <div className='mx-20 p-5 rounded-xl bg-white shadow'>
    <div className="flex flex-col items-center justify-center bg-gray-100 px-10">
      <Card step={Steps.UPLOAD}>
        <h2>Step 1: Choose Dataset</h2>
        {activeStep === Steps.UPLOAD && 
        <>
          <DatasetSelectCard selectedDataset={selectedDataset} setSelectedDataset={setSelectedDataset} />
          <button className='btn' onClick={() => handleNextStep(Steps.UPLOAD)}>Next</button>
          </>
        }
      </Card>

      <Card step={Steps.CLEAN}>
        <h2>Step 2: Clean</h2>
        {activeStep === Steps.CLEAN && <button className='btn' onClick={() => handleNextStep(Steps.CLEAN)}>Next</button>}
      </Card>

      <Card step={Steps.SAVE}>
        <h2>Step 3: Save</h2>
        {activeStep === Steps.SAVE && <button className='btn' onClick={() => handleNextStep(Steps.SAVE)}>Done</button>}
      </Card>
    </div>
    </div>
  );
};

export default PreprocessingPage;



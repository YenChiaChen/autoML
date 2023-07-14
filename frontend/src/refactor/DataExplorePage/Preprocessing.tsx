// DatasetProfiler.tsx
import React, { useState, useEffect, useRef } from 'react';
import ProprocessTypes from './PreprocessComponent/PreprocessTypes'


interface DatasetPreviewProps {
    filename: string;
  }
  
const DatasetPreprocessing: React.FC<DatasetPreviewProps> = ({ filename }) => {
  
    return (
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 mt-5">
        <input type="checkbox" className="peer" /> 
        <div className="collapse-title text-sm font-medium">
        Auto Preprocessing 
        </div>
        <div className="collapse-content"> 
            <ProprocessTypes filename={filename} />
            <div></div>
        </div>
      </div>
    
    );
  };

export default DatasetPreprocessing

  
  
  
  
  
  
  

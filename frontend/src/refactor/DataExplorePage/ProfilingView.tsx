// DatasetProfiler.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useGetProfileQuery } from '../../api';


interface DatasetPreviewProps {
    filename: string;
  }
  
const DatasetProfiler: React.FC<DatasetPreviewProps> = ({ filename }) => {
    const { data: profileData, error, isLoading } = useGetProfileQuery(filename);
    const [profileUrl, setProfileUrl] = useState('');
  
    useEffect(() => {
      if (profileData) {
        setProfileUrl(`http://localhost:5000/profiles/${profileData.profile_filename}`);
        console.log(profileUrl)
      }
    }, [profileData]);
  
    return (
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 mt-5">
        <input type="checkbox" className="peer" /> 
        <div className="collapse-title text-sm font-medium">
        Dataset Profiler - Pandas
        </div>
        <div className="collapse-content"> 
        {isLoading && <p>Loading...</p>}
        {profileUrl && (
          <embed type="text/html" src={profileUrl} width="100%" height="400"></embed>
        )}
        </div>
      </div>
    
    );
  };

export default DatasetProfiler

  
  
  
  
  
  
  

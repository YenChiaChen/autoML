import React, { useRef } from 'react';
import { useUploadFileMutation } from '../../api'

const UploadButton: React.FC = () => {
  const [uploadFile] = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async () => {
    if (fileInputRef.current && fileInputRef.current.files?.length) {
      const file = fileInputRef.current.files[0];
      try {
        await uploadFile(file);
        alert('File uploaded successfully');
      } catch (error) {
        alert('Error uploading the file');
      }
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default UploadButton;

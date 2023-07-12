import React, { FC, ChangeEvent } from 'react';

interface UploadButtonProps {
  onFileUpload: (file: File | null, isLoading: boolean) => void;
  setIsUploadComplete: (isUploadComplete: boolean) => void;
}

export const UploadButton: FC<UploadButtonProps> = ({ onFileUpload, setIsUploadComplete }) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileUpload(e.target.files[0], true); // Start uploading and set loading to true

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("There was an error uploading the file:", error);
      } finally {
        onFileUpload(e.target.files[0], false); // Finish uploading and set loading to false
        setIsUploadComplete(true)
      }
    }
  };

  return (
    <>
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        className='hidden'
      />
      <label htmlFor="file-input" className="btn">
        upload
      </label>
    </>
  );
};

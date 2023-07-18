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
      <label htmlFor="file-input" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Upload
      </label>
    </>
  );
};

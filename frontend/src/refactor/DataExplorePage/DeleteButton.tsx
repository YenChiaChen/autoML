import React from 'react'
import { useDeleteFileMutation } from '../../api';

interface DeleteButtonProps {
    selectedFiles: string[];
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ selectedFiles }) => {
    const [deleteFile, { isLoading, error }] = useDeleteFileMutation()

    const handleDelete = async () => {
        for (const file of selectedFiles) {
            await deleteFile(file).unwrap()
        }
    }

    if (isLoading) return <button disabled>Deleting...</button>

    return (
        <button className='ocus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton

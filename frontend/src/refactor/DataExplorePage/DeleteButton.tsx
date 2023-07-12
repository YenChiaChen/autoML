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
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton

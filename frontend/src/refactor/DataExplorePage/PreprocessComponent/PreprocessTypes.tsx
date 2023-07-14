
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'
import { useGetDatasetTypesQuery, useSetDatasetMutation} from '../../../api';

interface DatasetComponentProps {
    filename: string;
    step: number;
    setStep: (newStep: number) => void; 
}  
interface DataType {
    type: string;
    isCategorical: boolean;
    examples: string[];
  }

interface Dataset {
    [key: string]: DataType;
}

const dataTypes = ['object', 'int64', 'float64', 'bool', 'datetime64', 'timedelta[ns]', 'category'];
const categories = ['Categorical', 'Numerical'];

const ProprocessTypes: React.FC<DatasetComponentProps> = ({ filename,step ,setStep}) => {
    const { data: dataset, error, isLoading } = useGetDatasetTypesQuery(filename);
    const [setDataset, { isSuccess }] = useSetDatasetMutation();
    const [targetColumn, setTargetColumn] = useState<string | null>(null);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [editedDataset, setEditedDataset] = useState<any>(null);

    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (dataset) {
            setEditedDataset(dataset);
        }
    }, [dataset]);

    useEffect(() => {
        if (isSuccess) {
            // Clear the state after successfully setting the dataset
            setEditedDataset(null);
            setShowTable(false);
            setTargetColumn(null);
        }
    }, [isSuccess]);

    const handleNextStep = async () => {
        if (!showTable) {
            setShowTable(true);
        } else {
            // Save the dataset changes
            await setDataset({ filename, data: editedDataset });
            setStep(step + 1)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!dataset) {
        return <div>No data available</div>;
    }

    const handleTypeChange = (column: string, type: string) => {
        setEditedDataset((prev: Dataset) => ({
            ...prev,
            [column]: { ...prev[column], type },
        }));
    }

    const handleCategoryChange = (column: string, isCategorical: boolean) => {
        setEditedDataset((prev: Dataset) => ({
            ...prev,
            [column]: { ...prev[column], isCategorical },
        }));
    }

    const orderedDataset = targetColumn
        ? { [targetColumn]: editedDataset[targetColumn], ...editedDataset }
        : editedDataset;

    return (
        <div className="p-4">
            <p className='text-sm text-[#333333] mb-3'>Choose Target Value and Modify Data Type</p>
            {!showTable && (
                <div>
                    <select onChange={(e) => {
    setTargetColumn(e.target.value);
    setShowTable(true); // This line makes the table appear as soon as a target column is selected
}} className="select select-bordered w-full">
                        <option disabled defaultValue={'Select Columns'}>Select Columns...</option>
                        {Object.keys(dataset).map((columnName, index) => (
                            <option key={index} value={columnName}>
                                {columnName}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {showTable && (
                <>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/4 px-4 py-2">Column Name</th>
                            <th className="w-1/4 px-4 py-2">Data Type</th>
                            <th className="w-1/4 px-4 py-2">Category</th>
                            <th className="w-1/4 px-4 py-2">Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(orderedDataset).map((columnName, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{columnName}</td>
                                <td className="border px-4 py-2">
                                    <select value={orderedDataset[columnName].type} onChange={(e) => handleTypeChange(columnName, e.target.value)}>
                                        {dataTypes.map((dataType, i) => (
                                            <option key={i} value={dataType}>{dataType}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <select value={orderedDataset[columnName].isCategorical ? 'Categorical' : 'Numerical'} onChange={(e) => handleCategoryChange(columnName, e.target.value === 'Categorical')}>
                                        {categories.map((category, i) => (
                                            <option key={i} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {orderedDataset[columnName].examples.map((example: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, i: React.Key | null | undefined) => (
                                            <li key={i}>{example}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='w-full my-5 text-right'> 
                    <button onClick={handleNextStep} className="btn ml-5 btn-primary">Next Step</button>
                </div>
                </>
            )}
        </div>
    );
};

export default ProprocessTypes


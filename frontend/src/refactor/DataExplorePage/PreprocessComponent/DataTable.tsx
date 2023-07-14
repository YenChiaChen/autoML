interface DataType {
    type: string;
    isCategorical: boolean;
    examples: string[];
}

interface Dataset {
    [key: string]: DataType;
}
interface DataTableProps {
    dataset: Dataset;
    targetColumn: string;
    onDatasetChanged: (newDataset: Dataset) => void;
}

const dataTypes = ['object', 'int64', 'float64', 'bool', 'datetime64', 'timedelta[ns]', 'category'];
const categories = ['Categorical', 'Numerical'];

const DataTable: React.FC<DataTableProps> = ({ dataset, targetColumn, onDatasetChanged }) => {
    const handleTypeChange = (column: string, type: string) => {
        const newDataset = {
            ...dataset,
            [column]: { ...dataset[column], type },
        };
        onDatasetChanged(newDataset);
    }

    const handleCategoryChange = (column: string, isCategorical: boolean) => {
        const newDataset = {
            ...dataset,
            [column]: { ...dataset[column], isCategorical },
        };
        onDatasetChanged(newDataset);
    }

    const orderedDataset = targetColumn
        ? { [targetColumn]: dataset[targetColumn], ...dataset }
        : dataset;

    return (
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
                                {orderedDataset[columnName].examples.map((example, i) => (
                                    <li key={i}>{example}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable

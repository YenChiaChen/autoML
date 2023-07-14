
interface DataType {
    type: string;
    isCategorical: boolean;
    examples: string[];
}

interface Dataset {
    [key: string]: DataType;
}

interface TargetColumnProps {
    dataset: Dataset;
    onTargetColumnSelected: (column: string) => void;
}

const TargetColumn: React.FC<TargetColumnProps> = ({ dataset, onTargetColumnSelected }) => {
    return (
        <div>
            <label className='label my-1'>
                <span className="label-text">Select Your Target Column</span>
            </label>
            <select onChange={(e) => onTargetColumnSelected(e.target.value)} className="select select-bordered w-full">
                {Object.keys(dataset).map((columnName, index) => (
                    <option key={index} value={columnName}>
                        {columnName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TargetColumn
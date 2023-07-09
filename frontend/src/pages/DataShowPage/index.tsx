import React, { useState } from "react";
import {
  useFetchColumnsQuery,
  useFetchColumnEdaQuery,
  useFetchDatasetEdaQuery,
  useFetchColumnValuesQuery,
} from "../../api";
import Select from "react-select";
import Plot from "react-plotly.js";
interface DataSelectPageProps {
  dataset: string;
}

const DataShowPage: React.FC<DataSelectPageProps> = ({ dataset }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const { data: columns = [], isLoading } = useFetchColumnsQuery(dataset);
  const options = columns.map((column) => ({ value: column, label: column }));
  const { data: eda } = useFetchColumnEdaQuery(
    { dataset, column: selectedColumn },
    { skip: !selectedColumn }
  );
  const { data: datasetEda } = useFetchDatasetEdaQuery(dataset);
  const { data: columnValues } = useFetchColumnValuesQuery(
    { dataset, column: selectedColumn },
    { skip: !selectedColumn }
  );
  const colors = columnValues?.map((value, index) => (index % 2 === 0 ? 'blue' : 'red'));
  const plotStyle = {
    borderRadius: '10px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
    width: '50%',
  };
  

  const handleColumnChange = (selectedOption: any) => {
    setSelectedColumn(selectedOption.value);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Select options={options} onChange={handleColumnChange} />
          {eda && (
            <div>
              <h3>EDA for column: {selectedColumn}</h3>
              <p>Mean: {eda.mean}</p>
              <p>Median: {eda.median}</p>
              <p>Min: {eda.min}</p>
              <p>Max: {eda.max}</p>
              <p>Unique count: {eda.unique_count}</p>
              <p>Null count: {eda.null_count}</p>
            </div>
          )}
          {datasetEda && (
            <div>
              <h3>Dataset Statistics</h3>
              <p>Number of Variables: {datasetEda.number_of_variables}</p>
              <p>Number of Observations: {datasetEda.number_of_observations}</p>
              <p>Missing Cells: {datasetEda.missing_cells}</p>
              <p>
                Missing Cells Percentage: {datasetEda.missing_cells_percentage}
              </p>
              <p>Duplicated Rows: {datasetEda.duplicated_rows}</p>
              <p>
                Duplicated Rows Percentage:{" "}
                {datasetEda.duplicated_rows_percentage}
              </p>
              <p>Total Size in Memory: {datasetEda.total_size_in_memory}</p>
            </div>
          )}
          {columnValues && (
            <div>
              <h3>Distribution of column: {selectedColumn}</h3>
              <Plot
              style={plotStyle}
                data={[
                  {
                    type: 'histogram',
                    x: columnValues,
                    marker: { color: colors },  // Use the colors array
                  },
                ]}
                layout={{ width: 500, height: 300 }}
                className="rounded-lg"
              />
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataShowPage;

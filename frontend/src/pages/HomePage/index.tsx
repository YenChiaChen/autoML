// src/pages/HomePage/HomePage.tsx

import React, { useState } from "react";
import { usePredictQuery } from "../../api";

const HomePage: React.FC = () => {
  const [dataset, setDataset] = useState('mnist');
  const [startPredict, setStartPredict] = useState(false);
  const { data: prediction, error, isLoading } = usePredictQuery(dataset, {
    skip: !startPredict
  });

  const handlePredictClick = () => {
    setStartPredict(true);
  }

  return (
    <div className="HomePage">
      <h1>HomePage</h1>
      <select value={dataset} onChange={(e) => setDataset(e.target.value)}>
        <option value="mnist">MNIST</option>
        {/* add other datasets here */}
      </select>
      <button onClick={handlePredictClick} disabled={isLoading}>
        Predict
      </button>
      {isLoading && <p>Loading prediction...</p>}
      {prediction && (
        <p>
          Prediction:
          <br />
          Logistic Regression: {prediction['LogisticRegression']}
          <br />
          Decision Tree: {prediction['DecisionTree']}
          <br />
          Random Forest: {prediction['RandomForest']}
        </p>
      )}
    </div>
  );
}

export default HomePage;

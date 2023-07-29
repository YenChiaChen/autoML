import React from "react";

const AutoMLPage: React.FC = () => {
  return (
    <>
      <div className="mx-20 p-5 rounded-xl bg-white shadow text-center">
        <div className="card mx-64 bg-base-100 shadow-xl mt-5 px-5">
          <p className="my-5 font-bold">Random Forest-Auto-tune</p>
          <div className="flex justify-around w-full max-w-4xl">
            <div className="w-20 text-blue-800">99.7</div>
            <div className="w-20 text-blue-800">99.9</div>
            <div className="w-20 text-blue-800">99.7</div>
          </div>
          <div className="flex justify-around w-full max-w-4xl mt-1">
            <div className="w-20 text-xs">F1-Score</div>
            <div className="w-20 text-xs">Precision</div>
            <div className="w-20 text-xs">Recall</div>
          </div>
          

          <div className='mt-10 font-bold text-sm'>Model Detail</div>
          <div className="overflow-x-auto">
  <table className="table mt-5">
    <thead>
      <tr>
        <th>Parameters</th>
        <th>Setting</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>bootstrap</th>
        <td>True</td>
      </tr>
      <tr className="hover">
        <th>max_depth</th>
        <td>70</td>
      </tr>
      <tr className="hover">
        <th>max_features</th>
        <td>auto</td>
      </tr>
      <tr className="hover">
        <th>min_samples_leaf</th>
        <td>4</td>
      </tr>
      <tr className="hover">
        <th>min_samples_split</th>
        <td>10</td>
      </tr>
      <tr className="hover">
        <th>n_estimators</th>
        <td>400</td>
      </tr>
    </tbody>
  </table>
</div>

          <div></div>
 
          <div className="flex justify-around w-full max-w-4xl my-10">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-2.5">Download Model</button>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-2.5">Download Code</button>
             </div>
        </div>
        <div className="flex justify-around w-full mt-10">
          <div className="card bg-base-200 shadow-xl mt-5 w-64 px-10">
            <p className="my-5 text-sm">Naive Bayes</p>

            <div className="flex justify-around w-full max-w-4xl">
              <div className="w-20 text-blue-800">95.0</div>
              <div className="w-20 text-blue-800">97.1</div>
              <div className="w-20 text-blue-800">95.0</div>
            </div>
            <div className="flex justify-around w-full max-w-4xl mt-1">
              <div className="w-20 text-xs">F1-Score</div>
              <div className="w-20 text-xs">Precision</div>
              <div className="w-20 text-xs">Recall</div>
            </div>

            <div className="flex justify-around w-full max-w-4xl my-5">
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Download Model
              </button>
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Download Code
              </button>
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Auto Tuning
              </button>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl mt-5 w-64 px-10">
            <p className="my-5 text-sm">Logistic Regression</p>

            <div className="flex justify-around w-full max-w-4xl">
              <div className="w-20 text-blue-800">71.2</div>
              <div className="w-20 text-blue-800">81.1</div>
              <div className="w-20 text-blue-800">71.2</div>
            </div>
            <div className="flex justify-around w-full max-w-4xl mt-1">
              <div className="w-20 text-xs">F1-Score</div>
              <div className="w-20 text-xs">Precision</div>
              <div className="w-20 text-xs">Recall</div>
            </div>

            <div className="flex justify-around w-full max-w-4xl my-5">
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Download Model
              </button>
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Download Code
              </button>
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Auto Tuning
              </button>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl mt-5 w-64 px-10">
            <p className="my-5 text-sm">Decision Tree</p>

            <div className="flex justify-around w-full max-w-4xl">
              <div className="w-20 text-blue-800">79.4</div>
              <div className="w-20 text-blue-800">80.7</div>
              <div className="w-20 text-blue-800">79.4</div>
            </div>
            <div className="flex justify-around w-full max-w-4xl mt-1">
              <div className="w-20 text-xs">F1-Score</div>
              <div className="w-20 text-xs">Precision</div>
              <div className="w-20 text-xs">Recall</div>
            </div>

            <div className="flex justify-around w-full max-w-4xl my-5">
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Download Model
              </button>
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Download Code
              </button>
              <button className="py-1.5 px-1.5 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Auto Tuning
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoMLPage;

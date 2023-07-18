import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HelloResponse {
  message: string;
}
interface Dataset {
  id: number;
  dataset_name: string;
  dataset: string;
  data_type: string;
  delimiter: string;
  encoding: string;
  schema: {
    [key: string]: string;
  };
}

interface ColumnInfo {
  name: string;
  category: string;
  missing_values: {
    count: number;
    percentage: number;
  };
  handling_strategy: string;
  examples: string[];
}

interface ColumnsData {
  columns: ColumnInfo[];
}

interface FileData {
  filename: string;
  uploadtime: string;
  datasize: number;
  column_number: number;
}

interface DataType {
  type: string;
  isCategorical: boolean;
  examples: string[];
}

interface DatasetTypes {
  [key: string]: DataType;
}
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({

    fetchDatasets: builder.query<Dataset[], void>({
      query: () => '/api/datasets',
    }),
    getDatasetTypes: builder.query<DatasetTypes, string>({
      query: (filename) => `dataset/types/${filename}`,
  }),
  setDataset: builder.mutation<Dataset, { filename: string, data: Dataset }>({
    query: ({ filename, data }) => ({
        url: `dataset/types/${filename}`,
        method: 'POST',
        body: data,
    }),
}),
getTempDataset: builder.query<Dataset, string>({
    query: (filename) => `temp-dataset/${filename}`,
}),


    getHello: builder.query<HelloResponse, void>({
      query: () => '/',
    }),
    predict: builder.mutation<any, {models: string[], dataset: string}>({
      query: ({models, dataset}) => ({
        url: '/ml/predict', // Replace with your correct endpoint
        method: 'POST',
        body: {models, dataset}
      }),
    }),
    listDatasets: builder.query<string[], void>({
        query: () => '/datasets',
      }),
      models: builder.mutation<any, { options: string[]; fileName: string }>({
        query: (data) => ({
          url: '/models',
          method: 'POST',
          body: data,
        }),
    }),
    fetchColumns: builder.query<Array<string>, string>({
      query: (dataset) => `datasets/${dataset}/columns`,
    }),    
    fetchColumnEda: builder.query<any, { dataset: string; column: string }>({
      query: ({ dataset, column }) => `datasets/${dataset}/column/${column}/eda`,
    }),    
    fetchDatasetEda: builder.query<any, string>({
      query: (dataset) => `datasets/${dataset}/eda`,
    }),    
    fetchColumnValues: builder.query<Array<number>, { dataset: string; column: string }>({
      query: ({ dataset, column }) => `datasets/${dataset}/column/${column}/values`,
    }), 
    getSupportModels: builder.query<string[], void>({
      query: () => '/ml/models',
    }),
    getFiles: builder.query<FileData[], void>({
      query: () => 'datainfo',
    }),
    deleteFile: builder.mutation({
      query: (filename) => ({
        url: 'delete',
        method: 'DELETE',
        body: { filename },
      }),
    }),
    getDatasetPreview: builder.query<any, string>({
      query: (filename) => `datasets/preview/${filename}`,
    }),
    getColumns: builder.query<ColumnsData, string>({
      query: (filename) => ({
        url: 'api/dataframe_info',
        method: 'POST',
        body: { filename },
      }),
    }),
    getProfile: builder.query<any, string>({
      query: (filename) => ({
        url: '/profile',
        method: 'POST',
        body: { filename },
      }),
    }),
  }),
  
})

export const { useGetHelloQuery, usePredictMutation, useListDatasetsQuery, useModelsMutation, useFetchColumnsQuery, useFetchColumnEdaQuery, useFetchDatasetEdaQuery, useFetchColumnValuesQuery, useGetSupportModelsQuery, useFetchDatasetsQuery, useGetFilesQuery, useDeleteFileMutation, useGetDatasetPreviewQuery, useGetProfileQuery, useGetDatasetTypesQuery , useGetTempDatasetQuery,useSetDatasetMutation, useGetColumnsQuery } = api

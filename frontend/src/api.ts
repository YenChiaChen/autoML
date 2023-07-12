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

interface FileData {
  filename: string;
  uploadtime: string;
  datasize: number;
  column_number: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({

    fetchDatasets: builder.query<Dataset[], void>({
      query: () => '/api/datasets',
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
  }),
})

export const { useGetHelloQuery, usePredictMutation, useListDatasetsQuery, useModelsMutation, useFetchColumnsQuery, useFetchColumnEdaQuery, useFetchDatasetEdaQuery, useFetchColumnValuesQuery, useGetSupportModelsQuery, useFetchDatasetsQuery, useGetFilesQuery, useDeleteFileMutation } = api

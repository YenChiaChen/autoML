import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HelloResponse {
  message: string;
}

interface PredictResponse {
    [key: string]: number; 
  }

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getHello: builder.query<HelloResponse, void>({
      query: () => '/',
    }),
    predict: builder.query<PredictResponse, string>({
      query: (dataset) => ({
        url: '/predict',
        method: 'POST',
        body: { dataset },
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
  }),
})

export const { useGetHelloQuery, usePredictQuery, useListDatasetsQuery, useModelsMutation, useFetchColumnsQuery, useFetchColumnEdaQuery, useFetchDatasetEdaQuery, useFetchColumnValuesQuery } = api

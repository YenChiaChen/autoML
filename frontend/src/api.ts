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
  }),
})

export const { useGetHelloQuery, usePredictQuery, useListDatasetsQuery, useModelsMutation } = api

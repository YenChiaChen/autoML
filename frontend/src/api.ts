
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HelloResponse {
  message: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getHello: builder.query<HelloResponse, void>({
      query: () => '/',
    }),

    uploadFile: builder.mutation<string, File>({
      query: (file) => {
        const data = new FormData();
        data.append('file', file);
        return {
          url: 'upload',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
})

export const { useUploadFileMutation } = api

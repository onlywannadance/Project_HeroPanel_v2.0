import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//heroes

export const apiSlice = createApi({ 
    reducerPath: 'api',                // строка по дефолту идет как reducerPath: 'api', так что можно и не прописывать
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes','Filters'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        createHero: builder.mutation({
            query: (hero) => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: (id) => ({
                url: `/heroes/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Heroes']
        }),
        getFilters: builder.query({
            query: () => '/filters',
            providesTags: ['Filters']
        })
    })
}) 



export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation, useGetFiltersQuery, useActiveFilterMutation } = apiSlice; 
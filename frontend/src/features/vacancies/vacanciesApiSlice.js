import { apiSlice } from '../../app/api/appSlice';

export const vacanciesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVacancies: builder.query({
            query: () => '/vacancies',
            transformResponse: (response) => response.vacancies,
        }),
        createVacancy: builder.mutation({
            query: (vacancyData) => ({
                url: '/vacancies',
                method: 'POST',
                body: vacancyData,
            }),
        }),
    }),
});

export const { useGetAllVacanciesQuery, useCreateVacancyMutation } =
    vacanciesApiSlice;

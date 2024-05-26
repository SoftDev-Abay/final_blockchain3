import { apiSlice } from '../../app/api/appSlice';

export const vacanciesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVacancies: builder.query({
            query: () => '/vacancy/all',
        }),
        createVacancy: builder.mutation({
            query: (vacancyData) => ({
                url: '/vacancy/create',
                method: 'POST',
                body: vacancyData,
            }),
        }),
        getVacancyById: builder.query({
            query: (id) => `/vacancy/${id}`,
        }),
        applyToVacancy: builder.mutation({
            query: (vacancyId) => ({
                url: `/vacancy/${vacancyId}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useGetAllVacanciesQuery,
    useCreateVacancyMutation,
    useGetVacancyByIdQuery,
    useApplyToVacancyMutation,
} = vacanciesApiSlice;

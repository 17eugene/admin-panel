import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    getProducts: builder.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),

    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),

    getTransactions: builder.query({
      query: ({ page, itemsPerPage, search, sort }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, itemsPerPage, search, sort },
      }),
      providesTags: ["Transactions"],
    }),

    getGeography: builder.query({
      query: () => "client/geo",
      providesTags: ["Geography"],
    }),

    getOverallStats: builder.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),

    getAdmins: builder.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),

    getPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    getDashboardStats: builder.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetOverallStatsQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardStatsQuery,
} = api;

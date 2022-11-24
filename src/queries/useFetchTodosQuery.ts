import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ITodo } from "../interfaces/todo"

export const useFetchWeatherQuery = (): UseQueryResult<ITodo[]> => {
    return useQuery(
        ['fetchTodos'], async () => {
            const response = await fetch('https://62d43987cd960e45d45543ce.mockapi.io/todos/')
            return await response.json()
        },
        {
            staleTime: 0,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false
        }
    )
}
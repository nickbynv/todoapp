import { useMutation } from "@tanstack/react-query"
import { useFetchWeatherQuery } from "./useFetchTodosQuery"

export const useDeleteTodoMutation = () => {
    const { refetch } = useFetchWeatherQuery()

    return useMutation((id: string) => {
        return fetch(`https://62d43987cd960e45d45543ce.mockapi.io/todos/${id}`, {
            method: 'DELETE'
        })
    }, {
        onSuccess: () => refetch()
    })
}
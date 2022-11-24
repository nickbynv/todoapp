import { useMutation } from "@tanstack/react-query"
import { ITodo } from "../interfaces/todo"
import { useFetchWeatherQuery } from "./useFetchTodosQuery"

export const useChangeTodoMutation = () => {
    const { refetch } = useFetchWeatherQuery()

    return useMutation((todo: ITodo) => {
        return fetch(`https://62d43987cd960e45d45543ce.mockapi.io/todos/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
    }, {
        onSuccess: () => refetch()
    })
}
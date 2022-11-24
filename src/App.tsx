import { ReportGmailerrorred } from '@mui/icons-material'
import { Button, FormControl, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Notification from './components/Notification'
import Todo from './components/Todo'
import { useAddTodoMutation } from './queries/useAddTodoMutation'
import { useFetchWeatherQuery } from './queries/useFetchTodosQuery'

export default () => {
  const [notification, setNotification] = useState({
    show: false,
    success: false,
    error: false
  })

  const {
    data: todos,
    isSuccess,
    isLoading,
    isError
  } = useFetchWeatherQuery()

  const addTodo = useAddTodoMutation()

  useEffect(() => {
    if (addTodo.isSuccess || addTodo.isError) {
      setNotification(prev => ({ ...prev, show: true }))

      setTimeout(() => {
        setNotification({
          show: false,
          success: false,
          error: false
        })
      }, 3000)
    }

    if (addTodo.isSuccess) {
      setNotification(prev => ({ ...prev, success: true }))
    }

    if (addTodo.isError) {
      setNotification(prev => ({ ...prev, error: true }))
    }
  }, [addTodo.isSuccess, addTodo.isError])

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm()

  const onSubmit = (data: {
    [key: string]: string
  }) => {
    const date = new Date()
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    const monthsNames = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ]

    const time = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })

    addTodo.mutate({
      title: data.todoTitle,
      description: '',
      status: 'active',
      created: `${monthsNames[month]} ${day}, ${year}, ${time}`
    })

    reset()
  }

  return (
    <div className="h-[100vh] flex flex-col items-center p-10 relative">
      <form className='flex justify-center items-center my-3' onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            className="w-[18rem] md:w-[30rem]"
            {...register('todoTitle', {
              required: 'Fill in the field',
              maxLength: { value: 32, message: 'Maximum 32 characters' }
            })}
            label="I will do this"
          />

          {errors?.todoTitle && (
            <p className='my-2 font-semibold text-sm text-red-700 flex items-center'>
              <ReportGmailerrorred className='mr-1' />
              {errors?.todoTitle?.message?.toString()}
            </p>
          )}

          <Button
            className='h-12 !mt-3'
            type='submit'
            variant='contained'
            color='primary'
          >Add todo</Button>
        </FormControl>
      </form>

      {isSuccess && (
        <div className="my-3">
          {todos?.length ? (
            todos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))
          ) : <span className="my-3 text-2xl">The list is empty</span>}
        </div>
      )}

      {isLoading && (
        <span className="my-3 text-2xl">Loading...</span>
      )}

      {isError && (
        <span className="my-3 text-2xl">An error has occurred</span>
      )}

      <Notification state={notification} />
    </div>
  )
}
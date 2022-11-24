import { ReportGmailerrorred } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField } from '@mui/material'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { ITodo } from '../interfaces/todo'
import { useChangeTodoMutation } from '../queries/useChangeTodoMutation'

export default memo((props: {
    open: boolean
    onClose: () => void
    todo: ITodo
}) => {
    const changeTodo = useChangeTodoMutation()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({ mode: 'onBlur' })

    const onSubmit = (data: {
        [key: string]: string
    }) => {
        changeTodo.mutate({
            ...props.todo,
            title: data.modalTodoTitle,
            description: data.modalTodoDescription
        })

        props.onClose()
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'
        >
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Details</DialogTitle>

                <DialogContent>
                    <div className='flex justify-center items-center my-3'>
                        <FormControl>
                            <TextField
                                className="!mb-4 w-[18rem] md:w-[30rem]"
                                {...register('modalTodoTitle', {
                                    required: 'Fill in the field',
                                    maxLength: { value: 32, message: 'Maximum 32 characters' }
                                })}
                                label="Title"
                                defaultValue={props.todo.title}
                            />

                            {errors?.modalTodoTitle && (
                                <p className='mb-5 mt-[-.5rem] font-semibold text-sm text-red-700 flex items-center'>
                                    <ReportGmailerrorred className='mr-1' />
                                    {errors?.modalTodoTitle?.message?.toString()}
                                </p>
                            )}

                            <TextField
                                className="!mb-4 w-[18rem] md:w-[30rem]"
                                {...register('modalTodoDescription')}
                                label="Description"
                                defaultValue={props.todo.description}
                            />

                            <DialogContentText id='dialog-description'>
                                Status: {props.todo.status}
                            </DialogContentText>

                            <DialogContentText id='dialog-description'>
                                Created: {props.todo.created}
                            </DialogContentText>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type='submit'>
                        Change
                    </Button>
                    <Button className="!text-slate-500" onClick={props.onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})
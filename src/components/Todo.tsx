import { CheckBox, CheckBoxOutlineBlank, Delete } from "@mui/icons-material"
import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { memo, useState } from 'react'
import { ITodo } from "../interfaces/todo"
import { useChangeTodoMutation } from "../queries/useChangeTodoMutation"
import { useDeleteTodoMutation } from "../queries/useDeleteTodoMutation"
import Modal from "./Modal"

export default memo((props: {
    todo: ITodo
}) => {
    const [openModal, setOpenModal] = useState(false)

    const changeTodo = useChangeTodoMutation()
    const deleteTodo = useDeleteTodoMutation()

    return <>
        <Card
            className="!bg-gray-100 mt-3 pt-2 flex items-center cursor-pointer"
            variant="outlined"
            onClick={() => setOpenModal(true)}
        >
            <CardContent>
                <Typography className="!w-[20rem] flex justify-between items-center md:!w-[35rem]">
                    <span className={`flex items-center ${props.todo.status === 'inactive' && 'line-through'
                        } text-lg`}>
                        <IconButton className="!mr-1.5" onClick={(e) => {
                            e.stopPropagation()
                            changeTodo.mutate({
                                ...props.todo,
                                status: props.todo.status === 'active' ? 'inactive' : 'active'
                            })
                        }}>

                            {props.todo.status === 'active' ? <CheckBoxOutlineBlank className="text-black" />
                                : props.todo.status === 'inactive' && <CheckBox className="text-black" />}
                        </IconButton>

                        {props.todo.title}
                    </span>

                    <IconButton onClick={(e) => {
                        e.stopPropagation()
                        if (props?.todo?.id) {
                            deleteTodo.mutate(props.todo.id)
                        }
                    }}>
                        <Delete className="text-red-500" />
                    </IconButton>
                </Typography>
            </CardContent>
        </Card>

        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            todo={props.todo}
        />
    </>
})
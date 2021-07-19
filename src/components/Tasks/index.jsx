import React from 'react'
import './tasks.scss'
import axios from 'axios'
import Taski from './Taski'

import pen from '../../assets/img/edit.svg'

import AddTaskForm from './AddTaskForm'


function Tasks({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onCompleteTask, onEditTask }) {

    const editTitle = () => {
        const newTitle = window.prompt('Название заголовка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch(' https://60f5934318254c00176dff3f.mockapi.io/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка !')
            })
        }
    }



    return (
        <div className='tasks'>
            <h2 style={{ color: list.color.hex }} className='tasks__title'>
                {list.name}
                <img onClick={() => editTitle()} src={pen} alt='edit' />
            </h2>
            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Taski
                        key={task.id}
                        list={list}
                        onRemove={onRemoveTask}
                        onEdit={onEditTask}
                        onComplete={onCompleteTask}
                        {...task} />
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div >
    )
}
export default Tasks
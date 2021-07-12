import axios from 'axios'
import React, { useState } from 'react'
import add from '../../assets/img/add.svg'



function AddTaskForm({ list, onAddTask }) {
    const [visibleform, setFormVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const toggleFormVisible = () => {
        setFormVisible(!visibleform)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true)
        axios.post('http://localhost:3003/tasks/', obj).then(({ data }) => {
            onAddTask(list.id, data)
            toggleFormVisible()
        }).catch(() => {
            alert('Ошибка при добавлении задачи !')
        }).finally(() => {
            setIsLoading(false)
        })

    }


    return (
        <div className="tasks__form">
            {!visibleform ? (<div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={add} alt="Add icon" />
                <span>Новая задача</span>
            </div>) :
                (<div className="tasks__form-block">
                    <input
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={addTask} disabled={isLoading} className='button'>{isLoading ? 'Добавление...' : 'Добавить задачу'}</button>
                    <button onClick={toggleFormVisible} className='button button--grey'>Отмена</button>
                </div>)}
        </div>
    )
}

export default AddTaskForm
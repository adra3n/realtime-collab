import './app.css'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
import PeopleForm from './components/PeopleForm'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  removeTask,
  updateTask,
  addPerson,
  updateTaskOrder,
} from './redux/actions'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

let socket = null

function App() {
  const columns = useSelector((state) => state.tasks)
  const team = useSelector((state) => state.team)
  const dispatch = useDispatch()

  const handleTaskSubmit = (newTask) => {
    dispatch(addTask(newTask))
    toast.success(`Task: ${newTask.title} added`)
    socket.emit('task added', newTask)
  }
  const handlePeopleSubmit = (newPerson) => {
    dispatch(addPerson(newPerson))
    toast.success(`New person ${newPerson} is added!`)
    socket.emit('people added', newPerson)
  }

  const handleRemove = (taskId) => {
    dispatch(removeTask(taskId))
    toast(`Task with id:${taskId} is removed!`)
    socket.emit('task removed', taskId)
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const { source, destination } = result

    //moving between columns//
    if (source.droppableId !== destination.droppableId) {
      const sourceColumnId = source.droppableId
      const destColumnId = destination.droppableId
      const taskId = result.draggableId

      //im finding the task object in the source column based on taskId to send it
      const sourceTask = columns[sourceColumnId].tasks.find(
        (task) => task.id === taskId
      )

      //dispatching action
      dispatch(updateTask(taskId, { ...sourceTask, column: destColumnId }))

      //emiting event
      socket.emit('task moved', { taskId, sourceColumnId, destColumnId })
    } else {
      //reordering within the same column //
      const columnId = source.droppableId
      const sourceIndex = source.index
      const destIndex = destination.index

      // dispatching
      dispatch(updateTaskOrder(columnId, sourceIndex, destIndex))

      //emiting
      socket.emit('task reordered', { columnId, sourceIndex, destIndex })
    }
  }

  //listening events with socket.io
  useEffect(() => {
    socket = io('http://localhost:4000')
    socket.on('task added', (task) => {
      console.log('websocket:task added', task)
      dispatch(addTask(task))
      toast.success(`Task: "${task.title}" added`)
    })
    socket.on('people added', (newPerson) => {
      console.log('websocket:person added', newPerson)
      dispatch(addPerson(newPerson))
      toast.success(`New person "${newPerson}" is added!`)
    })
    socket.on('task updated', (id, updatedTask) => {
      console.log('websocket:task updated', updatedTask)
      dispatch(updateTask(id, updatedTask))
      toast(`"${updatedTask.title}" is updated`)
    })
    socket.on('task removed', (taskId, columnId) => {
      console.log('websocket:task removed')
      dispatch(removeTask(taskId, columnId))
      toast(`Task removed!`)
    })
    return () => {
      console.log('websocket closed')
      socket.disconnect()
    }
  }, ['http://localhost:4000'])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="h-screen flex">
        <div className="bg-white  max-w-[25vw] flex-shrink-0 flex-none border-r-2 border-solid border-[#f3d4b0] overflow-auto">
          <div className="pt-8 pr-8 pb-6 pl-8 border-b border border-solid border-[#ddd]">
            <h2 className="pb-2 text-2xl">New Task</h2>
            <TaskForm people={team} submitFn={handleTaskSubmit} />
          </div>
          <div className="pt-8 pr-8 pb-6  pl-8 border-b border border-solid border-[#ddd]">
            <h2>New Person</h2>

            <PeopleForm people={team} submitFn={handlePeopleSubmit} />
          </div>
        </div>
        <div className="flex-1 flex justify-center flex-wrap gap-8 pt-8 pr-8 pb-6 overflow-auto">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="flex-1 min-w-[240px] max-w-[360px]">
              <h2 className="text-2xl pl-3">{column.title}</h2>
              <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      // changing color if its droppable spot
                      background: snapshot.isDraggingOver
                        ? 'lightblue'
                        : 'bisque',
                      padding: 4,
                      minHeight: 500,
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              //changing active item color here
                              backgroundColor: snapshot.isDragging
                                ? '#263B4A'
                                : '#456C86',
                              color: 'white',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Task
                              key={task.id}
                              taskObj={task}
                              onRemove={handleRemove}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}

export default App

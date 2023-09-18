import './app.css'
import Task from './Task'
import TaskHookForm from './TaskHookForm'
import PeopleForm from './PeopleForm'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPerson,
  addTask,
  completeTask,
  removeTask,
  updateTask,
} from './redux/actions'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

let socket

function App() {
  const tasks = useSelector((state) => state.tasks)
  const team = useSelector((state) => state.team)
  const dispatch = useDispatch()
  const handleTaskSubmit = (newTask) => {
    // dispatch(addTask(newTask))
    socket.emit('task added', newTask)
    toast.success(`Task: "${newTask.title}" added`)
  }
  const handlePeopleSubmit = (newPerson) => {
    dispatch(addPerson(newPerson))
  }
  const handleComplete = (id) => {
    // dispatch(completeTask(id))
    const task = tasks.find((t) => t.id === id)
    socket.emit('task completed', id)
    toast.success(`Congrats! "${task.title}" is done!`)
  }
  const handleRemove = (id) => {
    // dispatch(removeTask(id))
    socket.emit('task removed', id)
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) return

    const newTasks = [...tasks]

    const draggedTask = newTasks[source.index]

    draggedTask.status = destination.droppableId

    newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, draggedTask)
    // dispatch(setTasks(newTasks))
    socket.emit('task updated', draggedTask.id, draggedTask)

    console.log(source, destination)
  }

  useEffect(() => {
    socket = io('http://localhost:3000')
    socket.on('task added', (task) => {
      console.log('websocket:task added')
      dispatch(addTask(task))
    })
    socket.on('task completed', (id) => {
      console.log('websocket:task completed')
      dispatch(completeTask(id))
    })
    socket.on('task updated', (id, updatedTask) => {
      console.log('websocket:task updated')
      dispatch(updateTask(id, updatedTask))
    })
    socket.on('task removed', (id) => {
      console.log('websocket:task removed')
      dispatch(removeTask(id))
    })
    return () => {
      console.log('websocket closed')
      socket.disconnect()
    }
  }, [dispatch])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="h-screen flex">
        <div className="bg-white flex-shrink-0 flex-none border-r-2 border-solid border-[#f3d4b0] overflow-auto">
          <div className="pt-8 pr-8 pb-6 pl-8 border-b border border-solid border-[#ddd]">
            <h2 className="pb-2 text-2xl">New Task</h2>
            <TaskHookForm people={team} submitFn={handleTaskSubmit} />
          </div>
          <div className="pt-8 pr-8 pb-6  pl-8 border-b border border-solid border-[#ddd]">
            <h2>New Person</h2>
            <PeopleForm people={team} submitFn={handlePeopleSubmit} />
          </div>
        </div>
        <div className="flex-1 flex justify-center flex-wrap gap-8 pt-8 pr-8 pb-6 overflow-auto">
          <div className="flex-1 min-w-[240px] max-w-[360px]">
            <h2 className="text-2xl pl-3">To Do</h2>

            <Droppable droppableId="todo">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((t) => t.status === 'todo')
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Task
                              key={task.id}
                              taskObj={task}
                              onComplete={handleComplete}
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
          <div className="flex-1 min-w-[240px] max-w-[360px]">
            <h2 className="text-2xl pl-3">In Progress</h2>
            <Droppable droppableId="inprogress">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((t) => t.status === 'inprogress')
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Task
                              key={task.id}
                              taskObj={task}
                              onComplete={handleComplete}
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
          <div className="flex-1 min-w-[240px] max-w-[360px]">
            <h2 className="text-2xl pl-3">Completed</h2>
            <Droppable droppableId="done">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((t) => t.status === 'done')
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Task
                              key={task.id}
                              taskObj={task}
                              onComplete={handleComplete}
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
        </div>
      </div>
    </DragDropContext>
  )
}
export default App
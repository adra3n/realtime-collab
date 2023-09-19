import './app.css'
import Task from './components/Task'
import TaskHookForm from './components/TaskHookForm'
import PeopleForm from './components/PeopleForm'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  completeTask,
  removeTask,
  updateTask,
  addPerson,
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
    dispatch(addTask(newTask))
    toast.success(`Task: "${newTask.title}" added`)
    socket.broadcast.emit('task added', newTask)
  }
  const handlePeopleSubmit = (newPerson) => {
    dispatch(addPerson(newPerson))
    toast.success(`New person "${newPerson}" is added!`)
    socket.broadcast.emit('people added', newPerson)
  }
  const handleComplete = (id) => {
    const task = tasks.find((t) => t.id === id)

    if (task) {
      dispatch(completeTask(id))
      toast.success(`Congrats! "${task.title}" is done!`)
      socket.broadcast.emit('task completed', id, task)
    }
  }
  const handleRemove = (id) => {
    dispatch(removeTask(id))
    toast(`Task with id:${id} is removed!`)
    socket.broadcast.emit('task removed', id)
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) return

    const newTasks = [...tasks]

    const draggedTask = newTasks.splice(source.index, 1)[0]
    draggedTask.status = destination.droppableId
    newTasks.splice(destination.index, 0, draggedTask)

    dispatch(updateTask(newTasks))
    socket.broadcast.emit('task updated', draggedTask.id, draggedTask)

    console.log(source, destination)
  }

  useEffect(() => {
    socket = io('http://localhost:4000')
    socket.on('task added', (task) => {
      console.log('websocket:task added', task)
      dispatch(addTask(task))
      toast.success(`Task: "${task.title}" added`)
    })
    socket.on('task completed', (id, task) => {
      console.log('websocket:task completed', id, task)
      dispatch(completeTask(id))
      toast.success(`Congrats! "${task.title}" is done!`)
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
    socket.on('task removed', (id) => {
      console.log('websocket:task removed')
      dispatch(removeTask(id))
      toast(`Task with id:${id} is removed!`)
    })
    return () => {
      console.log('websocket closed')
      socket.disconnect()
    }
  }, [dispatch])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="h-screen flex">
        <div className="bg-white  max-w-[25vw] flex-shrink-0 flex-none border-r-2 border-solid border-[#f3d4b0] overflow-auto">
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

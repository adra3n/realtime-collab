import React from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'

interface TaskHookFormProps {
  people: string[]
  submitFn: (newTask: FormData) => void
}

type FormData = {
  title: string
  description: string
  people: string[]
  deadline: string
}

const TaskHookForm = ({ people, submitFn }: TaskHookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' })

  function mySubmit(data) {
    const newTask = {
      ...data,
      createdAt: new Date().toLocaleDateString(),
      id: nanoid(5),
      status: 'todo',
    }
    submitFn(newTask)
    reset({
      title: '',
      description: '',
      deadline: '',
      people: [],
    })
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="title">
          Title
        </label>
        <input
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          {...register('title', { required: 'Need title' })}
          id="title"
          name="title"
          type="text"
        />
        {errors.title && (
          <p className="text-xs pt-1 text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="description">
          Description
        </label>
        <textarea
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          {...register('description', {
            required: 'Need description',
            minLength: {
              value: 10,
              message: 'Min 10 characters for description',
            },
          })}
          rows={3}
          id="description"
          name="description"
        ></textarea>
        {errors.description && (
          <p className="text-xs pt-1 text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="pt-4 flex">
        <label className="text-sm block pb-1.5 ">Team</label>
        <div className="flex flex-wrap">
          {people.map((p) => (
            <label
              className="text-md pt-1.5 pb-1.5 pr-2 pl-1.5 rounded-md border border-solid border-[#ccc] mr-2 mb-2 inline-flex items-center cursor-pointer"
              key={p}
            >
              <input
                {...register('people', {
                  required: 'Min 1 person',
                  validate: {
                    maxKisi: (value) => value.length < 4 || 'Max 3 person',
                  },
                })}
                type="checkbox"
                name="people"
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="text-xs text-red-600-600 pt-1">
            {errors.people.message}
          </p>
        )}
      </div>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="deadline">
          Deadline
        </label>
        <input
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          {...register('deadline', {
            required: 'Son teslim tarihi seçmelisiniz',
          })}
          id="deadline"
          name="deadline"
          type="date"
          min="2023-01-25"
        />
        {errors.deadline && (
          <p className="text-xs pt-1 text-red-600">{errors.deadline.message}</p>
        )}
      </div>
      <div className="pt-4">
        <button
          className="block w-full border-none px-3 py-4 bg-[#fecc91] text-black cursor-pointer rounded shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none "
          type="submit"
          disabled={!isValid}
        >
          Save
        </button>
      </div>
    </form>
  )
}
export default connect()(TaskHookForm)

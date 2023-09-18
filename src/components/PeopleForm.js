import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPerson } from '../redux/actions'
import { toast } from 'react-toastify'

const PeopleForm = ({ people }) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addPerson(name))
    setName('')
    toast.success('Person added')
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="title">
          Name
        </label>
        <input
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          id="title"
          name="title"
          type="text"
          onChange={handleNameChange}
          value={name}
        />
        {people.includes(name) && (
          <p className="text-xs pt-1 text-red-600">
            This person is already added
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          className="block w-full border-none px-3 py-4 bg-[#fecc91] text-black cursor-pointer rounded shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none "
          type="submit"
          disabled={name.length === 0 || people.includes(name)}
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default PeopleForm

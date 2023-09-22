import { nanoid } from 'nanoid'
export const initialTeam = ['Sertaç', 'Volkan', 'Ahmet', 'Caner']

export const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: nanoid(5),
        title: `Task ${nanoid(5)}`,
        description: 'Description',
        people: ['Sertaç', 'Volkan'],
        deadline: '22.09.2023',
        createdAt: '12.09.2023',
        status: 'todo',
      },
      {
        id: nanoid(5),
        title: `Task ${nanoid(5)}`,
        description: 'Description 3',
        people: ['Volkan'],
        deadline: '22.11.2023',
        createdAt: '12.06.2023',
        status: 'todo',
      },
    ],
  },
  inprogress: {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: nanoid(5),
        title: `Task ${nanoid(5)}`,
        description: 'Description',
        people: ['Ahmet', 'Sertaç'],
        deadline: '29.09.2023',
        createdAt: '11.07.2023',
        status: 'inprogress',
      },
      {
        id: nanoid(5),
        title: `Task ${nanoid(5)}`,
        description: 'Description 3',
        people: ['Volkan', 'Sertaç'],
        deadline: '22.11.2023',
        createdAt: '12.06.2023',
        status: 'inprogress',
      },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: nanoid(5),
        title: `Task ${nanoid(5)}`,
        description: 'Description 3',
        people: ['Volkan'],
        deadline: '22.11.2023',
        createdAt: '12.06.2023',
        status: 'done',
      },
    ],
  },
}

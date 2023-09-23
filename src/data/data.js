import { nanoid } from 'nanoid'
export const initialTeam = ['Sertaç', 'Volkan', 'Ahmet', 'Caner']

export const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: nanoid(5),
        title: `Create first pages with React`,
        description:
          'Create first pages according to Figma design pixel perfect',
        people: ['Sertaç', 'Volkan'],
        deadline: '2023-09-22',
        createdAt: '2023-09-12',
        status: 'todo',
      },
      {
        id: nanoid(5),
        title: `Decide on MVP features`,
        description: 'Discuss the MVP features with new implementations',
        people: ['Volkan'],
        deadline: '2023-11-22',
        createdAt: '2023-06-12',
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
        title: `Initialize the database`,
        description:
          'Create a database using PostgreSql, decide on table schema, etc.',
        people: ['Ahmet', 'Sertaç'],
        deadline: '2023-09-29',
        createdAt: '2023-07-11',
        status: 'inprogress',
      },
      {
        id: nanoid(5),
        title: `Tech stack for project`,
        description: 'Discuss and decide on a tech stack for the project',
        people: ['Volkan', 'Sertaç', 'Caner'],
        deadline: '2023-10-21',
        createdAt: '2023-09-15',
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
        title: `Design it on Figma`,
        description: 'Create a new design on Figma for the project',
        people: ['Volkan'],
        deadline: '2023-12-21',
        createdAt: '2023-06-10',
        status: 'done',
      },
    ],
  },
}

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
          'Create first pages according to Figma desing pixel perfect',
        people: ['Sertaç', 'Volkan'],
        deadline: '22.09.2023',
        createdAt: '12.09.2023',
        status: 'todo',
      },
      {
        id: nanoid(5),
        title: ` Decide on MVP features `,
        description: 'Discuss the MVP features with new implementations',
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
        title: `Initialize the database`,
        description:
          'Create a database using PostgreSql, decide on table schema etc..',
        people: ['Ahmet', 'Sertaç'],
        deadline: '29.09.2023',
        createdAt: '11.07.2023',
        status: 'inprogress',
      },
      {
        id: nanoid(5),
        title: `Tech stack for project`,
        description: 'Discuss and decide on a tech stack for project',
        people: ['Volkan', 'Sertaç', 'Caner'],
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
        title: `Design it on Figma`,
        description: 'Create a new design on Figma for the project',
        people: ['Volkan'],
        deadline: '22.11.2023',
        createdAt: '12.06.2023',
        status: 'done',
      },
    ],
  },
}

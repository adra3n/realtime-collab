export const initialTeam = ['Sertaç', 'Volkan', 'Ahmet', 'Caner']

export const initialTasks = [
  {
    id: 1,
    title: 'Görev 1',
    description: 'Açıklama 1',
    people: ['Sertaç', 'Volkan'],
    deadline: '2023-12-23',
    status: 'done',
    createdAt: '12.08.2023',
  },
  {
    id: 2,
    title: 'Görev 2',
    description: 'Açıklama 2',
    people: ['Volkan'],
    deadline: '2023-11-25',
    status: 'todo',
    createdAt: '02.09.2023',
  },
  {
    id: 3,
    title: 'Görev 3',
    description: 'Açıklama 3',
    people: ['Ahmet'],
    deadline: '2023-10-27',
    status: 'todo',
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: 4,
    title: 'Görev 4',
    description: 'Açıklama 4',
    people: ['Caner', 'Ahmet'],
    deadline: '2023-08-31',
    status: 'inprogress',
    createdAt: '12.09.2023',
  },
]

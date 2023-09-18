export interface Task {
  id: string
  title: string
  description: string
  deadline: string
  createdAt: string
  status: 'todo' | 'inprogress' | 'done'
  people: string[]
}

export interface TeamMember {
  id: string
  name: string
}

import {
  Task
  // , TodoistApi 
} from '@doist/todoist-api-typescript';
import React
  //  ,{ useState }
  from 'react';
import dayjs from 'dayjs';
import WidgetBase from '../WidgetBase/WidgetBase';

const mockTasks: Task[] = [
  {
    id: '1',
    order: 1,
    content: 'Dentist',
    description: 'Task 1 description',
    projectId: '1',
    isCompleted: true,
    labels: ['t3', 'foo'],
    priority: 1,
    commentCount: 1,
    createdAt: '2021-01-01T13:05:00Z',
    url: 'https://todoist.com/showTask?id=1',
    creatorId: '1',
    due: {
      date: '2021-01-01T13:05:00Z',
      isRecurring: false,
      string: 'whatevs',
    }
  },
  {
    id: '2',
    order: 2,
    content: 'Pick up shoes from shop',
    description: 'Task 2 description',
    projectId: '1',
    isCompleted: false,
    labels: ['t3', 'foo'],
    priority: 1,
    commentCount: 1,
    createdAt: '2021-09-03T11:11:00Z',
    url: 'https://todoist.com/showTask?id=2',
    creatorId: '1',
    due: {
      date: '2021-09-03T11:11:00Z',
      isRecurring: false,
      string: 'whatevs',
    }
  },
  {
    id: '3',
    order: 3,
    content: 'Kickboxing at work gym',
    description: 'Kickboxing',
    projectId: '1',
    isCompleted: false,
    labels: ['t3', 'foo'],
    priority: 1,
    commentCount: 1,
    createdAt: '2021-09-03T11:11:00Z',
    url: 'https://todoist.com/showTask?id=2',
    creatorId: '1',
    due: {
      date: '2021-09-03T11:11:00Z',
      isRecurring: false,
      string: 'whatevs',
    }
  },
  {
    id: '4',
    order: 4,
    content: 'Make a stir fry',
    description: 'Make a stir fry',
    projectId: '1',
    isCompleted: false,
    labels: ['t3', 'foo'],
    priority: 1,
    commentCount: 1,
    createdAt: '2021-09-03T11:11:00Z',
    url: 'https://todoist.com/showTask?id=2',
    creatorId: '1',
    due: {
      date: '2021-09-03T11:11:00Z',
      isRecurring: false,
      string: 'whatevs',
    }
  },
  {
    id: '5',
    order: 5,
    content: 'Tidy up TODO comments',
    description: 'Task 5 description',
    projectId: '1',
    isCompleted: false,
    labels: ['t3', 'foo'],
    priority: 1,
    commentCount: 1,
    createdAt: '2021-09-03T11:11:00Z',
    url: 'https://todoist.com/showTask?id=2',
    creatorId: '1',
    due: {
      date: '2021-09-03T11:11:00Z',
      isRecurring: false,
      string: 'whatevs',
    }
  },
  {
    id: '5',
    order: 5,
    content: 'Task 5',
    description: 'Task 5 description',
    projectId: '1',
    isCompleted: false,
    labels: ['t3', 'foo'],
    priority: 1,
    commentCount: 1,
    createdAt: '2021-09-03T11:11:00Z',
    url: 'https://todoist.com/showTask?id=2',
    creatorId: '1',
    due: {
      date: '2021-09-03T11:11:00Z',
      isRecurring: false,
      string: 'whatevs',
    }
  },
];

export default function JournalStreakWidget(): JSX.Element {
  // const [todos, setTodos] = useState<Task[] | null>(null);
  // const api = new TodoistApi(TODOIST_TOKEN)

  // api.getTasks({
  // })
  //   .then((tasks: Task[]) => setTodos(tasks))
  //   .catch((error) => console.log(error))

  return (
    <WidgetBase
      className='p-2 todos-widget'>
      todos
      <div className='flex flex-col w-full overflow-x-hidden overflow-y-scroll'>
        {mockTasks.map((todo: Task) => (
          <TodoComponent todo={todo} />
        ))}
      </div>
    </WidgetBase>
  );
}

const formatDate = (date: string) => {
  const dateObj = dayjs(date)

  // TODO: Add ability to change date format from 12 to 24 hr
  const month = dateObj.format('MMM D HH:mm')

  return `${month}`;
};

export function TodoComponent(props: { todo: Task }): JSX.Element {
  const { content, due } = props.todo;

  return (
    <div className='flex flex-col p-2 m-2 border border-white/25'>
      <div className='text-sm'>{content}</div>
      <div className='text-xs text-white/50'>{due?.date && formatDate(due.date)}</div>
    </div>
  );
}

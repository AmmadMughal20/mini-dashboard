
import
{
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import
{
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Checkbox } from '../components/ui/checkbox'
import { Input } from '../components/ui/input'
import { addTask, removeTask, reorderTasks, toggleTask } from '../features/tasksSlice'
import type { RootState } from '../store'

/**
 * Individual sortable task item component
 * Handles drag interactions and task state management
 */
interface SortableTaskProps
{
  id: string
  title: string
  completed: boolean
  onToggle: () => void
  onDelete: () => void
}

const SortableTask: React.FC<SortableTaskProps> = ({ id, title, completed, onToggle, onDelete }) =>
{
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 group"
    >
      <button
        {...listeners}
        className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing flex-shrink-0"
        title="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      <Checkbox
        checked={completed}
        onCheckedChange={onToggle}
        className="flex-shrink-0 text-gray-400 hover:text-accent/80 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span
        className={`flex-1 text-sm ${completed
          ? 'line-through text-slate-400'
          : 'text-slate-700'
          }`}
      >
        {title}
      </span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 text-xs flex-shrink-0"
        title="Delete task"
      >
        ✕
      </button>
    </div>
  )
}

/**
 * Tasks card component with drag-and-drop functionality
 * Manages task list state and user interactions
 */
const TasksCard: React.FC = () =>
{
  const dispatch = useDispatch()
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order)

  const handleAddTask = (e: React.FormEvent) =>
  {
    e.preventDefault()
    if (newTaskTitle.trim())
    {
      dispatch(addTask(newTaskTitle.trim()))
      setNewTaskTitle('')
    }
  }

  const handleDragEnd = (event: DragEndEvent) =>
  {
    const { active, over } = event

    if (over && active.id !== over.id)
    {
      dispatch(reorderTasks({
        activeId: active.id as string,
        overId: over.id as string,
      }))
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white min-h-[375px] min-w-[320px]">
      <CardHeader className="pb-4">
        <CardTitle className="text-[34px] font-semibold text-slate-800">Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col h-full">
        <form onSubmit={handleAddTask} className="flex space-x-2">
          <Input
            placeholder="Add new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 border-slate-200"
            required
            onInvalid={(e: any) => e.target.setCustomValidity('Please enter task title')}
            onInput={(e: any) => e.target.setCustomValidity('')}
          />
          <Button type="submit" size="sm" className="text-white bg-accent/90 hover:bg-accent">
            Add
          </Button>
        </form>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-1 flex-1 max-h-[200px] overflow-y-auto custom-scrollbar">
              {sortedTasks.map((task) => (
                <SortableTask
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                  onToggle={() => dispatch(toggleTask(task.id))}
                  onDelete={() => dispatch(removeTask(task.id))}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-slate-400 flex-1 flex flex-col justify-center">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs">Add your first task above</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TasksCard

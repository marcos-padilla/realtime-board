import { Skeleton } from '@/components/ui/skeleton'
import ToolButton from './tool-button'
import {
	Circle,
	MousePointer2,
	Pencil,
	Redo2,
	Square,
	StickyNote,
	Type,
	Undo2,
} from 'lucide-react'
import { CanvasMode, CanvasState } from '@/types'

interface ToolbarProps {
	canvasState: CanvasState
	setCanvasState: (newState: CanvasState) => void
	undo: () => void
	redo: () => void
	canUndo: boolean
	canRedo: boolean
}

export default function Toolbar({
	canvasState,
	canRedo,
	canUndo,
	redo,
	undo,
	setCanvasState,
}: ToolbarProps) {
	return (
		<div className='absolute top-[50%] -translate-y-1/2 left-2 flex flex-col gap-y-4'>
			<div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
				<ToolButton
					label='Select'
					icon={MousePointer2}
					onClick={() =>
						setCanvasState({ mode: CanvasMode.None })
					}
					isActive={canvasState.mode === CanvasMode.None}
				/>
				<ToolButton
					label='Text'
					icon={Type}
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					label='Sticky note'
					icon={StickyNote}
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					label='Rectangle'
					icon={Square}
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					label='Ellipse'
					icon={Circle}
					onClick={() => {}}
					isActive={false}
				/>
				<ToolButton
					label='Pen'
					icon={Pencil}
					onClick={() => {}}
					isActive={false}
				/>
			</div>
			<div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
				<ToolButton
					label='Undo'
					icon={Undo2}
					onClick={undo}
					isDisabled={!canUndo}
				/>
				<ToolButton
					label='Redo'
					icon={Redo2}
					onClick={redo}
					isDisabled={!canRedo}
				/>
			</div>
		</div>
	)
}

export const ToolbarSkeleton = () => {
	return (
		<Skeleton className='absolute top-[50%] -translate-y-1/2 left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md' />
	)
}

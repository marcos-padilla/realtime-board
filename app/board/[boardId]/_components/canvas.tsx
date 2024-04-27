'use client'

import { CanvasMode, CanvasState } from '@/types'
import { useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'

interface CanvasProps {
	boardId: string
}

export default function Canvas({ boardId }: CanvasProps) {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	})

	const history = useHistory()
	const canUndo = useCanUndo()
	const canRedo = useCanRedo()
	return (
		<main className='size-full relative bg-neutral-100 touch-none'>
			<Info boardId={boardId} />
			<Participants />
			<Toolbar
				canvasState={canvasState}
				setCanvasState={setCanvasState}
				canRedo={canRedo}
				canUndo={canUndo}
				undo={() => history.undo()}
				redo={() => history.redo()}
			/>
		</main>
	)
}

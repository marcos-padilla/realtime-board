import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { cn, colorToHex, getConstrastingTextColor } from '@/lib/utils'
import { NoteLayer } from '@/types'
import { useMutation } from '@/liveblocks.config'

const MAX_FONT_SIZE = 96
const SCALE_FACTOR = 0.15

const font = Kalam({
	subsets: ['latin'],
	weight: ['400'],
})

interface NoteProps {
	id: string
	layer: NoteLayer
	onPointerDown: (e: React.PointerEvent, id: string) => void
	selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
	return Math.min(height * SCALE_FACTOR, width * SCALE_FACTOR, MAX_FONT_SIZE)
}

export default function Note({
	id,
	layer,
	onPointerDown,
	selectionColor,
}: NoteProps) {
	const { x, y, width, height, fill, value } = layer

	const updateValue = useMutation(({ storage }, newValue: string) => {
		const liveLayers = storage.get('layers')
		liveLayers.get(id)?.set('value', newValue)
	}, [])

	const handleContentChange = (e: ContentEditableEvent) => {
		updateValue(e.target.value)
	}

	return (
		<foreignObject
			x={x}
			y={y}
			width={width}
			height={height}
			onPointerDown={(e) => onPointerDown(e, id)}
			style={{
				outline: selectionColor
					? `1px solid ${selectionColor}`
					: 'none',
				backgroundColor: fill ? colorToHex(fill) : '#000',
			}}
			className='shadow-md drop-shadow-xl'
		>
			<ContentEditable
				html={value || 'Text'}
				onChange={handleContentChange}
				className={cn(
					'size-full flex items-center justify-center text-center outline-none',
					font.className
				)}
				style={{
					fontSize: calculateFontSize(width, height),
					color: fill ? getConstrastingTextColor(fill) : '#000',
				}}
			/>
		</foreignObject>
	)
}

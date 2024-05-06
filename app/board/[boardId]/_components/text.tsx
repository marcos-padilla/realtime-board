import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { cn, colorToHex } from '@/lib/utils'
import { TextLayer } from '@/types'
import { useMutation } from '@/liveblocks.config'

const MAX_FONT_SIZE = 96
const SCALE_FACTOR = 0.5

const font = Kalam({
	subsets: ['latin'],
	weight: ['400'],
})

interface TextProps {
	id: string
	layer: TextLayer
	onPointerDown: (e: React.PointerEvent, id: string) => void
	selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
	return Math.min(height * SCALE_FACTOR, width * SCALE_FACTOR, MAX_FONT_SIZE)
}

export default function Text({
	id,
	layer,
	onPointerDown,
	selectionColor,
}: TextProps) {
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
			}}
		>
			<ContentEditable
				html={value || 'Text'}
				onChange={handleContentChange}
				className={cn(
					'size-full flex items-center justify-center text-center drop-shadow-md outline-none',
					font.className
				)}
				style={{
					color: fill ? colorToHex(fill) : '#000',
					fontSize: calculateFontSize(width, height),
				}}
			/>
		</foreignObject>
	)
}

'use client'

import { useStorage } from '@/liveblocks.config'
import { LayerType } from '@/types'
import { memo } from 'react'
import Rectangle from './rectangle'
import Ellipse from './ellipse'
import Text from './text'
import Note from './note'
import Path from './path'
import { colorToHex } from '@/lib/utils'

interface LayerPreviewProps {
	id: string
	onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
	selectionColor?: string
}

export const LayerPreview = memo(
	({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
		const layer = useStorage((storage) => storage.layers.get(id))
		if (!layer) return null

		switch (layer.type) {
			case LayerType.Rectangle:
				return (
					<Rectangle
						id={id}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				)
			case LayerType.Ellipse:
				return (
					<Ellipse
						id={id}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				)
			case LayerType.Text:
				return (
					<Text
						id={id}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				)
			case LayerType.Note:
				return (
					<Note
						id={id}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				)
			case LayerType.Path:
				return (
					<Path
						key={id}
						onPointerDown={(e) => onLayerPointerDown(e, id)}
						stroke={selectionColor}
						points={layer.points}
						x={layer.x}
						y={layer.y}
						fill={
							layer.fill ? colorToHex(layer.fill) : '#000'
						}
					/>
				)
			default:
				console.log('Unknown layer type', layer)
				return null
		}
	}
)

LayerPreview.displayName = 'LayerPreview'

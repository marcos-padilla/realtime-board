'use client'

import { useStorage } from '@/liveblocks.config'
import { LayerType } from '@/types'
import { memo } from 'react'
import Rectangle from './rectangle'

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
					/>
				)
			default:
				console.log('Unknown layer type', layer)
				return null
		}
	}
)

LayerPreview.displayName = 'LayerPreview'

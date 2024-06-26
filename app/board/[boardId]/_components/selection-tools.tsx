'use client'

import { useSelectionBounds } from '@/hooks/use-selection-bounds'
import { useMutation, useSelf } from '@/liveblocks.config'
import { Camera, Color } from '@/types'
import { memo } from 'react'
import ColorPicker from './color-picker'
import { useDeleteLayers } from '@/hooks/use-delete-layers'
import Hint from '@/components/globals/hint'
import { Button } from '@/components/ui/button'
import { BringToFront, SendToBack, Trash2 } from 'lucide-react'

interface SelectionToolsProps {
	camera: Camera
	setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(
	({ camera, setLastUsedColor }: SelectionToolsProps) => {
		const selection = useSelf((self) => self.presence.selection)
		const selectionBounds = useSelectionBounds()

		const moveToBack = useMutation(
			({ storage }) => {
				const liveLayerIds = storage.get('layerIds')
				const indices: number[] = []
				const arr = liveLayerIds.toImmutable()

				for (let i = 0; i < arr.length; i++) {
					if (selection.includes(arr[i])) {
						indices.push(i)
					}
				}

				for (let i = 0; i < indices.length; i++) {
					liveLayerIds.move(indices[i], i)
				}
			},
			[selection]
		)

		const moveToFront = useMutation(
			({ storage }) => {
				const liveLayerIds = storage.get('layerIds')
				const indices: number[] = []
				const arr = liveLayerIds.toImmutable()

				for (let i = 0; i < arr.length; i++) {
					if (selection.includes(arr[i])) {
						indices.push(i)
					}
				}

				for (let i = indices.length - 1; i >= 0; i--) {
					liveLayerIds.move(
						indices[i],
						arr.length - indices.length + i
					)
				}
			},
			[selection]
		)

		const setFill = useMutation(
			({ storage }, fill: Color) => {
				const liveLyaers = storage.get('layers')
				setLastUsedColor(fill)
				selection.forEach((id) => {
					liveLyaers.get(id)?.set('fill', fill)
				})
			},
			[selection, setLastUsedColor]
		)

		const deleteLayers = useDeleteLayers()

		if (!selectionBounds) return null

		const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
		const y = selectionBounds.y + camera.y
		return (
			<div
				className='absolute p-3 rounded-xl bg-white shadow-sm border flex select-none'
				style={{
					transform: `translate(
                    calc(${x}px - 50%),
                    calc(${y - 16}px - 100%)
               )`,
				}}
			>
				<ColorPicker onChange={setFill} />

				<div className='flex flex-col gap-y-0 5'>
					<Hint label='Bring to front'>
						<Button
							variant={'board'}
							size={'icon'}
							onClick={moveToFront}
						>
							<BringToFront />
						</Button>
					</Hint>
					<Hint label='Send to back' side='bottom'>
						<Button
							variant={'board'}
							size={'icon'}
							onClick={moveToBack}
						>
							<SendToBack />
						</Button>
					</Hint>
				</div>

				<div className='flex items-center pl-2 border-l border-neutral-200'>
					<Hint label='Delete'>
						<Button
							variant={'board'}
							size={'icon'}
							onClick={deleteLayers}
						>
							<Trash2 />
						</Button>
					</Hint>
				</div>
			</div>
		)
	}
)

SelectionTools.displayName = 'SelectionTools'

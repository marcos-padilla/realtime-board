'use client'

import {
	Camera,
	CanvasMode,
	CanvasState,
	Color,
	Layer,
	LayerType,
	Point,
	Side,
	XYWH,
} from '@/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import {
	useCanRedo,
	useCanUndo,
	useHistory,
	useMutation,
	useOthersMapped,
	useStorage,
} from '@/liveblocks.config'
import { CursorsPresence } from './cursors-presence'
import {
	connectionIdToColor,
	pointerEventToCanvasPoint,
	resizeBounds,
} from '@/lib/utils'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from './layer-preview'
import { SelectionBox } from './selection-box'
interface CanvasProps {
	boardId: string
}

const MAX_LAYERS = 100

export default function Canvas({ boardId }: CanvasProps) {
	const layerIds = useStorage((storage) => storage.layerIds)

	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	})

	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
	const [lastUsedColor, setLastUsedColor] = useState<Color>({
		r: 255,
		g: 255,
		b: 255,
	})
	const history = useHistory()
	const canUndo = useCanUndo()
	const canRedo = useCanRedo()

	const insertLayer = useMutation(
		(
			{ storage, setMyPresence },
			layerType:
				| LayerType.Ellipse
				| LayerType.Rectangle
				| LayerType.Text
				| LayerType.Note,
			position: Point
		) => {
			const liveLayers = storage.get('layers')
			if (liveLayers.size >= MAX_LAYERS) return
			const liveLayerIds = storage.get('layerIds')
			const layerId = nanoid()
			const layer = new LiveObject({
				type: layerType,
				x: position.x,
				y: position.y,
				height: 100,
				width: 100,
				fill: lastUsedColor,
			})

			liveLayerIds.push(layerId)
			liveLayers.set(layerId, layer)

			setMyPresence({ selection: [layerId] }, { addToHistory: true })
			setCanvasState({
				mode: CanvasMode.None,
			})
		},
		[lastUsedColor]
	)

	const resizeSelectedLayer = useMutation(
		({ storage, self }, point: Point) => {
			if (canvasState.mode !== CanvasMode.Resizing) {
				return null
			}
			const bounds = resizeBounds(
				canvasState.intialBounds,
				canvasState.corner,
				point
			)
			const liveLayers = storage.get('layers')
			const layer = liveLayers.get(self.presence.selection[0])

			if (layer) {
				layer.update(bounds)
			}
		},
		[canvasState]
	)

	const translateSelectedLayers = useMutation(
		({ storage, self }, point: Point) => {
			if (canvasState.mode !== CanvasMode.Translating) {
				return null
			}
			const offset = {
				x: point.x - canvasState.current.x,
				y: point.y - canvasState.current.y,
			}

			const liveLayers = storage.get('layers')
			for (const layerId of self.presence.selection) {
				const layer = liveLayers.get(layerId)
				if (layer) {
					layer.update({
						x: layer.get('x') + offset.x,
						y: layer.get('y') + offset.y,
					})
				}
			}

			setCanvasState({ mode: CanvasMode.Translating, current: point })
		},
		[canvasState]
	)

	const onResizeHandlerPointerDown = useCallback(
		(corner: Side, initialBounds: XYWH) => {
			history.pause()
			setCanvasState({
				mode: CanvasMode.Resizing,
				intialBounds: initialBounds,
				corner,
			})
		},
		[history]
	)

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera((prev) => ({
			x: prev.x - e.deltaX,
			y: prev.y - e.deltaY,
		}))
	}, [])

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault()
			const current = pointerEventToCanvasPoint(e, camera)

			if (canvasState.mode === CanvasMode.Translating) {
				translateSelectedLayers(current)
			} else if (canvasState.mode === CanvasMode.Resizing) {
				resizeSelectedLayer(current)
			}

			setMyPresence({ cursor: current })
		},
		[canvasState, resizeSelectedLayer, translateSelectedLayers, camera]
	)

	const onPointerLeave = useMutation(({ setMyPresence }) => {
		setMyPresence({ cursor: null })
	}, [])

	const onPointerUp = useMutation(
		({}, e) => {
			const point = pointerEventToCanvasPoint(e, camera)
			if (canvasState.mode === CanvasMode.Inserting) {
				insertLayer(canvasState.layerType, point)
			} else {
				setCanvasState({ mode: CanvasMode.None })
			}

			history.resume()
		},
		[camera, canvasState, history, insertLayer]
	)

	const onLayerPointerDown = useMutation(
		({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
			if (
				canvasState.mode === CanvasMode.Pencil ||
				canvasState.mode === CanvasMode.Inserting
			)
				return
			history.pause()
			e.stopPropagation()
			const point = pointerEventToCanvasPoint(e, camera)

			if (!self.presence.selection.includes(layerId)) {
				setMyPresence(
					{ selection: [layerId] },
					{ addToHistory: true }
				)
			}
			setCanvasState({
				mode: CanvasMode.Translating,
				current: point,
			})
		},
		[setCanvasState, camera, history, canvasState.mode]
	)

	const selections = useOthersMapped((other) => other.presence.selection)
	const layerIdsToColorSelection = useMemo(() => {
		const layerIdsToColorSelection: Record<string, string> = {}
		for (const user of selections) {
			const [connectionId, selection] = user
			for (const layerId of selection) {
				layerIdsToColorSelection[layerId] =
					connectionIdToColor(connectionId)
			}
		}
		return layerIdsToColorSelection
	}, [selections])

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
			<svg
				className='h-[100vh] w-[100vw]'
				onWheel={onWheel}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
				onPointerUp={onPointerUp}
			>
				<g
					style={{
						transform: `translate(${camera.x}px, ${camera.y}px)`,
					}}
				>
					{layerIds.map((layerId) => (
						<LayerPreview
							key={layerId}
							id={layerId}
							onLayerPointerDown={onLayerPointerDown}
							selectionColor={
								layerIdsToColorSelection[layerId]
							}
						/>
					))}
					<SelectionBox
						onResizeHandlerPointerDown={
							onResizeHandlerPointerDown
						}
					/>
					<CursorsPresence />
				</g>
			</svg>
		</main>
	)
}

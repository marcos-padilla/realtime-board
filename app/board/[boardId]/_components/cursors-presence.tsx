'use client'

import { memo } from 'react'
import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config'
import { Cursor } from './cursor'
import { shallow } from '@liveblocks/client'
import Path from './path'
import { colorToHex } from '@/lib/utils'

const Cursors = () => {
	const ids = useOthersConnectionIds()
	return (
		<>
			{ids.map((id) => (
				<Cursor key={id} connectionId={id} />
			))}
		</>
	)
}

const Drafts = () => {
	const others = useOthersMapped(
		(other) => ({
			pencilDraft: other.presence.pencilDraft,
			pencilColor: other.presence.pencilColor,
		}),
		shallow
	)

	return (
		<>
			{others.map(([key, other]) => {
				if (other.pencilDraft) {
					return (
						<Path
							key={key}
							x={0}
							y={0}
							points={other.pencilDraft}
							fill={
								other.pencilColor
									? colorToHex(other.pencilColor)
									: '#000'
							}
						/>
					)
				} else {
					return null
				}
			})}
		</>
	)
}

export const CursorsPresence = memo(() => {
	return (
		<>
			<Drafts />
			<Cursors />
		</>
	)
})

CursorsPresence.displayName = 'CursorsPresence'

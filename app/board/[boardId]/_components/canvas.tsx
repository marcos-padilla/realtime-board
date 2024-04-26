'use client'

import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

export default function Canvas() {
	return (
		<main className='size-full relative bg-neutral-100 touch-none'>
			<Info />
			<Participants />
			<Toolbar />
		</main>
	)
}

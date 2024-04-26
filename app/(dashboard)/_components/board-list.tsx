'use client'

import EmptyBoards from './empty-boards'
import EmptyFavorite from './empty-favorites'
import EmptySearch from './empty-search'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import BoardCard from './board-card'
import NewBoardButton from './new-board-button'

interface BoardListProps {
	orgId: string
	query: {
		search?: string
		favorites?: string
	}
}

export default function BoardList({ orgId, query }: BoardListProps) {
	const data = useQuery(api.boards.get, { orgId })

	if (data === undefined) {
		return <div>Loading...</div>
	}

	if (!data?.length && query.search) {
		return <EmptySearch />
	}

	if (!data?.length && query.favorites) {
		return <EmptyFavorite />
	}

	if (!data?.length) {
		return <EmptyBoards />
	}

	return (
		<div>
			<h2 className='text-3xl font-semibold'>
				{query.favorites ? 'Favorite boards' : 'Team boards'}
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
				<NewBoardButton orgId={orgId} />
				{data?.map((board) => (
					<BoardCard
						key={board._id}
						isFavorite={false}
						{...board}
					/>
				))}
			</div>
		</div>
	)
}

'use client'

import EmptyBoards from './empty-boards'
import EmptyFavorite from './empty-favorites'
import EmptySearch from './empty-search'

interface BoardListProps {
	orgId: string
	query: {
		search?: string
		favorites?: string
	}
}

export default function BoardList({ orgId, query }: BoardListProps) {
	const data = [] //TODO: Fetch data

	if (!data?.length && query.search) {
		return <EmptySearch />
	}

	if (!data?.length && query.favorites) {
		return <EmptyFavorite />
	}

	if (!data?.length) {
		return <EmptyBoards />
	}

	return <div>BoardList</div>
}

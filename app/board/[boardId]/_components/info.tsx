'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Hint from '@/components/globals/hint'
import { useRenameModal } from '@/hooks/stores/use-rename-modal'
import Actions from '@/components/actions'
import { Menu } from 'lucide-react'

interface InfoProps {
	boardId: string
}

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

const TabSeparator = () => {
	return <div className='text-neutral-300 px-1.5 cursor-default'>|</div>
}

export default function Info({ boardId }: InfoProps) {
	const data = useQuery(api.board.get, { id: boardId as Id<'boards'> })
	const { onOpen } = useRenameModal()
	if (!data) return <InfoSkeleton />

	return (
		<div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
			<Hint label='Go to boards' side='bottom' sideOffset={10}>
				<Button className='px-2' variant={'board'} asChild>
					<Link href={'/'}>
						<Image
							src={'/logo.svg'}
							alt='Board Logo'
							width={20}
							height={20}
						/>
						<span
							className={cn(
								'font-semibold text-xl ml-2 text-black',
								font.className
							)}
						>
							Board
						</span>
					</Link>
				</Button>
			</Hint>
			<TabSeparator />
			<Hint label='Edit title' side='bottom' sideOffset={10}>
				<Button
					variant={'board'}
					className='text-base font-normal px-2'
					onClick={() => {
						onOpen(data._id, data.title)
					}}
				>
					{data.title}
				</Button>
			</Hint>
			<TabSeparator />

			<Actions
				id={data._id}
				title={data.title}
				side='bottom'
				sideOffset={10}
			>
				<div>
					<Hint label='Main menu' side='bottom' sideOffset={10}>
						<Button size={'icon'} variant={'board'}>
							<Menu />
						</Button>
					</Hint>
				</div>
			</Actions>
		</div>
	)
}

export const InfoSkeleton = () => {
	return (
		<Skeleton className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 w-[300px] shadow-md ' />
	)
}

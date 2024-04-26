'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { Link2 } from 'lucide-react'
import { toast } from 'sonner'

interface ActionsProps {
	children: React.ReactNode
	side?: DropdownMenuContentProps['side']
	sideOffset?: DropdownMenuContentProps['sideOffset']
	id: string
	title: string
}

export default function Actions({
	children,
	id,
	title,
	side,
	sideOffset,
}: ActionsProps) {
	const onCopyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/board/${id}`)
			.then(() => {
				toast.success('Link copied to clipboard')
			})
			.catch(() => {
				toast.error('Failed to copy link to clipboard')
			})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				side={side}
				sideOffset={sideOffset}
				className='w-60'
				onClick={(e) => e.stopPropagation()}
			>
				<DropdownMenuItem
					className='p-3 cursor-pointer'
					onClick={onCopyLink}
				>
					<Link2 className='size-4 mr-2' />
					Copy board link
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

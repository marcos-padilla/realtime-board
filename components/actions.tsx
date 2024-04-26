'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import ConfirmModal from './confirm-modal'
import { Button } from './ui/button'
import { useRenameModal } from '@/hooks/stores/use-rename-modal'

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
	const { mutate, pending } = useApiMutation(api.board.remove)
	const { onOpen } = useRenameModal()
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

	const onDelete = () => {
		mutate({ id })
			.then(() => {
				toast.success('Board deleted')
			})
			.catch(() => {
				toast.error('Failed to delete board')
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
				<DropdownMenuItem
					className='p-3 cursor-pointer'
					onClick={() => {
						onOpen(id, title)
					}}
				>
					<Pencil className='size-4 mr-2' />
					Rename
				</DropdownMenuItem>
				<ConfirmModal
					header='Delete board?'
					description='This will delete the board and all its content'
					disabled={pending}
					onConfirm={onDelete}
				>
					<Button
						className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
						variant={'ghost'}
					>
						<Trash2 className='size-4 mr-2' />
						Delete
					</Button>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

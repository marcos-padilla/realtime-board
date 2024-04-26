'use client'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useRenameModal } from '@/hooks/stores/use-rename-modal'
import { FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutation } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

export default function RenameModal() {
	const { mutate, pending } = useApiMutation(api.board.update)

	const { isOpen, onClose, initialValues } = useRenameModal()
	const [title, setTitle] = useState(initialValues.title)

	useEffect(() => {
		setTitle(initialValues.title)
	}, [initialValues.title])

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		mutate({ id: initialValues.id, title })
			.then(() => {
				toast.success('Board title updated')
				onClose()
			})
			.catch(() => {
				toast.error('Failed to update board title')
			})
	}
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit board title</DialogTitle>
					<DialogDescription>
						Enter a new title for this board
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={onSubmit}>
					<Input
						disabled={false}
						required
						maxLength={60}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Board title'
					/>
					<DialogFooter className='mt-5'>
						<DialogClose asChild>
							<Button type='button' variant={'ghost'}>
								Cancel
							</Button>
						</DialogClose>
						<Button type='submit' disabled={pending}>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

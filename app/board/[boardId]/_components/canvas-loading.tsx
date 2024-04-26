import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'

export default function CanvasLoading() {
	return (
		<main className='size-full relative bg-neutral-100 touch-none flex items-center justify-center'>
			<Loader className='size-6 text-muted-foreground animate-spin' />
		</main>
	)
}

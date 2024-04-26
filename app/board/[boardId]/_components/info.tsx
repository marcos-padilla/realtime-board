import { Skeleton } from '@/components/ui/skeleton'

export default function Info() {
	return (
		<div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
			Info
		</div>
	)
}

Info.Skeleton = function InfoSkeleton() {
	return (
		<Skeleton className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 w-[300px] shadow-md ' />
	)
}

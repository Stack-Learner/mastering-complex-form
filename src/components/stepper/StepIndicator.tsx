import { cn } from '@/lib/utils';
import { AlertCircle, Check } from 'lucide-react';
import type { StepError } from './stepper.context';

type StepIndicatorProps = {
	step: number;
	error?: StepError;
	isActive: boolean;
	isCompleted: boolean;
};

export const StepIndicator = ({
	step,
	error,
	isActive,
	isCompleted,
}: StepIndicatorProps) => {
	const baseClassName =
		'w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0';

	if (error?.hasError) {
		return (
			<div className={cn(baseClassName, 'border-destructive text-destructive')}>
				<AlertCircle className='w-4 h-4' aria-label='Error' />
			</div>
		);
	}

	if (isCompleted) {
		return (
			<div
				className={cn(
					baseClassName,
					'bg-green-500 border-green-500 text-white'
				)}
			>
				<Check className='w-4 h-4' aria-label='Completed' />
			</div>
		);
	}

	if (isActive) {
		return (
			<div className={cn(baseClassName, 'border-primary text-primary')}>
				<span>{step}</span>
			</div>
		);
	}

	return (
		<div className={cn(baseClassName, 'border-muted text-muted-foreground')}>
			<span>{step}</span>
		</div>
	);
};

StepIndicator.displayName = 'StepIndicator';

export const StepConnector = ({ isCompleted }: { isCompleted: boolean }) => (
	<div
		className={cn('h-0.5 w-full', isCompleted ? 'bg-green-500' : 'bg-muted')}
		role='separator'
	/>
);

StepConnector.displayName = 'StepConnector';

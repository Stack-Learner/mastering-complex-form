import { ReactNode } from 'react';
import { StepError, useStepperContext } from './stepper.context';

export type StepProps = {
	children: ReactNode;
	validate?: () => StepError | Promise<StepError>;
};

export const Step = ({ children }: StepProps) => {
	const { currentStep, stepErrors } = useStepperContext();
	const error = stepErrors[currentStep];

	return (
		<div className='p-2'>
			{error?.hasError && error.message && (
				<div className='text-center mb-4'>
					<p className='text-destructive text-sm'>{error.message}</p>
				</div>
			)}

			{children}
		</div>
	);
};

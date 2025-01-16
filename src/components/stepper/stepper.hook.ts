import { Children } from 'react';
import { useStepperContext, type StepError } from './stepper.context';
import { Step, type StepProps } from './Step';

export const useStepContent = (children: React.ReactNode) => {
	const { currentStep, setCurrentStep, totalSteps, stepErrors, setStepErrors } =
		useStepperContext();

	const steps = Children.toArray(children).filter(
		(child) => (child as React.ReactElement).type === Step
	);

	const validateStep = async (step: number): Promise<StepError> => {
		const currentChild = steps[step - 1] as React.ReactElement<StepProps>;
		if (currentChild.props.validate) {
			return await currentChild.props.validate();
		}
		return { hasError: false };
	};

	const handleNext = async (
		onComplete?: () => void | Promise<void>
	): Promise<void> => {
		const error = await validateStep(currentStep);
		if (error.hasError) {
			setStepErrors({ [currentStep]: error });
			return;
		}

		setStepErrors({ [currentStep]: { hasError: false } });

		if (currentStep === totalSteps && onComplete) {
			await onComplete();
			return;
		}

		setCurrentStep(currentStep + 1);
	};

	const handlePrevious = (): void => {
		setCurrentStep(currentStep - 1);
	};

	return {
		currentStep,
		totalSteps,
		stepErrors,
		handleNext,
		handlePrevious,
		steps,
	};
};

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

type Props = {
	resetLabel?: string;
	disabled?: boolean;
	className?: string;
};

/**
 * ResetButton component
 *
 * @param resetLabel - The label for the reset button.
 * @param disabled - Whether the button is disabled.
 * @param className - The class name for the button.
 * @returns The ResetButton component.
 */

export const ResetButton = ({
	resetLabel = 'Reset',
	disabled = false,
	className,
}: Props) => {
	const form = useFormContext();
	return (
		<Button
			type="reset"
			variant={'outline'}
			size={'sm'}
			disabled={disabled}
			className={cn(className)}
			onClick={() => {
				form.reset();
			}}
		>
			{resetLabel}
		</Button>
	);
};

ResetButton.displayName = 'ResetButton';

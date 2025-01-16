import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

type Props = {
	resetLabel?: string;
	disabled?: boolean;
	className?: string;
};

export const ResetButton = ({
	resetLabel = 'Reset',
	disabled = false,
	className,
}: Props) => {
	const form = useFormContext();
	return (
		<Button
			type='reset'
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

import { FC } from 'react';
import { SubmitButton } from '../form/fields/SubmitButton';
import { Button } from '../ui/button';

type Props = {
	onBack?: () => void;
	onSubmit?: () => void;
};

export const PrevNextButtons: FC<Props> = ({ onBack, onSubmit }) => {
	return (
		<div className="flex items-center justify-between mt-4">
			<Button onClick={onBack} variant={'outline'}>
				Prev
			</Button>
			{onSubmit ? (
				<Button onClick={onSubmit}>Submit</Button>
			) : (
				<SubmitButton label="Next" loadingLabel="Going to Next" width="auto" />
			)}
		</div>
	);
};

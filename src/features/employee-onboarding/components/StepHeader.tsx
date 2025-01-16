import { FC } from 'react';

type StepHeaderProps = {
	icon?: React.ReactNode;
	title: string;
	description: string;
};

/**
 * StepHeader component
 * @param icon The icon of the step header.
 * @param title The title of the step header.
 * @param description The description of the step header.
 *
 * @returns The step header component.
 */

export const StepHeader: FC<StepHeaderProps> = ({
	icon,
	title,
	description,
}) => {
	return (
		<div className="flex items-start space-x-3 pb-4 border-b">
			{icon}
			<div>
				<h1 className="text-2xl font-semibold tracking-tight leading-none">
					{title}
				</h1>
				<p className="text-sm text-muted-foreground py-1">{description}</p>
			</div>
		</div>
	);
};

StepHeader.displayName = 'StepHeader';

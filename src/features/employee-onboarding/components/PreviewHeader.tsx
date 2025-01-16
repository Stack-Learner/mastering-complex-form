import React, { FC } from 'react';

type PreviewHeaderProps = {
	title: string;
	icon?: React.ReactNode;
};

/**
 * PreviewHeader. A preview header component.
 * Responsibility: Render a preview header component.
 *
 * @param title The title of the header.
 * @param icon The icon to display.
 *
 * @returns A preview header component.
 */

export const PreviewHeader: FC<PreviewHeaderProps> = ({ title, icon }) => {
	return (
		<div className="flex items-center space-x-2 mb-4">
			{icon}
			<h2 className="text-xl font-medium">{title}</h2>
		</div>
	);
};

PreviewHeader.displayName = 'PreviewHeader';

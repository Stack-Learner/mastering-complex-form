/**
 * AgreementItem. An agreement item component.
 * Responsibility: Render an agreement item component.
 *
 * @param label The label of the item.
 * @param agreed The agreed flag of the item.
 *
 * @returns An agreement item component.
 */

import { CheckCircle2, XCircle } from 'lucide-react';

export const AgreementItem = ({
	label,
	agreed,
}: {
	label: string;
	agreed: boolean;
}) => (
	<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
		<span className="font-medium">{label}</span>
		{agreed ? (
			<CheckCircle2 className="w-5 h-5 text-green-500" />
		) : (
			<XCircle className="w-5 h-5 text-red-500" />
		)}
	</div>
);

AgreementItem.displayName = 'AgreementItem';

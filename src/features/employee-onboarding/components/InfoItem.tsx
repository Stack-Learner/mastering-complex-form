/**
 * InfoItem. An information item component.
 * Responsibility: Render an information item component.
 *
 * @param icon The icon to display.
 * @param label The label of the item.
 * @param value The value of the item.
 *
 * @returns An information item component.
 */
export const InfoItem = ({
	icon,
	label,
	value,
}: {
	icon?: React.ReactNode;
	label: string;
	value: string;
}) => (
	<div className="space-y-1">
		<span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
			{icon && <span className="w-4 h-4">{icon}</span>}
			{label}
		</span>
		<p className="text-sm">{value}</p>
	</div>
);

InfoItem.displayName = 'InfoItem';

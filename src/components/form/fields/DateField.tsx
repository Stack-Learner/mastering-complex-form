import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	required?: boolean;
	disabled?: boolean;
}

/**
 * DateField component
 *
 * @param name - The name of the field.
 * @param label - The label for the field.
 * @param required - Whether the field is required.
 * @param disabled - Whether the field is disabled.
 * @returns The DateField component.
 */

export const DateField = <T extends FieldValues>({
	name,
	label,
	required = false,
	disabled = false,
}: Props<T>) => {
	const { control } = useFormContext<T>();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel htmlFor={name}>
							<span>{label}</span>
							{required && <span className="ml-1 text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<div>
							<DateTimePicker
								disabled={disabled}
								value={field.value}
								onChange={field.onChange}
								granularity="day"
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

DateField.displayName = 'DateField';

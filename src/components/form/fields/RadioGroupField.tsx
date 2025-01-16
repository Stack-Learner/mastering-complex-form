import { cn } from '@/lib/utils';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type OptionType = {
	value: string;
	text: string;
};

type QuestionTypeRadioGroupProps<T extends FieldValues> = {
	name: Path<T>;
	options: OptionType[];
	label?: string;
	required?: boolean;
	className?: string;
	column?: boolean;
	longGap?: boolean;
	reverse?: boolean;
	gap?: '2' | '4' | '6' | '8';
	columnGroup?: boolean;
	rowGroup?: boolean;
};

/**
 * RadioGroupField component is responsible for rendering the radio group field in the form.
 *
 * @param name - The name of the field.
 * @param options - The options for the radio group.
 * @param label - The label for the radio group.
 * @param required - The required flag for the radio group.
 * @param className - The class name for the radio group.
 * @param column - The column flag for the radio group.
 * @param longGap - The long gap flag for the radio group.
 * @param reverse - The reverse flag for the radio group.
 * @param gap - The gap for the radio group.
 * @param columnGroup - The column group flag for the radio group.
 * @param rowGroup - The row group flag for the radio group.
 * @returns The RadioGroupField component.
 */

export const RadioGroupField = <T extends FieldValues>({
	name,
	options,
	label = 'Question Type',
	required = false,
	className = '',
	column = false,
	longGap = false,
	reverse = false,
	columnGroup = true,
	rowGroup = false,
	gap = '2',
}: QuestionTypeRadioGroupProps<T>) => {
	const { control } = useFormContext<T>();

	if (options.length < 2) {
		return (
			<div className="text-red-500">
				Please provide at least two options for the radio group.
			</div>
		);
	}

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel>
							<span>{label}</span>
							{required && <span className="ml-1 text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value}
							className={cn(
								className,
								columnGroup ? 'flex-col' : '',
								rowGroup ? 'flex-row' : '',
								'flex gap-2'
							)}
						>
							{options.map((option) => (
								<FormItem key={option.value}>
									<FormControl>
										<div
											className={cn(
												'relative flex items-center',
												`gap-${gap}`,
												column ? 'flex-col items-start' : '',
												longGap ? 'justify-between' : ''
											)}
										>
											<RadioGroupItem
												id={option.value}
												className={cn(reverse ? 'order-1' : 'order-0')}
												value={option.value}
											/>
											<FormLabel
												htmlFor={option.value}
												className={cn(reverse ? 'order-0' : 'order-1')}
											>
												{option.text}
											</FormLabel>
										</div>
									</FormControl>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

RadioGroupField.displayName = 'RadioGroupField';

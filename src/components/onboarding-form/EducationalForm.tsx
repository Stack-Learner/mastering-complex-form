import { FC, useRef } from 'react';
import { z } from 'zod';
import { FieldArray } from '../form/FieldArray';
import { DateField } from '../form/fields/DateField';
import { SubmitButton } from '../form/fields/SubmitButton';
import { TextField } from '../form/fields/TextField';
import { GenericForm, GenericFormRef } from '../form/GenericForm';
import { Button } from '../ui/button';

const EducationalFormSchema = z.object({
	educationalBackground: z.array(
		z.object({
			institution: z.string().min(1, 'Institution is required'),
			degree: z.string().min(1, 'Degree is required'),
			major: z.string().min(1, 'Major is required'),
			startDate: z.date({
				required_error: 'Start date is required',
			}),
			endDate: z.date({
				required_error: 'End date is required',
			}),
		})
	),
});

export type EducationalFormType = z.infer<typeof EducationalFormSchema>;

type Props = {
	onNext: (data: EducationalFormType) => void;
	onBack: () => void;
	formData: Partial<EducationalFormType>;
};

export const EducationalForm: FC<Props> = ({ onBack, onNext, formData }) => {
	const formRef = useRef<GenericFormRef<EducationalFormType>>(null);

	return (
		<div>
			<h1 className="text-xl font-semibold">Step 3: Educational Background</h1>

			<GenericForm
				schema={EducationalFormSchema}
				initialValues={formData}
				onSubmit={(data) => onNext(data as EducationalFormType)}
				ref={formRef}
			>
				<FieldArray name="educationalBackground">
					{({ fields, append, remove }) => (
						<div className="space-y-8">
							{fields.map((field, index) => (
								<div key={field.id} className="grid grid-cols-2 gap-4">
									<TextField<EducationalFormType>
										name={`educationalBackground.${index}.institution`}
										label="Institution"
										required
									/>
									<TextField<EducationalFormType>
										name={`educationalBackground.${index}.degree`}
										label="Degree"
										required
									/>
									<TextField<EducationalFormType>
										name={`educationalBackground.${index}.major`}
										label="Major"
										required
									/>
									<DateField<EducationalFormType>
										name={`educationalBackground.${index}.startDate`}
										label="Start Date"
										required
									/>
									<DateField<EducationalFormType>
										name={`educationalBackground.${index}.endDate`}
										label="End Date"
										required
									/>
									<div className="flex justify-end">
										<Button onClick={() => remove(index)} variant="destructive">
											Remove
										</Button>
									</div>
								</div>
							))}
							<Button
								onClick={() =>
									append({
										institution: '',
										degree: '',
										major: '',
										startDate: new Date(),
										endDate: new Date(),
									})
								}
							>
								Add Educational Entry
							</Button>
						</div>
					)}
				</FieldArray>

				<div className="flex items-center justify-between mt-4">
					<Button variant={'outline'} onClick={onBack}>
						Back
					</Button>
					<SubmitButton
						label="Next"
						loadingLabel="Going to Next"
						width="auto"
					/>
				</div>
			</GenericForm>
		</div>
	);
};

import { X } from 'lucide-react';
import { FC, useRef } from 'react';
import { z } from 'zod';
import { FieldArray } from '../form/FieldArray';
import { GenericForm, GenericFormRef } from '../form/GenericForm';
import { SubmitButton } from '../form/fields/SubmitButton';
import { TextareaField } from '../form/fields/TextAreaField';
import { TextField } from '../form/fields/TextField';
import { Button } from '../ui/button';

const PreferencesAndSkillsSectionSchema = z.object({
	interests: z.array(z.string()).optional(),
	skills: z.array(z.string()).optional(),
	userGoals: z
		.string()
		.max(500, 'User Goals must be at most 500 characters')
		.optional(),
});

export type PreferencesAndSkillsSectionType = z.infer<
	typeof PreferencesAndSkillsSectionSchema
>;

type Props = {
	onNext: (data: PreferencesAndSkillsSectionType) => void;
	onBack: () => void;
	formData: Partial<PreferencesAndSkillsSectionType>;
};

export const PreferencesAndSkillsSection: FC<Props> = ({
	onBack,
	onNext,
	formData,
}) => {
	const formRef = useRef<GenericFormRef<PreferencesAndSkillsSectionType>>(null);

	return (
		<div>
			<h1 className="text-xl font-semibold">Step 4: Preferences</h1>

			<GenericForm
				schema={PreferencesAndSkillsSectionSchema}
				initialValues={formData}
				onSubmit={(data) => onNext(data as PreferencesAndSkillsSectionType)}
				ref={formRef}
			>
				<FieldArray name="interests">
					{({ fields, append, remove }) => (
						<div className="mb-4">
							<p className="mb-2">Interests</p>
							<div className="flex flex-col gap-4 items-start">
								{fields.map((field, index) => (
									<div className="flex items-center gap-4" key={field.id}>
										<TextField<PreferencesAndSkillsSectionType>
											name={`interests.${index}`}
										/>
										<Button onClick={() => remove(index)} variant={'ghost'}>
											<X className="h-4 w-4 text-red-500" />
										</Button>
									</div>
								))}

								<Button
									type="button"
									onClick={() => append('')}
									variant="outline"
									size={'sm'}
								>
									Add Interest
								</Button>
							</div>
						</div>
					)}
				</FieldArray>

				<FieldArray name="skills">
					{({ fields, append, remove }) => (
						<div className="mb-4">
							<p className="mb-2">Skills</p>
							<div className="flex flex-col items-start gap-4">
								{fields.map((field, index) => (
									<div className="flex items-center gap-4" key={field.id}>
										<TextField<PreferencesAndSkillsSectionType>
											name={`skills.${index}`}
										/>
										<Button onClick={() => remove(index)} variant={'ghost'}>
											<X className="h-4 w-4 text-red-500" />
										</Button>
									</div>
								))}
								<Button
									type="button"
									onClick={() => append('')}
									variant="outline"
									size="sm"
								>
									Add Skill
								</Button>
							</div>
						</div>
					)}
				</FieldArray>

				<TextareaField<PreferencesAndSkillsSectionType>
					name="userGoals"
					label="User Goals"
				/>

				<div className="flex items-center justify-between mt-4">
					<Button onClick={onBack} variant={'outline'}>
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

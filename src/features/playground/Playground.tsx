import { CheckboxField } from '@/components/form/fields/CheckboxField';
import { CheckboxGroupField } from '@/components/form/fields/CheckboxGroupField';
import { DateField } from '@/components/form/fields/DateField';
import { RadioGroupField } from '@/components/form/fields/RadioGroupField';
import { TextAreaField } from '@/components/form/fields/TextAreaField';
import { TextField } from '@/components/form/fields/TextField';
import { GenericForm, GenericFormRef } from '@/components/form/GenericForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRef } from 'react';
import { z } from 'zod';

const FormSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	gender: z.enum(['Male', 'Female', 'Other'], {
		errorMap: () => ({ message: 'Gender is required' }),
	}),
	dob: z.date({
		message: 'Invalid date',
	}),
	bio: z.string().optional(),
	terms: z
		.boolean()
		.refine((value) => value, { message: 'You must agree to the terms' }),
	interests: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const initialValues: FormValues = {
	name: '',
	gender: 'Male',
	terms: false,
	dob: new Date(),
};

const genderOptions = [
	{ value: 'Male', text: 'Male' },
	{ value: 'Female', text: 'Female' },
	{ value: 'Other', text: 'Other' },
];

const interestsOptions = [
	{ value: 'Reading', text: 'Reading' },
	{ value: 'Coding', text: 'Coding' },
	{ value: 'Gaming', text: 'Gaming' },
	{ value: 'Traveling', text: 'Traveling' },
];

export const Playground = () => {
	const formRef = useRef<GenericFormRef<FormValues>>(null);

	return (
		<Card className="bg-zinc-100 p-4 my-4 max-w-xl mx-auto">
			<GenericForm
				schema={FormSchema}
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log(values);
					alert(JSON.stringify(values));
				}}
				ref={formRef}
			>
				<div className="space-y-4">
					<TextField<FormValues>
						name="name"
						label="Name"
						placeholder="Enter your name"
						required
						action={() => formRef.current?.setValue('name', '')}
					/>

					<RadioGroupField<FormValues>
						name="gender"
						options={genderOptions}
						required
					/>

					<DateField<FormValues> name="dob" label="Date of Birth" required />

					<TextAreaField<FormValues>
						name="bio"
						label="Bio"
						placeholder="Enter your bio"
						autoResize
					/>

					<CheckboxGroupField<FormValues>
						name="interests"
						options={interestsOptions}
						label="Interests"
					/>

					<CheckboxField<FormValues>
						name="terms"
						label="I agree to the terms"
						required
					/>

					<Button type="submit">Submit</Button>
				</div>
			</GenericForm>
		</Card>
	);
};

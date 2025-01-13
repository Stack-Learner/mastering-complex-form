import { useRef } from 'react';
import { z } from 'zod';
import { GenericForm, GenericFormRef } from './components/form/GenericForm';
import { CheckboxField } from './components/form/fields/CheckboxField';
import { DateField } from './components/form/fields/DateField';
import { DateTimeField } from './components/form/fields/DateTimeField';
import { RadioGroupField } from './components/form/fields/RadioGroupField';
import { ResetButton } from './components/form/fields/ResetButton';
import { SelectField } from './components/form/fields/SelectField';
import { SubmitButton } from './components/form/fields/SubmitButton';
import { SwitchField } from './components/form/fields/SwitchField';
import { TextareaField } from './components/form/fields/TextAreaField';
import { TextField } from './components/form/fields/TextField';

const FormSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	department: z.enum(['engineering', 'marketing', 'sales']),
	message: z.string().nonempty(),
	dob: z.date({
		required_error: 'A date of birth is required.',
	}),
	dateTime: z.date(),
	isActive: z.boolean(),
	tnc: z.boolean(),
	gender: z.enum(['male', 'female', 'other']),
});

const selectOptions = [
	{ value: 'engineering', text: 'Engineering' },
	{ value: 'marketing', text: 'Marketing' },
	{ value: 'sales', text: 'Sales' },
];

const genderOptions = [
	{ value: 'male', text: 'Male' },
	{ value: 'female', text: 'Female' },
	{ value: 'other', text: 'Other' },
];

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
	name: '',
	email: '',
	department: 'engineering',
	message: '',
	dob: new Date(),
	dateTime: new Date(),
	isActive: false,
	tnc: false,
	gender: 'male',
};

const App = () => {
	const formRef = useRef<GenericFormRef<FormType>>(null);

	const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
		console.log(data);
		formRef.current?.reset();
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="font-semibold text-lg text-center">Form</h1>
			<GenericForm
				schema={FormSchema}
				initialValues={initialValues}
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<TextField name="name" label="Name" />
				<TextField name="email" label="Email" />
				<SelectField
					name="department"
					options={selectOptions}
					label="Department"
				/>
				<TextareaField name="message" label="Message" autoResize />
				<DateField name="dob" label="Date of Birth" />
				<DateTimeField name="dateTime" label="Date Time" />
				<SwitchField name="isActive" label="Is Active" />
				<CheckboxField name="tnc" label="Terms and Conditions" />
				<RadioGroupField name="gender" options={genderOptions} />

				<SubmitButton width="auto" />
				<ResetButton onReset={() => formRef.current?.reset()} />
			</GenericForm>
		</div>
	);
};

export default App;

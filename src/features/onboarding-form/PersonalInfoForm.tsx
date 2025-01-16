import { FC, useRef } from 'react';
import { z } from 'zod';
import { GenericForm, GenericFormRef } from '../form/GenericForm';
import { DateField } from '../form/fields/DateField';
import { RadioGroupField } from '../form/fields/RadioGroupField';
import { SubmitButton } from '../form/fields/SubmitButton';
import { TextField } from '../form/fields/TextField';

const PersonalInfoFormSchema = z.object({
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last Name is required'),
	email: z.string().email('Invalid email address'),
	dob: z.date({
		required_error: 'A date of birth is required.',
	}),
	gender: z.enum(['male', 'female', 'other'], {
		errorMap: () => ({ message: 'Gender is required' }),
	}),
	address: z.object({
		street: z.string().min(1, 'Street is required'),
		city: z.string().min(1, 'City is required'),
		district: z.string().min(1, 'State is required'),
		zip: z
			.string()
			.min(4, 'Zip Code must be at least 4 digits')
			.max(10, 'Zip Code must be at most 10 digits'),
	}),
});

export type PersonalInfoFormType = z.infer<typeof PersonalInfoFormSchema>;

type Props = {
	onNext: (data: PersonalInfoFormType) => void;
	formData: Partial<PersonalInfoFormType>;
};

const genderOptions = [
	{ value: 'male', text: 'Male' },
	{ value: 'female', text: 'Female' },
	{ value: 'other', text: 'Other' },
];

export const PersonalInfoForm: FC<Props> = ({ onNext, formData }) => {
	const formRef = useRef<GenericFormRef<PersonalInfoFormType>>(null);

	return (
		<div className="space-y-4">
			<h1 className="text-xl font-semibold">Step 1: Personal Information</h1>

			<GenericForm
				schema={PersonalInfoFormSchema}
				initialValues={formData}
				onSubmit={(data) => onNext(data as PersonalInfoFormType)}
				ref={formRef}
			>
				<div className="grid grid-cols-2 gap-4">
					<TextField<PersonalInfoFormType>
						name="firstName"
						label="First Name"
						required
					/>
					<TextField<PersonalInfoFormType>
						name="lastName"
						label="Last Name"
						required
					/>
					<TextField<PersonalInfoFormType>
						name="email"
						label="Email"
						required
					/>
					<DateField<PersonalInfoFormType>
						name="dob"
						label="Date of Birth"
						required
					/>
					<RadioGroupField<PersonalInfoFormType>
						name="gender"
						options={genderOptions}
					/>
					<TextField<PersonalInfoFormType>
						name="address.street"
						label="Street"
						required
					/>
					<TextField<PersonalInfoFormType>
						name="address.city"
						label="City"
						required
					/>
					<TextField<PersonalInfoFormType>
						name="address.district"
						label="District"
						required
					/>
					<TextField<PersonalInfoFormType>
						name="address.zip"
						label="Zip Code"
						required
					/>
				</div>

				<div className="mt-2 flex items-center justify-end">
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

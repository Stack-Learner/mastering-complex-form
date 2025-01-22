import { DateField } from '@/components/form/fields/DateField';
import { ImageUploadField } from '@/components/form/fields/ImageUploadField';
import { PasswordField } from '@/components/form/fields/PasswordField';
import { RadioGroupField } from '@/components/form/fields/RadioGroupField';
import { TextAreaField } from '@/components/form/fields/TextAreaField';
import { TextField } from '@/components/form/fields/TextField';
import { UniqueTextField } from '@/components/form/fields/UniqueTextField';
import { Card } from '@/components/ui/card';
import { FormLabel } from '@/components/ui/form';
import { generateDummyImageUrl } from '@/lib/utils/generateDummyImageUrl';
import { getAge } from '@/lib/utils/getAge';
import { User2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { StepHeader } from './components/StepHeader';
import {
	checkEmailUnique,
	checkUsernameUnique,
	EmployeeFormValue,
} from './schema';

const genderOptions = [
	{ value: 'male', text: 'Male' },
	{ value: 'female', text: 'Female' },
	{ value: 'other', text: 'Other' },
];

/**
 * The personal details fields.
 * @returns The personal details fields.
 */

export const PersonalDetailsFields = () => {
	const { watch } = useFormContext<EmployeeFormValue>();
	const dob = watch('personalInformation.dob');

	return (
		<Card className="p-6 space-y-6">
			{/* Header Section */}
			<StepHeader
				icon={<User2 className="w-6 h-6 text-primary" />}
				title="Personal Information"
				description="Please provide your personal information below."
			/>

			{/* Main Form Section */}
			<div className="space-y-6">
				{/* Basic Information */}
				<div className="space-y-4">
					<h2 className="text-lg font-medium">Basic Details</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
						<ImageUploadField<EmployeeFormValue>
							name="personalInformation.profileImage"
							label="Profile Image"
							onUpload={generateDummyImageUrl}
						/>
						<div></div>
						<TextField<EmployeeFormValue>
							name="personalInformation.firstName"
							label="First Name"
							placeholder="Enter First name"
							required
						/>
						<TextField<EmployeeFormValue>
							name="personalInformation.lastName"
							label="Last Name"
							placeholder="Enter Last name"
							required
						/>
						<UniqueTextField<EmployeeFormValue>
							name="personalInformation.username"
							label="Username"
							placeholder="Enter Username"
							required
							checkFunction={checkUsernameUnique}
						/>

						<PasswordField<EmployeeFormValue>
							name="personalInformation.password"
							label="Password"
							placeholder="Enter Password"
							required
							showMessage
							showStrength
						/>
						<DateField<EmployeeFormValue>
							name="personalInformation.dob"
							label="Date of Birth"
							required
						/>
						<div className="mt-2 space-y-2.5">
							<FormLabel className="block">Age</FormLabel>
							<div className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
								{dob ? getAge(dob.toISOString()) : '-'}
							</div>
						</div>
						<RadioGroupField<EmployeeFormValue>
							name="personalInformation.gender"
							label="Gender"
							options={genderOptions}
							className="col-span-full"
							required
						/>
					</div>
				</div>

				{/* Contact Information */}
				<div className="space-y-4 pt-4 border-t">
					<h2 className="text-lg font-medium">Contact Information</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
						<TextField<EmployeeFormValue>
							name="personalInformation.contactNumber"
							label="Contact Number"
							placeholder="Enter your contact number"
							required
						/>
						<UniqueTextField<EmployeeFormValue>
							name="personalInformation.personalEmail"
							label="Personal Email"
							placeholder="Enter your personal email"
							required
							checkFunction={checkEmailUnique}
						/>
						<TextAreaField<EmployeeFormValue>
							name="personalInformation.homeAddress"
							label="Home Address"
							className="col-span-full"
							autoResize
							placeholder="Enter your home address"
							required
						/>
					</div>
				</div>

				{/* Emergency Contact */}
				<div className="space-y-4 pt-4 border-t">
					<h2 className="text-lg font-medium">Emergency Contact</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
						<TextField<EmployeeFormValue>
							name="personalInformation.emergencyContact.name"
							label="Emergency Contact Name"
							placeholder="Enter emergency contact name"
							required
						/>
						<TextField<EmployeeFormValue>
							name="personalInformation.emergencyContact.relationship"
							label="Relationship"
							placeholder="Enter relationship"
							required
						/>
						<TextField<EmployeeFormValue>
							name="personalInformation.emergencyContact.contactNumber"
							label="Contact Number"
							placeholder="Enter contact number"
							required
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};

PersonalDetailsFields.displayName = 'PersonalDetailsFields';

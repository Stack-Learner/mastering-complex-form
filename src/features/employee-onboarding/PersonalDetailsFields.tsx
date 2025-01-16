import { DateField } from '@/components/form/fields/DateField';
import { RadioGroupField } from '@/components/form/fields/RadioGroupField';
import { TextAreaField } from '@/components/form/fields/TextAreaField';
import { TextField } from '@/components/form/fields/TextField';
import { Card } from '@/components/ui/card';
import { User2 } from 'lucide-react';
import { StepHeader } from './components/StepHeader';
import { EmployeeFormValue } from './schema';

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
						<TextField<EmployeeFormValue>
							name="personalInformation.fullName"
							label="Full Name"
							placeholder="Enter your full name"
						/>
						<DateField<EmployeeFormValue>
							name="personalInformation.dob"
							label="Date of Birth"
						/>
						<RadioGroupField<EmployeeFormValue>
							name="personalInformation.gender"
							label="Gender"
							options={genderOptions}
							className="col-span-full"
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
						/>
						<TextField<EmployeeFormValue>
							name="personalInformation.personalEmail"
							label="Personal Email"
							placeholder="Enter your personal email"
						/>
						<TextAreaField<EmployeeFormValue>
							name="personalInformation.homeAddress"
							label="Home Address"
							className="col-span-full"
							autoResize
							placeholder="Enter your home address"
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
						/>
						<TextField<EmployeeFormValue>
							name="personalInformation.emergencyContact.relationship"
							label="Relationship"
							placeholder="Enter relationship"
						/>
						<TextField<EmployeeFormValue>
							name="personalInformation.emergencyContact.contactNumber"
							label="Contact Number"
							placeholder="Enter contact number"
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};

PersonalDetailsFields.displayName = 'PersonalDetailsFields';

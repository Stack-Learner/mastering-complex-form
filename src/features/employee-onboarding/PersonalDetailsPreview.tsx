import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, Heart, Home, Mail, Phone, User } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { InfoItem } from './components/InfoItem';
import { PreviewHeader } from './components/PreviewHeader';
import { EmployeeFormValue } from './schema';

/**
 * PersonalDetailsPreview. A personal details preview component.
 * Responsibility: Render a personal details preview component.
 *
 * @returns A personal details preview component.
 */

export const PersonalDetailsPreview = () => {
	const formContext = useFormContext<EmployeeFormValue>();
	const formValues = formContext.getValues();

	return (
		<Card className="p-6">
			<PreviewHeader
				icon={<User className="w-5 h-5 text-primary" />}
				title="Personal Details"
			/>

			<div className="grid md:grid-cols-2 gap-6">
				<InfoItem
					icon={<User size={16} />}
					label="First Name"
					value={formValues.personalInformation.firstName}
				/>
				<InfoItem
					icon={<User size={16} />}
					label="Last Name"
					value={formValues.personalInformation.lastName}
				/>
				<InfoItem
					icon={<Calendar size={16} />}
					label="Date of Birth"
					value={format(formValues.personalInformation.dob, 'PPP')}
				/>
				<InfoItem
					icon={<User size={16} />}
					label="Gender"
					value={formValues.personalInformation.gender}
				/>
				<InfoItem
					icon={<Phone size={16} />}
					label="Contact"
					value={formValues.personalInformation.contactNumber}
				/>
				<InfoItem
					icon={<Mail size={16} />}
					label="Email"
					value={formValues.personalInformation.personalEmail}
				/>
				<InfoItem
					icon={<Home size={16} />}
					label="Address"
					value={formValues.personalInformation.homeAddress}
				/>

				<div className="col-span-2">
					<h3 className="font-medium flex items-center gap-2 mb-3">
						<Heart className="w-4 h-4 text-primary" /> Emergency Contact
					</h3>
					<div className="grid md:grid-cols-3 gap-4">
						<InfoItem
							label="Name"
							value={formValues.personalInformation.emergencyContact.name}
						/>
						<InfoItem
							label="Relationship"
							value={
								formValues.personalInformation.emergencyContact.relationship
							}
						/>
						<InfoItem
							label="Contact"
							value={
								formValues.personalInformation.emergencyContact.contactNumber
							}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};

PersonalDetailsPreview.displayName = 'PersonalDetailsPreview';

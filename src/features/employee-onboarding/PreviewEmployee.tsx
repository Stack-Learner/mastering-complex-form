import { CheckboxField } from '@/components/form/fields/CheckboxField';
import { format } from 'date-fns';
import {
	Briefcase,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	DollarSign,
	Eye,
	GraduationCap,
	Heart,
	Home,
	Mail,
	Phone,
	ScrollText,
	User,
	XCircle,
} from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Card } from '../../components/ui/card';
import { EmployeeFormValue } from './schema';

/**
 * PreviewEmployee. A preview employee component.
 * Responsibility: Render a preview employee component.
 *
 * @returns A preview employee component.
 */

export const PreviewEmployee = () => {
	const context = useFormContext();
	const formValues = context.getValues();

	return (
		<div className="space-y-8 max-w-[1200px] mx-auto">
			{/* Header */}
			<Card className="p-6">
				<div className="flex items-center space-x-3 border-b pb-4">
					<Eye className="w-8 h-8 text-primary" />
					<div>
						<h1 className="text-2xl font-semibold tracking-tight">
							Employee Preview
						</h1>
						<p className="text-sm text-muted-foreground">
							Review all information before final submission
						</p>
					</div>
				</div>

				{/* Sections */}
				<div className="space-y-6 mt-6">
					{/* Personal Information */}
					<Card className="p-6">
						<div className="flex items-center space-x-2 mb-4">
							<User className="w-5 h-5 text-primary" />
							<h2 className="text-xl font-medium">Personal Information</h2>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							<InfoItem
								icon={<User size={16} />}
								label="Full Name"
								value={formValues.personalInformation.fullName}
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
								<Card className="p-4 bg-muted/50">
									<h3 className="font-medium flex items-center gap-2 mb-3">
										<Heart className="w-4 h-4 text-primary" /> Emergency Contact
									</h3>
									<div className="grid md:grid-cols-3 gap-4">
										<InfoItem
											label="Name"
											value={
												formValues.personalInformation.emergencyContact.name
											}
										/>
										<InfoItem
											label="Relationship"
											value={
												formValues.personalInformation.emergencyContact
													.relationship
											}
										/>
										<InfoItem
											label="Contact"
											value={
												formValues.personalInformation.emergencyContact
													.contactNumber
											}
										/>
									</div>
								</Card>
							</div>
						</div>
					</Card>

					{/* Employment Details */}
					<Card className="p-6">
						<div className="flex items-center space-x-2 mb-4">
							<Briefcase className="w-5 h-5 text-primary" />
							<h2 className="text-xl font-medium">Employment Details</h2>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							<InfoItem
								icon={<Briefcase size={16} />}
								label="Job Title"
								value={formValues.employmentDetails.jobTitle}
							/>
							<InfoItem
								icon={<Building2 size={16} />}
								label="Employee ID"
								value={formValues.employmentDetails.employeeId}
							/>
							<InfoItem
								icon={<Building2 size={16} />}
								label="Department"
								value={formValues.employmentDetails.department}
							/>
							<InfoItem
								icon={<Calendar size={16} />}
								label="Joining Date"
								value={format(formValues.employmentDetails.joiningDate, 'PPP')}
							/>
							<InfoItem
								icon={<User size={16} />}
								label="Reporting Manager"
								value={formValues.employmentDetails.reportingManager}
							/>
							<InfoItem
								icon={<Clock size={16} />}
								label="Job Type"
								value={formValues.employmentDetails.jobType}
							/>
							<InfoItem
								icon={<DollarSign size={16} />}
								label="Salary"
								value={formValues.employmentDetails.salary}
							/>
						</div>
					</Card>

					{/* Professional Experience */}
					<Card className="p-6">
						<div className="flex items-center space-x-2 mb-4">
							<Building2 className="w-5 h-5 text-primary" />
							<h2 className="text-xl font-medium">Professional Experience</h2>
						</div>

						<div className="space-y-4">
							{formValues.professionalExperiences.map(
								(
									experience: EmployeeFormValue['professionalExperiences'][number],
									index: number
								) => (
									<Card key={index} className="p-4 bg-muted/50">
										<h3 className="font-medium mb-3">Experience {index + 1}</h3>
										<div className="grid md:grid-cols-2 gap-4">
											<InfoItem
												label="Company"
												value={experience.companyName!}
											/>
											<InfoItem
												label="Designation"
												value={experience.jobTitle!}
											/>
											<InfoItem
												label="Start Date"
												value={format(experience.startDate!, 'PPP')}
											/>
											<InfoItem
												label="End Date"
												value={format(experience.endDate!, 'PPP')}
											/>
											<div className="col-span-2">
												<InfoItem
													label="Job Summary"
													value={experience.jobSummary!}
												/>
											</div>
										</div>
									</Card>
								)
							)}
						</div>
					</Card>

					{/* Skills and Goals */}
					<Card className="p-6">
						<div className="flex items-center space-x-2 mb-4">
							<GraduationCap className="w-5 h-5 text-primary" />
							<h2 className="text-xl font-medium">Skills & Goals</h2>
						</div>

						<div className="space-y-6">
							<div>
								<h3 className="font-medium mb-2 text-sm text-muted-foreground">
									Skills
								</h3>
								<div className="flex flex-wrap gap-2">
									{formValues.skillsAndGoals.skills.map(
										(skill: string, index: number) => (
											<span
												key={index}
												className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
											>
												{skill}
											</span>
										)
									)}
								</div>
							</div>
							<InfoItem
								label="Career Goal"
								value={formValues.skillsAndGoals.goal}
							/>
						</div>
					</Card>

					{/* Policy Agreements */}
					<Card className="p-6">
						<div className="flex items-center space-x-2 mb-4">
							<ScrollText className="w-5 h-5 text-primary" />
							<h2 className="text-xl font-medium">Policy Agreements</h2>
						</div>

						<div className="space-y-4">
							<AgreementItem
								label="Policy Agreement"
								agreed={formValues.policyAgreements.policy}
							/>
							<AgreementItem
								label="Code of Conduct"
								agreed={formValues.policyAgreements.codeOfConduct}
							/>
							<AgreementItem
								label="Non-Disclosure Agreement"
								agreed={formValues.policyAgreements.nda}
							/>
						</div>
					</Card>

					{/* Confirmation */}
					<Card className="p-6 bg-muted/50">
						<CheckboxField<EmployeeFormValue>
							name="confirmation.confirm"
							label="I confirm that all the information provided above is accurate and complete"
							required
						/>
					</Card>
				</div>
			</Card>
		</div>
	);
};

// Helper Components

/**
 * InfoItem. An information item component.
 * Responsibility: Render an information item component.
 *
 * @param icon The icon to display.
 * @param label The label of the item.
 * @param value The value of the item.
 *
 * @returns An information item component.
 */
const InfoItem = ({
	icon,
	label,
	value,
}: {
	icon?: React.ReactNode;
	label: string;
	value: string;
}) => (
	<div className="space-y-1">
		<span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
			{icon && <span className="w-4 h-4">{icon}</span>}
			{label}
		</span>
		<p className="text-sm">{value}</p>
	</div>
);

/**
 * AgreementItem. An agreement item component.
 * Responsibility: Render an agreement item component.
 *
 * @param label The label of the item.
 * @param agreed The agreed flag of the item.
 *
 * @returns An agreement item component.
 */

const AgreementItem = ({
	label,
	agreed,
}: {
	label: string;
	agreed: boolean;
}) => (
	<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
		<span className="font-medium">{label}</span>
		{agreed ? (
			<CheckCircle2 className="w-5 h-5 text-green-500" />
		) : (
			<XCircle className="w-5 h-5 text-red-500" />
		)}
	</div>
);

PreviewEmployee.displayName = 'PreviewEmployee';

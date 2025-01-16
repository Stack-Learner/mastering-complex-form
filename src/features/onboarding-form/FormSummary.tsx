import { format } from 'date-fns';
import { FC } from 'react';
import { DepartmentAndSalaryFormType } from './DepartmentAndSalaryForm';
import { EducationalFormType } from './EducationalForm';
import { PersonalInfoFormType } from './PersonalInfoForm';
import { PreferencesAndSkillsSectionType } from './PreferencesAndSkillsSection';
import { PrevNextButtons } from './PrevNextButtons';

type FormSummaryProps = {
	data: Partial<
		PersonalInfoFormType &
			DepartmentAndSalaryFormType &
			EducationalFormType &
			PreferencesAndSkillsSectionType
	>;
	onSubmit: () => void;
	onBack: () => void;
};

export const FormSummary: FC<FormSummaryProps> = ({
	data,
	onSubmit,
	onBack,
}) => {
	return (
		<div className="space-y-4">
			<h1 className="text-xl font-semibold">Summary</h1>
			<div>
				<h2 className="text-lg font-semibold">Personal Information</h2>
				<div className="space-y-2">
					<div className="grid grid-cols-6 gap-4">
						<SummarySection title="First Name" data={data.firstName} />
						<SummarySection title="Last Name" data={data.lastName} />
						<SummarySection title="Email" data={data.email} />
						<SummarySection
							title="Date of Birth"
							data={format(data.dob!, 'PPP')}
						/>
						<SummarySection title="Gender" data={data.gender} />

						{/* {Object.keys(data).map((key) => {
						if (key === 'address' && data.address) {
							return Object.keys(data.address).map((addressKey) => (
								<SummarySection
									key={addressKey}
									title={addressKey}
									data={
										data?.address?.[addressKey as keyof typeof data.address]
									}
								/>
							));
						}

						if (key === 'dob') {
							return (
								<SummarySection
									key={key}
									title="Date of Birth"
									data={format(data.dob!, 'PPP')}
								/>
							);
						}

						if (key === 'educationalBackground' && data.educationalBackground) {
							return data.educationalBackground.map((education, index) => (
								<div key={index}>
									<SummarySection
										title="Institution"
										data={education.institution}
									/>
									<SummarySection title="Degree" data={education.degree} />
									<SummarySection title="Major" data={education.major} />
									<SummarySection
										title="Start Date"
										data={format(education.startDate, 'PPP')}
									/>
									<SummarySection
										title="End Date"
										data={format(education.endDate, 'PPP')}
									/>
								</div>
							));
						}

						return (
							<SummarySection
								key={key}
								title={key}
								data={data[key as keyof typeof data]}
							/>
						);
					})} */}
						{/* <SummarySection title="First Name" data={data.firstName} />
					<SummarySection title="Last Name" data={data.lastName} />
					<SummarySection title="Email" data={data.email} />
					<SummarySection
						title="Date of Birth"
						data={format(data.dob!, 'PPP')}
					/>
					<SummarySection title="Gender" data={data.gender} /> */}
					</div>

					<div>
						<p className="font-semibold text-sm">Address</p>
						<div className="grid grid-cols-6 gap-4">
							<SummarySection title="Street" data={data.address?.street} />
							<SummarySection title="City" data={data.address?.city} />
							<SummarySection title="District" data={data.address?.district} />
							<SummarySection title="Zip Code" data={data.address?.zip} />
						</div>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-lg font-semibold">Department and Salary</h2>
				<div className="grid grid-cols-6 gap-4">
					<SummarySection title="Department" data={data.department} />
					<SummarySection title="Job Type" data={data.jobType} />
					<SummarySection title="Salary" data={data.salary} />
					<SummarySection title="Job Title" data={data.jobTitle} />
				</div>
			</div>

			<div>
				<h2 className="text-lg font-semibold">Educational Background</h2>

				<div className="space-y-2">
					{data.educationalBackground?.map((education, index) => (
						<div key={index} className="grid grid-cols-6 gap-4">
							<SummarySection
								title="Institution"
								data={education.institution}
							/>
							<SummarySection title="Degree" data={education.degree} />
							<SummarySection title="Major" data={education.major} />
							<SummarySection
								title="Start Date"
								data={format(education.startDate, 'PPP')}
							/>
							<SummarySection
								title="End Date"
								data={format(education.endDate, 'PPP')}
							/>
						</div>
					))}
				</div>
			</div>

			<div>
				<h2 className="text-lg font-semibold">Preferences and Skills</h2>
				<div className="grid grid-cols-6 gap-4">
					<SummarySection
						title="Interests"
						data={data.interests?.toString().split(',').join(', ')}
					/>
					<SummarySection
						title="Skills"
						data={data.skills?.toString().split(',').join(', ')}
					/>
					<SummarySection title="User Goals" data={data.userGoals} />
				</div>
			</div>

			<PrevNextButtons onBack={onBack} onSubmit={onSubmit} />
		</div>
	);
};

type SummarySectionProps = {
	title: string;
	data: string | string[] | number | Date | Record<string, unknown> | undefined;
};

const SummarySection: FC<SummarySectionProps> = ({ title, data }) => {
	return (
		<div className="text-sm">
			<p className="font-semibold">{title}</p>
			<p>{data?.toString()}</p>
		</div>
	);
};

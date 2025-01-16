import {
	GenericForm,
	type GenericFormRef,
} from '@/components/form/GenericForm';
import { Stepper } from '@/components/stepper';
import { useRef } from 'react';
import { EmploymentDetailsFields } from './EmploymentDetailsFields';
import { ExperiencesFields } from './ExperiencesFields';
import { PersonalDetailsFields } from './PersonalDetailsFields';
import { PolicyAgreementsFields } from './PolicyAgreementsFields';
import { PreviewEmployee } from './PreviewEmployee';
import { type EmployeeFormValue, EmployeeSchema } from './schema';
import { SkillsAndGoalsFields } from './SkillsAndGoalsFields';
import { useTriggerForm } from './useTriggerForm';

const initialValues: EmployeeFormValue = {
	personalInformation: {
		fullName: '',
		dob: new Date(),
		gender: 'male' as const,
		contactNumber: '',
		personalEmail: '',
		homeAddress: '',
		emergencyContact: {
			name: '',
			relationship: '',
			contactNumber: '',
		},
	},
	employmentDetails: {
		jobTitle: '',
		department: 'engineering',
		employeeId: '',
		joiningDate: new Date(),
		reportingManager: 'John Doe',
		jobType: 'Full-Time',
	},
	professionalExperiences: [],
	skillsAndGoals: {
		skills: [],
		goal: '',
	},
	policyAgreements: {
		policy: false,
		codeOfConduct: false,
		nda: false,
	},
	confirmation: {
		confirm: false,
	},
};

export const EmployeeOnboarding = () => {
	const formRef = useRef<GenericFormRef<EmployeeFormValue>>(null);
	const { triggerForm } = useTriggerForm<EmployeeFormValue>();
	const submitRef = useRef<HTMLButtonElement>(null);

	formRef.current?.form.handleSubmit((values) => {
		console.log('handleSubmit', values);
	});

	const clickSubmit = () => {
		submitRef.current?.click();
	};

	return (
		<GenericForm
			schema={EmployeeSchema}
			initialValues={initialValues}
			onSubmit={(values) => {
				console.log('onSubmit', values);
				alert(JSON.stringify(values));
			}}
			ref={formRef}
		>
			<Stepper onComplete={clickSubmit}>
				{/* Personal Details */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [
							'personalInformation.fullName',
							'personalInformation.dob',
							'personalInformation.contactNumber',
							'personalInformation.personalEmail',
							'personalInformation.homeAddress',
							'personalInformation.emergencyContact.name',
							'personalInformation.emergencyContact.relationship',
							'personalInformation.emergencyContact.contactNumber',
						])
					}
				>
					<PersonalDetailsFields />
				</Stepper.Step>

				{/* Employment Details */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [
							'employmentDetails.department',
							'employmentDetails.jobTitle',
							'employmentDetails.employeeId',
							'employmentDetails.joiningDate',
							'employmentDetails.reportingManager',
							'employmentDetails.jobType',
							'employmentDetails.salary',
						])
					}
				>
					<EmploymentDetailsFields />
				</Stepper.Step>

				{/* Professional Experiences */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, ['professionalExperiences'])
					}
				>
					<ExperiencesFields />
				</Stepper.Step>

				{/* Skills & Goals */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [
							'skillsAndGoals.goal',
							'skillsAndGoals.skills',
						])
					}
				>
					<SkillsAndGoalsFields />
				</Stepper.Step>

				{/* Policy Agreements */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [
							'policyAgreements.policy',
							'policyAgreements.codeOfConduct',
							'policyAgreements.nda',
						])
					}
				>
					<PolicyAgreementsFields />
				</Stepper.Step>

				{/* Preview Employee */}
				<Stepper.Step>
					<PreviewEmployee />
				</Stepper.Step>
			</Stepper>

			<button ref={submitRef} type="submit" hidden>
				Submit
			</button>
		</GenericForm>
	);
};

export default EmployeeOnboarding;

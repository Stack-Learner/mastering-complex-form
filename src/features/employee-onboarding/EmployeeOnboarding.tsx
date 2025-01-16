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
import {
	confirmationPaths,
	type EmployeeFormValue,
	EmployeeSchema,
	employmentDetailsPaths,
	experiencesPaths,
	initialValues,
	personalDetailsPaths,
	policyAgreementsPaths,
	skillsAndGoalsPaths,
} from './schema';
import { SkillsAndGoalsFields } from './SkillsAndGoalsFields';
import { useTriggerForm } from './useTriggerForm';

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
						triggerForm(formRef.current?.form, [...personalDetailsPaths])
					}
				>
					<PersonalDetailsFields />
				</Stepper.Step>

				{/* Employment Details */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...employmentDetailsPaths])
					}
				>
					<EmploymentDetailsFields />
				</Stepper.Step>

				{/* Professional Experiences */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...experiencesPaths])
					}
				>
					<ExperiencesFields />
				</Stepper.Step>

				{/* Skills & Goals */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...skillsAndGoalsPaths])
					}
				>
					<SkillsAndGoalsFields />
				</Stepper.Step>

				{/* Policy Agreements */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...policyAgreementsPaths])
					}
				>
					<PolicyAgreementsFields />
				</Stepper.Step>

				{/* Preview Employee */}
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...confirmationPaths])
					}
				>
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

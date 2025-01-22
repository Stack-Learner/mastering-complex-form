import { GenericForm, GenericFormRef } from '@/components/form/GenericForm';
import { Stepper } from '@/components/stepper';
import { useRef } from 'react';
import { EmploymentDetailsFields } from './EmploymentDetails';
import { ExperiencesFields } from './ExperienceFields';
import { useTriggerForm } from './hooks/useTriggerForm';
import { PersonalDetailsFields } from './PersonalDetailsFields';
import { PolicyAgreementsFields } from './PolicyAgreementsFields';
import { PreviewEmployee } from './preview/PreviewEmployee';
import {
	confirmationPaths,
	EmployeeFormValue,
	EmployeeSchema,
	employmentDetailsPaths,
	experiencesPaths,
	initialValues,
	personalDetailsPaths,
	policyAgreementsPaths,
	skillsAndGoalsPaths,
} from './schema';
import { SkillsAndGoalsFields } from './SkillsAndGoalsFields';

export const EmployeeOnboarding = () => {
	const formRef = useRef<GenericFormRef<EmployeeFormValue>>(null);
	const submitRef = useRef<HTMLButtonElement>(null);
	const triggerForm = useTriggerForm<EmployeeFormValue>();

	// formRef.current?.form.handleSubmit((values) => {
	// 	console.log('Form submitted', values);
	// });

	const clickSubmit = () => {
		submitRef.current?.click();
	};

	return (
		<GenericForm
			schema={EmployeeSchema}
			initialValues={initialValues}
			onSubmit={(values) => {
				console.log('Form submitted', values);
				alert(JSON.stringify(values));
			}}
			ref={formRef}
		>
			<Stepper onComplete={clickSubmit}>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...personalDetailsPaths])
					}
				>
					<PersonalDetailsFields />
				</Stepper.Step>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...employmentDetailsPaths])
					}
				>
					<EmploymentDetailsFields />
				</Stepper.Step>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...experiencesPaths])
					}
				>
					<ExperiencesFields />
				</Stepper.Step>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...skillsAndGoalsPaths])
					}
				>
					<SkillsAndGoalsFields />
				</Stepper.Step>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...policyAgreementsPaths])
					}
				>
					<PolicyAgreementsFields />
				</Stepper.Step>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [...confirmationPaths])
					}
				>
					<PreviewEmployee />
				</Stepper.Step>
			</Stepper>

			<button type="submit" hidden ref={submitRef}>
				Submit
			</button>
		</GenericForm>
	);
};

EmployeeOnboarding.displayName = 'EmployeeOnboarding';

import { useState } from 'react';
import { HorizontalTimeline } from '../ui/horizontal-timeline';
import { DepartmentAndSalaryForm } from './DepartmentAndSalaryForm';
import { EducationalForm } from './EducationalForm';
import { FormSummary } from './FormSummary';
import { PersonalInfoForm } from './PersonalInfoForm';
import { PreferencesAndSkillsSection } from './PreferencesAndSkillsSection';

export const OnboardingForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({});

	const steps = [
		<PersonalInfoForm
			onNext={(data) => {
				setFormData({ ...formData, ...data });
				setCurrentStep(1);
			}}
			formData={formData}
		/>,
		<DepartmentAndSalaryForm
			onNext={(data) => {
				setFormData({ ...formData, ...data });
				setCurrentStep(2);
			}}
			onBack={() => setCurrentStep(0)}
			formData={formData}
		/>,
		<EducationalForm
			onNext={(data) => {
				setFormData({ ...formData, ...data });
				setCurrentStep(3);
			}}
			onBack={() => setCurrentStep(1)}
			formData={formData}
		/>,
		<PreferencesAndSkillsSection
			onNext={(data) => {
				setFormData({ ...formData, ...data });
				setCurrentStep(4);
			}}
			onBack={() => setCurrentStep(2)}
			formData={formData}
		/>,
		<FormSummary
			data={formData}
			onSubmit={() => alert(JSON.stringify(formData, null, 2))}
			onBack={() => setCurrentStep(3)}
		/>,
	];

	return (
		<div className="space-y-8">
			<HorizontalTimeline
				currentIndex={currentStep}
				totalSteps={steps.length}
			/>
			{steps[currentStep]}
		</div>
	);
};

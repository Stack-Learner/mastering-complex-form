import { CheckboxGroupField } from '@/components/form/fields/CheckboxGroupField';
import { TextAreaField } from '@/components/form/fields/TextAreaField';
import { Card } from '@/components/ui/card';
import { GraduationCap, Lightbulb, Target } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { StepHeader } from './components/StepHeader';
import { EmployeeFormValue } from './schema';

/**
 * The skills and goals fields.
 * @returns The skills and goals fields.
 */

export const SkillsAndGoalsFields = () => {
	const context = useFormContext();
	const formValues = context.getValues();

	const skillsOptions = {
		engineering: [
			{ value: 'react', text: 'React' },
			{ value: 'vue', text: 'Vue' },
			{ value: 'angular', text: 'Angular' },
		],
		hr: [
			{ value: 'recruitment', text: 'Recruitment' },
			{ value: 'onboarding', text: 'Onboarding' },
			{ value: 'offboarding', text: 'Offboarding' },
		],
		marketing: [
			{ value: 'seo', text: 'SEO' },
			{ value: 'sem', text: 'SEM' },
			{ value: 'social-media', text: 'Social Media' },
		],
	};

	return (
		<Card className="p-6 space-y-6">
			{/* Header Section */}
			<StepHeader
				icon={<Target className="w-6 h-6 text-primary" />}
				title="Skills & Goals"
				description="Highlight your expertise and what you aim to achieve."
			/>

			<div className="space-y-8">
				{/* Skills Section */}
				<div className="space-y-4">
					<div className="flex items-center space-x-2">
						<GraduationCap className="w-5 h-5 text-muted-foreground" />
						<h2 className="text-lg font-medium">Professional Skills</h2>
					</div>

					<Card className="p-4 bg-muted/50">
						<CheckboxGroupField<EmployeeFormValue>
							name="skillsAndGoals.skills"
							label="Select your skills"
							options={
								skillsOptions[
									formValues.employmentDetails
										.department as EmployeeFormValue['employmentDetails']['department']
								]
							}
							className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
						/>
					</Card>
				</div>

				{/* Goals Section */}
				<div className="space-y-4">
					<div className="flex items-center space-x-2">
						<Lightbulb className="w-5 h-5 text-muted-foreground" />
						<h2 className="text-lg font-medium">Career Goals</h2>
					</div>

					<Card className="p-4 bg-muted/50">
						<TextAreaField<EmployeeFormValue>
							name="skillsAndGoals.goal"
							label="What are your professional goals?"
							placeholder="Describe your career aspirations and objectives..."
							autoResize
							className="min-h-[120px]"
						/>
					</Card>
				</div>
			</div>
		</Card>
	);
};

SkillsAndGoalsFields.displayName = 'SkillsAndGoalsFields';

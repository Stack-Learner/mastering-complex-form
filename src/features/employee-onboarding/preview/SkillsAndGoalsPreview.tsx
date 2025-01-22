import { Card } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { InfoItem } from '../components/InfoItem';
import { PreviewHeader } from '../components/PreviewHeader';
import { EmployeeFormValue } from '../schema';

export const SkillsAndGoalsPreview = () => {
	const formContext = useFormContext<EmployeeFormValue>();
	const formValues = formContext.getValues();

	return (
		<Card className="p-6">
			<PreviewHeader
				title="Skills & Goals"
				icon={<GraduationCap className="w-5 h-5 text-primary" />}
			/>

			<div className="space-y-6">
				<div>
					<h3 className="font-medium mb-2 text-sm text-muted-foreground">
						Skills
					</h3>
					<div className="flex flex-wrap gap-2">
						{formValues.skillsAndGoals.skills &&
						formValues.skillsAndGoals.skills.length > 0 ? (
							formValues.skillsAndGoals.skills
								.filter((skill) => !!skill)
								.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
									>
										{skill}
									</span>
								))
						) : (
							<span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
								No skills added
							</span>
						)}
					</div>
				</div>
				<InfoItem
					label="Career Goal"
					value={formValues.skillsAndGoals.goal ?? 'N/A'}
				/>
			</div>
		</Card>
	);
};

SkillsAndGoalsPreview.displayName = 'SkillsAndGoalsPreview';

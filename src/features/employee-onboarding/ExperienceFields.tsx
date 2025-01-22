import { FieldArray } from '@/components/form/FieldArray';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, PlusCircle } from 'lucide-react';
import { ExperienceCard } from './ExperienceCard';
import { StepHeader } from './components/StepHeader';
import { EmployeeFormValue } from './schema';

/**
 * The professional experiences fields.
 * @returns The professional experiences fields.
 */

export const ExperiencesFields = () => {
	return (
		<Card className="p-6 space-y-6">
			{/* Header Section */}
			<StepHeader
				icon={<Briefcase className="w-6 h-6 text-primary" />}
				title="Professional Experiences"
				description="Please provide your professional experiences below."
			/>

			<FieldArray<EmployeeFormValue> name="professionalExperiences">
				{({ fields, append, remove }) => (
					<div className="space-y-6">
						{/* Add Experience Button */}
						<Button
							onClick={() =>
								append({
									companyName: '',
									jobTitle: '',
									startDate: new Date(),
									endDate: new Date(),
								})
							}
							type="button"
							variant="outline"
							className="w-full border-dashed h-20 hover:border-primary hover:bg-primary/5"
						>
							<div className="flex flex-col items-center space-y-2">
								<PlusCircle className="w-6 h-6" />
								<span>Add Professional Experience</span>
							</div>
						</Button>

						{/* Experience Cards */}

						{fields.map((field, index) => (
							<ExperienceCard
								key={field.id}
								index={index}
								onRemove={() => remove(index)}
							/>
						))}
					</div>
				)}
			</FieldArray>
		</Card>
	);
};

ExperiencesFields.displayName = 'ExperiencesFields';

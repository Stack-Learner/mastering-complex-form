import { DateField } from '@/components/form/fields/DateField';
import { TextAreaField } from '@/components/form/fields/TextAreaField';
import { TextField } from '@/components/form/fields/TextField';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building, Trash2 } from 'lucide-react';
import { EmployeeFormValue } from '../schema';

interface ExperienceCardProps {
	index: number;
	onRemove: () => void;
}

export const ExperienceCard = ({ index, onRemove }: ExperienceCardProps) => {
	return (
		<Card className="p-6 space-y-4 shadow-sm border-l-4 border-l-primary">
			<div className="flex items-center">
				<h2 className="text-lg font-medium flex items-center gap-2">
					<Building className="w-5 h-5 text-muted-foreground" />
					Experience {index + 1}
				</h2>
			</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
				<TextField<EmployeeFormValue>
					name={`professionalExperiences.${index}.companyName`}
					label="Company Name"
					placeholder="Enter company name"
				/>
				<TextField<EmployeeFormValue>
					name={`professionalExperiences.${index}.jobTitle`}
					label="Job Title"
					placeholder="Enter job title"
				/>
				<DateField<EmployeeFormValue>
					name={`professionalExperiences.${index}.startDate`}
					label="Start Date"
				/>
				<DateField<EmployeeFormValue>
					name={`professionalExperiences.${index}.endDate`}
					label="End Date"
				/>
				<div className="col-span-full">
					<TextAreaField<EmployeeFormValue>
						name={`professionalExperiences.${index}.jobSummary`}
						label="Job Summary"
						autoResize
						placeholder="Enter job summary"
					/>
				</div>
			</div>

			<div className="flex items-center justify-end">
				<Button
					size="sm"
					variant="ghost"
					onClick={onRemove}
					type="button"
					className="hover:text-red-500 transition-colors"
				>
					<Trash2 size={18} className="mr-2" />
					Remove Experience
				</Button>
			</div>
		</Card>
	);
};

ExperienceCard.displayName = 'ExperienceCard';

import { FieldArray } from '@/components/form/FieldArray';
import { DateField } from '@/components/form/fields/DateField';
import { TextAreaField } from '@/components/form/fields/TextAreaField';
import { TextField } from '@/components/form/fields/TextField';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, Building, PlusCircle, Trash2 } from 'lucide-react';
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
							<Card
								className="p-6 space-y-4 shadow-sm border-l-4 border-l-primary"
								key={field.id}
							>
								<div className="flex items-center justify-between">
									<h2 className="text-lg font-medium flex items-center gap-2">
										<Building className="w-5 h-5 text-muted-foreground" />
										Experience {index + 1}
									</h2>
									<Button
										size="icon"
										variant="ghost"
										onClick={() => remove(index)}
										className="hover:text-red-500 transition-colors"
									>
										<Trash2 size={18} />
									</Button>
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
							</Card>
						))}
					</div>
				)}
			</FieldArray>
		</Card>
	);
};

ExperiencesFields.displayName = 'ExperiencesFields';

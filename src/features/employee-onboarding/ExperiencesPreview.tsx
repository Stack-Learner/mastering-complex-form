import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Building2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { InfoItem } from './components/InfoItem';
import { PreviewHeader } from './components/PreviewHeader';
import { EmployeeFormValue } from './schema';

/**
 * ExperiencesPreview. A experiences preview component.
 * Responsibility: Render a experiences preview component.
 *
 * @returns A experiences preview component.
 */

export const ExperiencesPreview = () => {
	const formContext = useFormContext<EmployeeFormValue>();
	const formValues = formContext.getValues();

	return (
		<Card className="p-6">
			<PreviewHeader
				title="Professional Experiences"
				icon={<Building2 className="w-5 h-5 text-primary" />}
			/>

			<div className="space-y-4">
				{formValues?.professionalExperiences &&
				formValues.professionalExperiences.length > 0 ? (
					formValues.professionalExperiences.map((experience, index) => (
						<Card key={index} className="p-4 bg-muted/50">
							<h3 className="font-medium mb-3">Experience {index + 1}</h3>
							<div className="grid md:grid-cols-2 gap-4">
								<InfoItem label="Company" value={experience.companyName} />
								<InfoItem label="Designation" value={experience.jobTitle} />
								<InfoItem
									label="Start Date"
									value={format(experience.startDate, 'PPP')}
								/>
								<InfoItem
									label="End Date"
									value={format(experience.endDate, 'PPP')}
								/>
								<div className="col-span-2">
									<InfoItem
										label="Job Summary"
										value={experience.jobSummary ?? 'N/A'}
									/>
								</div>
							</div>
						</Card>
					))
				) : (
					<p className="text-sm text-muted-foreground">
						No professional experiences to display.
					</p>
				)}
			</div>
		</Card>
	);
};

ExperiencesPreview.displayName = 'ExperiencesPreview';

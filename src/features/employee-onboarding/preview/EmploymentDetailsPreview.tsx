import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import {
	Briefcase,
	Building2,
	Calendar,
	Clock,
	DollarSign,
	User,
} from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { InfoItem } from '../components/InfoItem';
import { PreviewHeader } from '../components/PreviewHeader';
import { EmployeeFormValue } from '../schema';

/**
 * EmploymentDetailsPreview. An employment details preview component.
 * Responsibility: Render an employment details preview component.
 *
 * @returns An employment details preview component.
 */

export const EmploymentDetailsPreview = () => {
	const formContext = useFormContext<EmployeeFormValue>();
	const formValues = formContext.getValues();

	return (
		<Card className="p-6">
			<PreviewHeader
				title="Employment Details"
				icon={<Briefcase className="w-5 h-5 text-primary" />}
			/>

			<div className="grid md:grid-cols-2 gap-6">
				<InfoItem
					icon={<Briefcase size={16} />}
					label="Job Title"
					value={formValues.employmentDetails.jobTitle}
				/>
				<InfoItem
					icon={<Building2 size={16} />}
					label="Employee ID"
					value={formValues.employmentDetails.employeeId}
				/>
				<InfoItem
					icon={<Building2 size={16} />}
					label="Department"
					value={formValues.employmentDetails.department}
				/>
				<InfoItem
					icon={<Calendar size={16} />}
					label="Joining Date"
					value={format(formValues.employmentDetails.joiningDate, 'PPP')}
				/>
				<InfoItem
					icon={<User size={16} />}
					label="Reporting Manager"
					value={formValues.employmentDetails.reportingManager}
				/>
				<InfoItem
					icon={<Clock size={16} />}
					label="Job Type"
					value={formValues.employmentDetails.jobType}
				/>
				<InfoItem
					icon={<DollarSign size={16} />}
					label="Salary"
					value={formValues.employmentDetails.salary?.toString() ?? 'N/A'}
				/>
			</div>
		</Card>
	);
};

EmploymentDetailsPreview.displayName = 'EmploymentDetailsPreview';

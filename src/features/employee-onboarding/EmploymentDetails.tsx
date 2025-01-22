import { DateField } from '@/components/form/fields/DateField';
import { RadioGroupField } from '@/components/form/fields/RadioGroupField';
import { SelectField } from '@/components/form/fields/SelectField';
import { TextField } from '@/components/form/fields/TextField';
import { Card } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { StepHeader } from './components/StepHeader';
import { EmployeeFormValue } from './schema';

const departmentOptions = [
	{ value: 'engineering', text: 'Engineering' },
	{ value: 'hr', text: 'HR' },
	{ value: 'marketing', text: 'Marketing' },
];

const managerOptions = [
	{ value: 'John Doe', text: 'John Doe' },
	{ value: 'Jane Doe', text: 'Jane Doe' },
	{ value: 'Michael Doe', text: 'Michael Doe' },
];

const jobTypeOptions = [
	{ value: 'Full-Time', text: 'Full Time' },
	{ value: 'Part-Time', text: 'Part Time' },
	{ value: 'Contract', text: 'Contract' },
];

/**
 * The employment details fields.
 * @returns The employment details fields.
 */

export const EmploymentDetailsFields = () => {
	const { watch } = useFormContext<EmployeeFormValue>();
	const jobType = watch('employmentDetails.jobType');

	return (
		<Card className="p-6 space-y-6">
			{/* Header */}
			<StepHeader
				icon={<Briefcase className="w-6 h-6 text-primary mt-0.5" />}
				title="Employment Information"
				description="Please provide your employment information below."
			/>

			<div className="space-y-6">
				{/* Basic Employment Info */}
				<div className="space-y-4">
					<h2 className="text-lg font-medium">Basic Information</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
						<TextField<EmployeeFormValue>
							name="employmentDetails.employeeId"
							label="Employee ID"
							placeholder="Enter employee ID"
							required
						/>
						<DateField<EmployeeFormValue>
							name="employmentDetails.joiningDate"
							label="Joining Date"
							required
						/>
					</div>
				</div>

				{/* Role & Reporting */}
				<div className="space-y-4 pt-4 border-t">
					<h2 className="text-lg font-medium">Role & Department</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
						<TextField<EmployeeFormValue>
							name="employmentDetails.jobTitle"
							label="Job Title"
							placeholder="Enter job title"
							required
						/>
						<SelectField<EmployeeFormValue>
							name="employmentDetails.department"
							label="Department"
							options={departmentOptions}
							placeholder="Select a department"
							required
						/>
						<SelectField<EmployeeFormValue>
							name="employmentDetails.reportingManager"
							label="Reporting Manager"
							options={managerOptions}
							placeholder="Select a manager"
							required
						/>
					</div>
				</div>

				{/* Employment Terms */}
				<div className="space-y-4 pt-4 border-t">
					<h2 className="text-lg font-medium">Employment Terms</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
						<RadioGroupField<EmployeeFormValue>
							name="employmentDetails.jobType"
							label="Job Type"
							options={jobTypeOptions}
							className="col-span-full"
							required
						/>
						<TextField<EmployeeFormValue>
							name="employmentDetails.salary"
							label="Salary"
							type="number"
							placeholder="Enter salary"
							required={jobType === 'Full-Time'}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};

EmploymentDetailsFields.displayName = 'EmploymentDetailsFields';

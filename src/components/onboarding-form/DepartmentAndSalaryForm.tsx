import { FC, useRef } from 'react';
import { z } from 'zod';
import { GenericForm, GenericFormRef } from '../form/GenericForm';
import { RadioGroupField } from '../form/fields/RadioGroupField';
import { SelectField } from '../form/fields/SelectField';
import { TextField } from '../form/fields/TextField';
import { PrevNextButtons } from './PrevNextButtons';

const DepartmentAndSalaryFormSchema1 = z.object({
	department: z.enum(['engineering', 'marketing', 'sales', 'hr', 'finance'], {
		errorMap: () => ({ message: 'Department is required' }),
	}),
	jobTitle: z.string().min(1, 'Job Title is required'),
});

const DepartmentAndSalaryFormSchema2 = z
	.object({
		jobType: z.enum(['Full-Time', 'Part-Time', 'Contract'], {
			errorMap: () => ({ message: 'Job Type is required' }),
		}),
		salary: z
			.string()
			.optional() // Allow empty strings
			.refine((val) => val === undefined || val === '' || !isNaN(Number(val)), {
				message: 'Salary must be a valid number',
			})
			.transform((val) =>
				val === undefined || val === '' ? undefined : Number(val)
			), // Transform to number if not empty
	})
	.superRefine((val, ctx) => {
		if (
			val.jobType === 'Full-Time' &&
			(val.salary === undefined || val.salary <= 0)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Salary is required for Full-Time jobs',
				path: ['salary'],
			});
		}
		return true;
	});

const DepartmentAndSalaryFormSchema = z.intersection(
	DepartmentAndSalaryFormSchema1,
	DepartmentAndSalaryFormSchema2
);

export type DepartmentAndSalaryFormType = z.infer<
	typeof DepartmentAndSalaryFormSchema
>;

type Props = {
	onNext: (data: DepartmentAndSalaryFormType) => void;
	onBack: () => void;
	formData: Partial<DepartmentAndSalaryFormType>;
};

const departmentOptions = [
	{ value: 'engineering', text: 'Engineering' },
	{ value: 'marketing', text: 'Marketing' },
	{ value: 'sales', text: 'Sales' },
	{ value: 'hr', text: 'HR' },
	{ value: 'finance', text: 'Finance' },
];

const jobTypeOptions = [
	{ value: 'Full-Time', text: 'Full Time' },
	{ value: 'Part-Time', text: 'Part Time' },
	{ value: 'Contract', text: 'Contract' },
];

export const DepartmentAndSalaryForm: FC<Props> = ({
	onNext,
	onBack,
	formData,
}) => {
	const formRef = useRef<GenericFormRef<DepartmentAndSalaryFormType>>(null);

	return (
		<div className="space-y-4">
			<h1 className="text-xl font-semibold">
				Step 2: Department and Salary Information
			</h1>

			<GenericForm
				schema={DepartmentAndSalaryFormSchema}
				initialValues={formData}
				onSubmit={(data) => onNext(data as DepartmentAndSalaryFormType)}
				ref={formRef}
			>
				<div className="grid grid-cols-2 gap-4">
					<SelectField<DepartmentAndSalaryFormType>
						name="department"
						options={departmentOptions}
						label="Department"
					/>
					<TextField<DepartmentAndSalaryFormType>
						name="jobTitle"
						label="Job Title"
						required
					/>
					<RadioGroupField<DepartmentAndSalaryFormType>
						name="jobType"
						options={jobTypeOptions}
						label="Job Type"
						rowGroup
					/>
					<TextField<DepartmentAndSalaryFormType>
						name="salary"
						label="Salary"
						required
						type="number"
					/>
				</div>

				<PrevNextButtons onBack={onBack} />
			</GenericForm>
		</div>
	);
};

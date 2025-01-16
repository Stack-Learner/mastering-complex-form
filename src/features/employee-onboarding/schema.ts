import { z } from 'zod';

const EmploymentDetails1 = z.object({
	jobTitle: z.string().min(1, 'Job title is required'),
	department: z.enum(['engineering', 'hr', 'marketing']),
	employeeId: z.string().min(1, 'Employee ID is required'),
	joiningDate: z.date({
		message: 'Please enter a valid date',
	}),
	reportingManager: z.enum(['John Doe', 'Jane Doe', 'Michael Doe']),
});

const EmploymentDetails2 = z
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

export const EmployeeSchema = z.object({
	personalInformation: z.object({
		fullName: z.string().min(1, 'Full name is required'),
		dob: z.date({
			message: 'Please enter a valid date',
		}),
		gender: z.enum(['male', 'female', 'other']),
		contactNumber: z.string().min(1, 'Contact number is required'),
		personalEmail: z.string().email('Please enter a valid email'),
		homeAddress: z.string().min(1, 'Home address is required'),
		emergencyContact: z.object({
			name: z.string().min(1, 'Emergency contact name is required'),
			relationship: z.string().min(1, 'Relationship is required'),
			contactNumber: z.string().min(1, 'Contact number is required'),
		}),
	}),
	employmentDetails: z.intersection(EmploymentDetails1, EmploymentDetails2),
	professionalExperiences: z.array(
		z.object({
			companyName: z.string().optional(),
			jobTitle: z.string().optional(),
			startDate: z.date().optional(),
			endDate: z.date().optional(),
			jobSummary: z.string().optional(),
		})
	),
	skillsAndGoals: z.object({
		skills: z.array(z.string().optional()).optional(),
		goal: z.string().optional(),
	}),
	policyAgreements: z.object({
		policy: z.boolean().refine((val) => val === true, {
			message: 'Please agree to the policy',
		}),
		codeOfConduct: z.boolean().refine((val) => val === true, {
			message: 'Please agree to the code of conduct',
		}),
		nda: z.boolean().refine((val) => val === true, {
			message: 'Please agree to the NDA',
		}),
	}),
	confirmation: z.object({
		confirm: z.boolean().refine((val) => val === true, {
			message: 'Please confirm the details',
		}),
	}),
});

export type EmployeeFormValue = z.infer<typeof EmployeeSchema>;

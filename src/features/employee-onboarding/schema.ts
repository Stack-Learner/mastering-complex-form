import { z } from 'zod';

// Add phone validation regex pattern
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

// Create phone schema
const phoneSchema = z.string().min(1).regex(phoneRegex, {
	message: 'Please enter a valid phone number',
});

// Mock username check function
export const checkUsernameUnique = async (username: string) => {
	const takenUsernames = ['admin', 'root', 'test'];
	return !takenUsernames.includes(username.toLowerCase());
};

// Mock email check function
export const checkEmailUnique = async (email: string) => {
	const takenEmails = [
		'admin@example.com',
		'root@example.com',
		'test@example.com',
	];
	return !takenEmails.includes(email.toLowerCase());
};

const passwordRequirements = {
	minLength: 8,
	hasUpperCase: /[A-Z]/,
	hasLowerCase: /[a-z]/,
	hasNumber: /[0-9]/,
	hasSpecialChar: /[^A-Za-z0-9]/,
};

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
		firstName: z.string().min(1, 'First name is required'),
		lastName: z.string().min(1, 'Last name is required'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'Username cannot exceed 20 characters')
			.regex(
				/^[a-zA-Z0-9._-]+$/,
				'Username can only contain letters, numbers, dots, dashes and underscores'
			)
			.refine(
				async (username) => await checkUsernameUnique(username),
				'Username is already taken'
			),
		dob: z.date({
			message: 'Please enter a valid date',
		}),
		profileImage: z.string().url().optional(),
		password: z
			.string()
			.min(
				passwordRequirements.minLength,
				`Password must be at least ${passwordRequirements.minLength} characters`
			)
			.regex(
				passwordRequirements.hasUpperCase,
				'Password must contain at least one uppercase letter'
			)
			.regex(
				passwordRequirements.hasLowerCase,
				'Password must contain at least one lowercase letter'
			)
			.regex(
				passwordRequirements.hasNumber,
				'Password must contain at least one number'
			)
			.regex(
				passwordRequirements.hasSpecialChar,
				'Password must contain at least one special character'
			),
		gender: z.enum(['male', 'female', 'other']),
		contactNumber: phoneSchema,
		personalEmail: z
			.string()
			.email('Invalid email format')
			.refine(
				async (email) => await checkEmailUnique(email),
				'Email is already taken'
			),
		homeAddress: z.string().min(1, 'Home address is required'),
		emergencyContact: z.object({
			name: z.string().min(1, 'Emergency contact name is required'),
			relationship: z.string().min(1, 'Relationship is required'),
			contactNumber: phoneSchema,
		}),
	}),
	employmentDetails: z.intersection(EmploymentDetails1, EmploymentDetails2),
	professionalExperiences: z
		.array(
			z.object({
				companyName: z.string().min(1, 'Company name is required'),
				jobTitle: z.string().min(1, 'Job title is required'),
				startDate: z.date({
					message: 'Please enter a valid date',
				}),
				endDate: z.date({
					message: 'Please enter a valid date',
				}),
				jobSummary: z.string().optional(),
			})
		)
		.optional(),
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

export const initialValues: EmployeeFormValue = {
	personalInformation: {
		firstName: 'Aditya',
		lastName: 'Chakraborty',
		username: 'aditya',
		password: 'Pass@1234',
		dob: new Date(),
		gender: 'male' as const,
		contactNumber: '01712345678',
		personalEmail: 'aditya@email.com',
		homeAddress: 'Chawkbazar, Chattogram',
		emergencyContact: {
			name: 'Arpita Chakraborty',
			relationship: 'Spouse',
			contactNumber: '01787654321',
		},
	},
	employmentDetails: {
		jobTitle: 'Software Engineer',
		department: 'engineering',
		employeeId: '723763',
		joiningDate: new Date(),
		reportingManager: 'John Doe',
		jobType: 'Full-Time',
	},
	professionalExperiences: [],
	skillsAndGoals: {},
	policyAgreements: {
		policy: false,
		codeOfConduct: false,
		nda: false,
	},
	confirmation: {
		confirm: false,
	},
};

export const personalDetailsPaths = [
	'personalInformation.firstName',
	'personalInformation.lastName',
	'personalInformation.username',
	'personalInformation.profileImage',
	'personalInformation.password',
	'personalInformation.dob',
	'personalInformation.contactNumber',
	'personalInformation.personalEmail',
	'personalInformation.homeAddress',
	'personalInformation.emergencyContact.name',
	'personalInformation.emergencyContact.relationship',
	'personalInformation.emergencyContact.contactNumber',
] as const;

export const employmentDetailsPaths = [
	'employmentDetails.department',
	'employmentDetails.jobTitle',
	'employmentDetails.employeeId',
	'employmentDetails.joiningDate',
	'employmentDetails.reportingManager',
	'employmentDetails.jobType',
	'employmentDetails.salary',
] as const;

export const experiencesPaths = ['professionalExperiences'] as const;

export const skillsAndGoalsPaths = [
	'skillsAndGoals.skills',
	'skillsAndGoals.goal',
] as const;

export const policyAgreementsPaths = [
	'policyAgreements.policy',
	'policyAgreements.codeOfConduct',
	'policyAgreements.nda',
] as const;

export const confirmationPaths = ['confirmation.confirm'] as const;

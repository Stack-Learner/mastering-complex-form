import { z } from 'zod';

export const EmployeeSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	designation: z.string(),
	contact: z.object({
		phone: z.string().min(1, { message: 'Phone number is required' }),
		emergencyContact: z
			.string()
			.min(1, { message: 'Emergency contact is required' }),
		email: z.string().email({ message: 'Invalid email address' }),
	}),
});

export type EmployeeFormValue = z.infer<typeof EmployeeSchema>;

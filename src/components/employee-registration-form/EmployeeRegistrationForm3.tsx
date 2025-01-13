import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

// Define the schema using Zod
const FormSchema1 = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	secondaryEmail: z.string().email().optional(),
	dob: z.date({
		required_error: 'A date of birth is required.',
	}),
	gender: z.enum(['male', 'female', 'other'], {
		errorMap: () => ({ message: 'Gender is required' }),
	}),
	address: z.object({
		street: z.string().min(1, 'Street is required'),
		city: z.string().min(1, 'City is required'),
		state: z.string().min(1, 'State is required'),
		zip: z
			.string()
			.min(4, 'Zip Code must be at least 4 digits')
			.max(10, 'Zip Code must be at most 10 digits'),
	}),
	jobTitle: z.string().min(1, 'Job Title is required'),
	department: z.enum(['engineering', 'marketing', 'sales', 'hr', 'finance'], {
		errorMap: () => ({ message: 'Department is required' }),
	}),
	workHistories: z
		.array(
			z.object({
				companyName: z.string().optional(),
				jobTitle: z.string().optional(),
				startDate: z.date().optional(),
				endDate: z.date().optional(),
			})
		)
		.optional(),
	terms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions',
	}),
});

const FormSchema2 = z
	.object({
		jobType: z.enum(['Full-Time', 'Part-Time', 'Contract'], {
			errorMap: () => ({ message: 'Job Type is required' }),
		}),
		salary: z.coerce.number(),
	})
	.superRefine((val, ctx) => {
		if (val.jobType === 'Full-Time' && val.salary <= 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Salary is required for Full-Time jobs',
				path: ['salary'],
			});
		}
		return true;
	});

const FormSchema = z.intersection(FormSchema1, FormSchema2);

type FormType = z.infer<typeof FormSchema>;

const EmployeeRegistrationForm3 = () => {
	const form = useForm<FormType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: 'Aditya Chakraborty',
			email: 'aditya@gmail.com',
			gender: 'male',
			address: {
				street: 'Chawkbazar',
				city: 'Chattogram',
				state: 'Chattogram',
				zip: '4203',
			},
			jobTitle: 'Software Engineering',
			department: 'engineering',
			salary: 20000,
			terms: false,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'workHistories',
	});

	const onSubmit = (data: FormType) => {
		console.log(data);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="secondaryEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Secondary Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dob"
						render={({ field }) => (
							<FormItem>
								<div className="space-y-2">
									<FormLabel>Date of Birth</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Gender</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-row"
								>
									{['Male', 'Female', 'Other'].map((gender) => (
										<FormItem
											key={gender}
											className="flex items-center space-x-3 space-y-0"
										>
											<FormControl>
												<RadioGroupItem value={gender.toLowerCase()} />
											</FormControl>
											<FormLabel className="font-normal">{gender}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="address.street"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address.city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="address.state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address.zip"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Zip</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="jobTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Job Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="department"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Department</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a department" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'].map(
											(department) => (
												<SelectItem
													key={department}
													value={department.toLowerCase()}
												>
													{department}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="jobType"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Job Type</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-row"
									>
										{['Full-Time', 'Part-Time', 'Contract'].map((type) => (
											<FormItem
												key={type}
												className="flex items-center space-x-3 space-y-0"
											>
												<FormControl>
													<RadioGroupItem value={type} />
												</FormControl>
												<FormLabel className="font-normal">{type}</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="salary"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Salary</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="space-y-8">
					{fields.map((history, index) => (
						<div key={history.id} className="space-y-8">
							<div className="grid grid-cols-2 gap-8">
								<FormField
									control={form.control}
									name={`workHistories.${index}.companyName`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`workHistories.${index}.jobTitle`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Job Title</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-2 gap-8">
								<FormField
									control={form.control}
									name={`workHistories.${index}.startDate`}
									render={({ field }) => (
										<FormItem>
											<div className="space-y-2">
												<FormLabel>Start Date</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={'outline'}
																className={cn(
																	'w-full pl-3 text-left font-normal',
																	!field.value && 'text-muted-foreground'
																)}
															>
																{field.value ? (
																	format(field.value, 'PPP')
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																date > new Date() ||
																date < new Date('1900-01-01')
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`workHistories.${index}.endDate`}
									render={({ field }) => (
										<FormItem>
											<div className="space-y-2">
												<FormLabel>End Date</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={'outline'}
																className={cn(
																	'w-full pl-3 text-left font-normal',
																	!field.value && 'text-muted-foreground'
																)}
															>
																{field.value ? (
																	format(field.value, 'PPP')
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																date > new Date() ||
																date < new Date('1900-01-01')
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								variant="outline"
								onClick={() => remove(index)}
								className="justify-center"
							>
								Remove
							</Button>
						</div>
					))}

					<Button
						variant="outline"
						onClick={() =>
							append({
								companyName: '',
								jobTitle: '',
								startDate: new Date(),
								endDate: new Date(),
							})
						}
						className="justify-center"
						type="button"
					>
						Add Work History
					</Button>
				</div>

				<FormField
					control={form.control}
					name="terms"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>
								I agree to the{' '}
								<a href="#" className="text-primary">
									terms and conditions
								</a>
							</FormLabel>
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default EmployeeRegistrationForm3;

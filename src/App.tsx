import { useRef } from 'react';
import { z } from 'zod';
import { ImageUploadField } from './components/form/fields/ImageUploadField';
import { UniqueTextField } from './components/form/fields/UniqueTextField';
import { GenericForm, GenericFormRef } from './components/form/GenericForm';
import { Stepper } from './components/stepper';
import { Button } from './components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './components/ui/dialog';
import { EmployeeOnboarding } from './features/employee-onboarding';

const MAX_FILE_SIZE = 8000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];
// Mock username check function
const checkUsernameUnique = async (username: string) => {
	const takenUsernames = ['admin', 'root', 'test'];
	return !takenUsernames.includes(username.toLowerCase());
};

const FormSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username cannot exceed 20 characters')
		.regex(
			/^[a-zA-Z0-9._-]+$/,
			'Username can only contain letters, numbers, dots, dashes and underscores'
		)
		.refine(
			(username) =>
				!['admin', 'root', 'system'].includes(username.toLowerCase()),
			'This username is reserved'
		)
		.refine(
			async (username) => await checkUsernameUnique(username),
			'Username is already taken'
		),
	profileImage: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported'
		)
		.optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const App = () => {
	const formRef = useRef<GenericFormRef<FormValues>>(null);
	return (
		<div className="bg-zinc-100 min-h-screen">
			<nav className="dark bg-background p-4">
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-2xl font-bold text-white">MY HR</h1>
					<Button>My Profile</Button>
				</div>
			</nav>
			<div className="container mx-auto py-4">
				<h1 className="text-2xl font-bold">Employee Onboarding</h1>
				<p>
					Welcome to the employee onboarding process. Please fill in the
					following information to get started.
				</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="mt-4">New Employee</Button>
					</DialogTrigger>
					<DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>New Employee</DialogTitle>
						</DialogHeader>
						<EmployeeOnboarding />
					</DialogContent>
				</Dialog>
			</div>

			<Stepper onComplete={() => console.log('Completed')}>
				<Stepper.Step
				// validate={() => {
				// 	return {
				// 		hasError: true,
				// 		message: 'Error message',
				// 	};
				// }}
				>
					<h1>Step 1</h1>
					<p>Step 1 Content</p>
				</Stepper.Step>
				<Stepper.Step>
					<h1>Step 2</h1>
					<p>Step 2 Content</p>
				</Stepper.Step>
				<Stepper.Step>
					<h1>Step 3</h1>
					<p>Step 3 Content</p>
				</Stepper.Step>
			</Stepper>

			<div className="max-w-xl mx-auto">
				<GenericForm
					schema={FormSchema}
					initialValues={{ profileImage: '' }}
					onSubmit={(values) => {
						console.log('onSubmit', values);
						alert('Form Submitted');
					}}
					ref={formRef}
				>
					<UniqueTextField<FormValues>
						name="username"
						label="Username"
						placeholder="Enter username"
						required
						checkFunction={checkUsernameUnique}
					/>
					<ImageUploadField<FormValues>
						name="profileImage"
						label="Profile Image"
					/>

					<Button type="submit">Submit</Button>
				</GenericForm>
			</div>
		</div>
	);
};

export default App;

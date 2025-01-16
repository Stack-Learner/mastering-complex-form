import { TextField } from '@/components/form/fields/TextField';
import {
	GenericForm,
	type GenericFormRef,
} from '@/components/form/GenericForm';
import { Stepper } from '@/components/stepper';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { type EmployeeFormValue, EmployeeSchema } from './schema';
import { useTriggerForm } from './useTriggerForm';
import { ResetButton } from '@/components/form/fields/ResetButton';

const initialValues = {
	firstName: 'John',
	lastName: 'Doe',
	designation: 'Software Engineer',
	contact: {
		phone: '1234567890',
		emergencyContact: '1234567890',
		email: 'john.doe@example.com',
	},
};

export const EmployeeOnboarding = () => {
	const formRef = useRef<GenericFormRef<EmployeeFormValue>>(null);
	const { triggerForm } = useTriggerForm<EmployeeFormValue>();
	const submitRef = useRef<HTMLButtonElement>(null);

	formRef.current?.form.handleSubmit((values) => {
		console.log('handleSubmit', values);
	});

	const clickSubmit = () => {
		submitRef.current?.click();
	};

	return (
		<GenericForm
			schema={EmployeeSchema}
			initialValues={initialValues}
			onSubmit={(values) => {
				console.log('onSubmit', values);
				alert(JSON.stringify(values));
			}}
			ref={formRef}
		>
			<Stepper onComplete={clickSubmit}>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [
							'firstName',
							'lastName',
							'designation',
						])
					}
				>
					<div>
						<h1 className='text-2xl font-bold'>Personal Information</h1>
						<p className='text-sm text-muted-foreground'>
							Please fill in your personal information to get started.
						</p>
					</div>
					<div className='space-y-4'>
						<div className='flex gap-4'>
							<div className='flex-1'>
								<TextField<EmployeeFormValue>
									name='firstName'
									label='First Name'
								/>
							</div>
							<div className='flex-1'>
								<TextField<EmployeeFormValue>
									name='lastName'
									label='Last Name'
								/>
							</div>
						</div>
						<TextField<EmployeeFormValue>
							name='designation'
							label='Designation'
						/>
					</div>
				</Stepper.Step>
				<Stepper.Step
					validate={() =>
						triggerForm(formRef.current?.form, [
							'contact.phone',
							'contact.email',
							'contact.emergencyContact',
						])
					}
				>
					<div>
						<h1 className='text-2xl font-bold'>Contact Information</h1>
						<p className='text-sm text-muted-foreground'>
							Please fill in your contact information to get started.
						</p>
					</div>
					<div>
						<TextField<EmployeeFormValue>
							name='contact.phone'
							label='Phone Number'
						/>
						<TextField<EmployeeFormValue>
							name='contact.emergencyContact'
							label='Emergency Contact'
						/>
						<TextField<EmployeeFormValue> name='contact.email' label='Email' />
					</div>
				</Stepper.Step>
				<Stepper.Step>
					<PreviewEmployee />
				</Stepper.Step>
			</Stepper>
			<button ref={submitRef} type='submit' hidden>
				Submit
			</button>
		</GenericForm>
	);
};

export default EmployeeOnboarding;

const PreviewEmployee = () => {
	const context = useFormContext();
	const formValues = context.getValues();

	return (
		<div>
			<div>
				<h1 className='text-2xl font-bold'>Preview Employee</h1>
				<p className='text-sm text-muted-foreground'>
					Please review the employee information to ensure it is correct.
				</p>
			</div>
			<div>
				<div>
					<h2 className='text-lg font-bold'>Personal Information</h2>
					<p>
						{formValues?.firstName} {formValues?.lastName}
					</p>
					<p>{formValues?.designation}</p>
				</div>
				<div>
					<h2 className='text-lg font-bold'>Contact Information</h2>
					<p>{formValues?.contact.phone}</p>
					<p>{formValues?.contact.emergencyContact}</p>
					<p>{formValues?.contact.email}</p>
				</div>
			</div>
			<div className='flex justify-end'>
				<ResetButton />
			</div>
		</div>
	);
};

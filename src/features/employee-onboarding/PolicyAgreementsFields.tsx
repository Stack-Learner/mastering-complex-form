import { CheckboxField } from '@/components/form/fields/CheckboxField';
import { Card } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';
import { StepHeader } from './components/StepHeader';
import { EmployeeFormValue } from './schema';

/**
 * The policy agreements fields.
 * @returns The policy agreements fields.
 */

export const PolicyAgreementsFields = () => {
	return (
		<Card className="p-6 space-y-6">
			{/* Header */}
			<StepHeader
				icon={<ScrollText className="w-6 h-6 text-primary" />}
				title="Policy Agreements"
				description="Please review and accept the following company policies"
			/>

			{/* Agreements Section */}
			<div className="space-y-6">
				<CheckboxField<EmployeeFormValue>
					name="policyAgreements.policy"
					label="I have read and agree to comply with all company policies and procedures"
					required
				/>

				<CheckboxField<EmployeeFormValue>
					name="policyAgreements.codeOfConduct"
					label="I agree to adhere to the company's code of conduct and ethical guidelines"
					required
				/>

				<CheckboxField<EmployeeFormValue>
					name="policyAgreements.nda"
					label="I understand and agree to protect confidential company information"
					required
				/>
			</div>
		</Card>
	);
};

PolicyAgreementsFields.displayName = 'PolicyAgreementsFields';

import { Card } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { AgreementItem } from './components/AgreementItem';
import { PreviewHeader } from './components/PreviewHeader';
import { EmployeeFormValue } from './schema';

export const PolicyAgreementsPreview = () => {
	const formContext = useFormContext<EmployeeFormValue>();
	const formValues = formContext.getValues();

	return (
		<Card className="p-6">
			<PreviewHeader
				icon={<ScrollText className="w-5 h-5 text-primary" />}
				title="Policy Agreements"
			/>

			<div className="space-y-4">
				<AgreementItem
					label="Policy Agreement"
					agreed={formValues.policyAgreements.policy}
				/>
				<AgreementItem
					label="Code of Conduct"
					agreed={formValues.policyAgreements.codeOfConduct}
				/>
				<AgreementItem
					label="Non-Disclosure Agreement"
					agreed={formValues.policyAgreements.nda}
				/>
			</div>
		</Card>
	);
};

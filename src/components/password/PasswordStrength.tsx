import { cn } from '@/lib/utils';
import { getPasswordStrengthColor } from '@/lib/utils/getPasswordStrengthColor';
import { FC } from 'react';

type Props = {
	strength: number;
};

/**
 * Password strength component
 *
 * @param strength - The strength of the password
 *
 * @returns {JSX.Element} - The password strength component
 */

export const PasswordStrength: FC<Props> = ({ strength }) => {
	return (
		<div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
			<div
				className={cn(
					'h-full transition-all duration-300',
					getPasswordStrengthColor(strength)
				)}
				style={{ width: `${strength}%` }}
			/>
		</div>
	);
};

PasswordStrength.displayName = 'PasswordStrength';

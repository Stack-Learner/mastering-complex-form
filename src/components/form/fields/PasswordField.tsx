import { PasswordMessage } from '@/components/password/PasswordMessage';
import { PasswordStrength } from '@/components/password/PasswordStrength';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';

type PasswordFieldProps<T extends FieldValues> = {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	required?: boolean;
	className?: string;
	icon?: boolean;
	showIcon?: React.ReactNode;
	hideIcon?: React.ReactNode;
	showStrength?: boolean;
	showMessage?: boolean;
};

type Requirement = {
	regex: RegExp;
	label: string;
};

const requirements: Requirement[] = [
	{ regex: /.{8,}/, label: 'At least 8 characters' },
	{ regex: /[A-Z]/, label: 'At least one uppercase letter' },
	{ regex: /[a-z]/, label: 'At least one lowercase letter' },
	{ regex: /[0-9]/, label: 'At least one number' },
	{ regex: /[^A-Za-z0-9]/, label: 'At least one special character' },
];

/**
 * Password field component
 *
 * @param name - The name of the field
 * @param label - The label of the field
 * @param placeholder - The placeholder of the field
 * @param required - The required status of the field
 * @param className - The class name of the field
 * @param icon - The icon status of the field
 * @param showIcon - The show icon of the field
 * @param hideIcon - The hide icon of the field
 * @param showStrength - The show strength of the field
 * @param showMessage - The show message of the field
 *
 * @returns {JSX.Element} - The password field component
 */

export const PasswordField = <T extends FieldValues>({
	name,
	label,
	placeholder = 'Enter password',
	required = false,
	className,
	icon = true,
	showIcon = <Eye size={18} />,
	hideIcon = <EyeOff size={18} />,
	showMessage = false,
	showStrength = false,
}: PasswordFieldProps<T>) => {
	const { control, watch } = useFormContext<T>();
	const password = watch(name);

	const { showPassword, setShowPassword, strength, checks } =
		usePasswordField(password);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn(className)}>
					{label && (
						<FormLabel>
							{label}
							{required && <span className="text-red-500 ml-1">*</span>}
						</FormLabel>
					)}

					<FormControl>
						<div className="relative">
							<Input
								{...field}
								type={showPassword ? 'text' : 'password'}
								placeholder={placeholder}
								className="pr-10"
							/>
							{icon && (
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									{showPassword ? hideIcon : showIcon}
								</button>
							)}
						</div>
					</FormControl>

					<div className="space-y-2">
						{showStrength && <PasswordStrength strength={strength} />}

						{showMessage && (
							<PasswordMessage requirements={requirements} checks={checks} />
						)}
					</div>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

PasswordField.displayName = 'PasswordField';

const usePasswordField = (password: string) => {
	const [showPassword, setShowPassword] = useState(false);
	const [strength, setStrength] = useState(0);
	const [checks, setChecks] = useState<boolean[]>(
		new Array(requirements.length).fill(false)
	);

	useEffect(() => {
		if (!password) {
			setStrength(0);
			setChecks(new Array(requirements.length).fill(false));
			return;
		}

		const newChecks = requirements.map((req) => req.regex.test(password));
		setChecks(newChecks);
		setStrength((newChecks.filter(Boolean).length / requirements.length) * 100);
	}, [password]);

	return {
		showPassword,
		setShowPassword,
		strength,
		checks,
	};
};

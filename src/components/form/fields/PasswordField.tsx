import { cn } from '@/lib/utils';
import { Check, Eye, EyeOff, X } from 'lucide-react';
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

export const PasswordField = <T extends FieldValues>({
	name,
	label,
	placeholder = 'Enter password',
	required = false,
	className,
	icon = true,
	showIcon = <Eye size={18} />,
	hideIcon = <EyeOff size={18} />,
}: PasswordFieldProps<T>) => {
	const [showPassword, setShowPassword] = useState(false);
	const [strength, setStrength] = useState(0);
	const [checks, setChecks] = useState<boolean[]>(
		new Array(requirements.length).fill(false)
	);
	const { control, watch } = useFormContext<T>();
	const password = watch(name);

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

	const getStrengthColor = () => {
		if (strength <= 25) return 'bg-red-500';
		if (strength <= 50) return 'bg-orange-500';
		if (strength <= 75) return 'bg-yellow-500';
		return 'bg-green-500';
	};

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
						<div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
							<div
								className={cn(
									'h-full transition-all duration-300',
									getStrengthColor()
								)}
								style={{ width: `${strength}%` }}
							/>
						</div>

						<div>
							{requirements.map((req, index) => (
								<div
									key={req.label}
									className="flex items-center gap-2 text-xs"
								>
									{checks[index] ? (
										<Check className="text-green-500" size={12} />
									) : (
										<X className="text-red-500" size={12} />
									)}
									<span
										className={
											checks[index] ? 'text-green-500' : 'text-gray-500'
										}
									>
										{req.label}
									</span>
								</div>
							))}
						</div>
					</div>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

/**
 * Returns the color of the password strength bar based on the strength
 * @param strength The strength of the password
 *
 * @returns The color of the password strength bar
 */

export const getPasswordStrengthColor = (strength: number) => {
	if (strength <= 35) return 'bg-red-500';
	if (strength <= 70) return 'bg-orange-500';
	if (strength < 100) return 'bg-yellow-500';
	return 'bg-green-500';
};

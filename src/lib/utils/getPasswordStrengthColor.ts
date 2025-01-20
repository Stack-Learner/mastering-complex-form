/**
 * Returns the color of the password strength bar based on the strength
 * @param strength The strength of the password
 *
 * @returns The color of the password strength bar
 */

export const getPasswordStrengthColor = (strength: number) => {
	if (strength <= 25) return 'bg-red-500';
	if (strength <= 50) return 'bg-orange-500';
	if (strength <= 75) return 'bg-yellow-500';
	return 'bg-green-500';
};

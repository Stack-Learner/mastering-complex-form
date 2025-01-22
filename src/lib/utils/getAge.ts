import { differenceInYears, isValid, parseISO } from 'date-fns';

/**
 * Get age from date string
 *
 * @param {string} dateString
 * @returns {string} The age
 */

export const getAge = (dateString: string) => {
	const date = parseISO(dateString);
	if (!isValid(date)) return '-';
	return `${differenceInYears(new Date(), date)}`;
};

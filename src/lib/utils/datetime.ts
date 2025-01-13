import { format, Locale } from 'date-fns';

export const genMonths = (
	locale: Pick<Locale, 'options' | 'localize' | 'formatLong'>
) => {
	return Array.from({ length: 12 }, (_, i) => ({
		value: i,
		label: format(new Date(2021, i), 'MMMM', { locale }),
	}));
};

export const genYears = (yearRange = 50) => {
	const today = new Date();
	return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
		value: today.getFullYear() - yearRange + i,
		label: (today.getFullYear() - yearRange + i).toString(),
	}));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import { Control, FieldValues } from 'react-hook-form';

export type SLFormContext<TFormValues extends FieldValues = any> = {
	control: Control<TFormValues>;
};

export const SLFormContext = createContext<null | SLFormContext>(null);

/**
 * A hook to use the form context.
 * @returns The form context.
 */

export const useSLFormContext = <TFormValues extends FieldValues = any>() => {
	const context = useContext(SLFormContext);
	if (!context) {
		throw new Error('Form fields must be used within a SmartForm.');
	}
	return context as SLFormContext<TFormValues>;
};

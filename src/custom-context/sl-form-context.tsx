/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import { Control, FieldValues } from 'react-hook-form';

export type GenericFormContext<TFormValues extends FieldValues = any> = {
	control: Control<TFormValues>;
};

export const GenericFormContext = createContext<null | GenericFormContext>(
	null
);

/**
 * A hook to use the form context.
 * @returns The form context.
 */

export const useGenericFormContext = <
	TFormValues extends FieldValues = any
>() => {
	const context = useContext(GenericFormContext);
	if (!context) {
		throw new Error('Form fields must be used within a SmartForm.');
	}
	return context as GenericFormContext<TFormValues>;
};

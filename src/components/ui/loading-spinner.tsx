/*
 * File: LoadingSpinner.tsx
 * Responsibility: LoadingSpinner component for displaying a loading spinner.

 * Author: Aditya Chakraborty
 * Created: 2024-11-07
 * Last Modified By: Null
 * Last Modified At: Null
 * Version: 0.1.0
 */

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner component
 *
 * @param {string} className - The class name for the component.
 *
 * @returns {JSX.Element} - The LoadingSpinner component.
 *
 * @example
 * <LoadingSpinner />
 */

export const LoadingSpinner = ({ className = '' }: { className?: string }) => {
	return <Loader2 className={cn('h-10 w-10 animate-spin', className)} />;
};

LoadingSpinner.displayName = 'LoadingSpinner';

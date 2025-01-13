import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, autoResize = false, ...props }, ref) => {
		const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

		const handleAutoResize = React.useCallback(() => {
			if (!textareaRef.current || !autoResize) return;

			// Reset height to auto to properly calculate new height
			textareaRef.current.style.height = '36px';
			// Only allow height to grow if content exceeds single line
			const scrollHeight = textareaRef.current.scrollHeight;
			if (scrollHeight > 36) {
				textareaRef.current.style.height = scrollHeight + 'px';
			}
		}, [autoResize]);

		React.useEffect(() => {
			if (autoResize) {
				handleAutoResize();
			}
		}, [autoResize, handleAutoResize]);

		return (
			<textarea
				className={cn(
					'flex w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
					autoResize
						? 'h-9 resize-none overflow-hidden py-[9px]'
						: 'min-h-[60px] py-2',
					className
				)}
				ref={(element) => {
					// Handle both refs
					textareaRef.current = element;
					if (typeof ref === 'function') {
						ref(element);
					} else if (ref) {
						ref.current = element;
					}
				}}
				onInput={handleAutoResize}
				rows={autoResize ? 1 : undefined}
				{...props}
			/>
		);
	}
);
Textarea.displayName = 'Textarea';

export { Textarea };

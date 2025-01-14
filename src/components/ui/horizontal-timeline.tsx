import { cn } from '@/lib/utils';
import { FC } from 'react';

/**
 * Configuration object for customizing timeline styles
 */
type TimelineStyles = {
	container?: string; // Class for the outer container
	item?: string; // Class for each timeline item
	line?: {
		completed?: string; // Class for completed line segments
		current?: string; // Class for current line segment
		pending?: string; // Class for pending line segments
		base?: string; // Base class applied to all lines
	};
	dot?: {
		completed?: string; // Class for completed dots
		current?: string; // Class for current dot
		pending?: string; // Class for pending dots
		base?: string; // Base class applied to all dots
	};
};

/**
 * Props passed to custom render functions for lines and dots
 */
type TimelineRenderProps = {
	isCompleted: boolean; // Whether this step is completed
	isCurrent: boolean; // Whether this is the current active step
	isPending: boolean; // Whether this step is pending/future
	index: number; // Index of this step
};

/**
 * Main component props
 */
type HorizontalTimelineProps = {
	currentIndex: number; // Current active step (0-based)
	totalSteps: number; // Total number of steps
	styles?: TimelineStyles; // Optional style customizations
	renderLine?: (props: TimelineRenderProps) => React.ReactNode; // Custom line renderer
	renderDot?: (props: TimelineRenderProps) => React.ReactNode; // Custom dot renderer
};

/**
 * HorizontalTimeline component that shows progress through a series of steps
 *
 * Features:
 * - Customizable styles through TimelineStyles object
 * - Custom render functions for lines and dots
 * - Automatically calculates completed, current and pending states
 * - Responsive design that fills container width
 *
 * @example
 * ```tsx
 * <HorizontalTimeline
 *   currentIndex={2}
 *   totalSteps={5}
 *   styles={{
 *     line: { completed: 'bg-blue-500' }
 *   }}
 * />
 * ```
 */
export const HorizontalTimeline: FC<HorizontalTimelineProps> = ({
	currentIndex,
	totalSteps,
	styles = {},
	renderLine,
	renderDot,
}) => {
	// If no steps, just show background
	if (totalSteps === 0) {
		return (
			<div
				className={cn(
					'relative h-1 w-full overflow-hidden bg-muted',
					styles.container
				)}
			>
				<div className="animate-glow absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
			</div>
		);
	}

	return (
		<div className={cn('flex items-center justify-between', styles.container)}>
			{Array.from({ length: totalSteps }).map((_, index) => {
				// Calculate state for current timeline segment
				const isCompleted = index < currentIndex;
				const isCurrent = index === currentIndex;
				const isPending = !isCompleted && !isCurrent;

				const renderProps = { isCompleted, isCurrent, isPending, index };

				return (
					<div
						key={index}
						className={cn('flex items-center', styles.item)}
						style={{ width: `${100 / totalSteps}%` }}
					>
						{/* Progress line - either custom rendered or default */}
						{renderLine ? (
							renderLine(renderProps)
						) : (
							<div
								className={cn('h-1 w-full', styles.line?.base, {
									[styles.line?.completed || 'bg-green-500']: isCompleted,
									[styles.line?.current || 'bg-yellow-500']: isCurrent,
									[styles.line?.pending || 'bg-muted']: isPending,
								})}
							/>
						)}

						{/* Progress dot - either custom rendered or default */}
						{renderDot ? (
							renderDot(renderProps)
						) : (
							<div
								className={cn(
									'relative -ml-1.5 h-3 w-3 rounded-full',
									styles.dot?.base,
									{
										[styles.dot?.current || 'bg-primary']: isCurrent,
										[styles.dot?.pending || 'bg-muted']: isPending,
									}
								)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

HorizontalTimeline.displayName = 'HorizontalTimeline';

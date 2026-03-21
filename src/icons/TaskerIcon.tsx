import type { CSSProperties } from 'react';
import { iconsSet } from './iconsSet';
import type { IconName } from './iconsSet';

type Props = {
	icon: IconName;
	size?: number;
	color?: string;
	style?: CSSProperties;
	className?: string;
}

export const TaskerIcon = ({ icon, size = 24, color = 'currentColor', style, className }: Props) => {
	const Icon = iconsSet[icon];
	return (
		<Icon
			width={size}
			height={size}
			style={{ color, flexShrink: 0, display: 'block', ...style }}
			className={className}
		/>
	);
};

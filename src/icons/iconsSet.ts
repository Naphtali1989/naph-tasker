import Clipboard from './svg/clipboard.svg?react';
import Logout from './svg/logout.svg?react';
import Search from './svg/search.svg?react';
import Add from './svg/add.svg?react';
import Eye from './svg/eye.svg?react';
import EyeOff from './svg/eye-off.svg?react';
import Trash from './svg/trash.svg?react';
import Save from './svg/save.svg?react';
import CheckCircle from './svg/check-circle.svg?react';
import Info from './svg/info.svg?react';
import ChevronDown from './svg/chevron-down.svg?react';
import ChevronUp from './svg/chevron-up.svg?react';
import Close from './svg/close.svg?react';
import Package from './svg/package.svg?react';

export const iconsSet = {
	clipboard: Clipboard,
	logout: Logout,
	search: Search,
	add: Add,
	eye: Eye,
	eyeOff: EyeOff,
	trash: Trash,
	save: Save,
	checkCircle: CheckCircle,
	info: Info,
	chevronDown: ChevronDown,
	chevronUp: ChevronUp,
	close: Close,
	package: Package,
} as const;

export type IconName = keyof typeof iconsSet;

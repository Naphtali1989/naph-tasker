import type { CommonCellProps } from './types';

export const UpdatedAtCell = ({ row }: CommonCellProps) => (
	<>{new Date(row.updatedAt).toLocaleDateString()}</>
);

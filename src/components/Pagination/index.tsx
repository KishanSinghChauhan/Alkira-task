import { FC } from 'react';
import Pagination from 'react-bootstrap/Pagination';

type PaginationProps = {
	totalPages: number;
	currentPage: number;
};

const CustomPagination: FC<PaginationProps> = ({ totalPages, currentPage }) => {
	const items = [];
	for (let number = 1; number <= totalPages; number += 1) {
		items.push(
			<Pagination.Item key={number} active={number === currentPage}>
				{number}
			</Pagination.Item>
		);
	}

	return (
		<Pagination
			size='sm'
			style={{
				justifyContent: 'flex-end',
			}}
		>
			{items}
		</Pagination>
	);
};

export default CustomPagination;

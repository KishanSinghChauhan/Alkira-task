import './styles.scss';

import clsx from 'clsx';
import Loader from 'components/Loader';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

type TableHead = {
	title: string;
	key: string;
};

type TableProps = {
	columns: TableHead[];
	data: any[];
	onRowClick?: () => void;
	loading?: boolean;
};

const Table: FC<TableProps> = ({ columns, data, onRowClick, loading }) => {
	const searchParams = useSearchParams();
	return (
		<table
			className={clsx('custom-table', {
				'table-loader': loading,
			})}
		>
			<thead>
				<tr>
					{columns.map((d: TableHead) => (
						<th style={{ width: `${100 / columns.length}%` }} key={d.title}>
							{d.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{loading && <Loader tableLoader />}
				{!loading &&
					data?.map(_item => (
						<tr
							onClick={() => {
								searchParams[1]({
									team: _item.id,
								});
								if (onRowClick) {
									onRowClick();
								}
							}}
							key={_item.id}
						>
							{columns.map((d: TableHead) => (
								<td key={d.title}>{_item[d.key]}</td>
							))}
						</tr>
					))}
				{!loading && data?.length === 0 && (
					<tr className='no-data-row'>
						<td>
							<img src='./no_data.jpg' alt='no data' className='no_data_img' />
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default Table;

Table.defaultProps = {
	loading: false,
	onRowClick: () => {},
};

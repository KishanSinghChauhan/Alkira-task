import { getTeams } from 'api';
import { ReactComponent as SearchIcon } from 'assets/search.svg';
import Input from 'components/Input';
import Table from 'components/Table';
import TeamDrawer from 'components/TeamDrawer';
import tableColumns from 'constant';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'utils/misc';

import styles from './styles.module.scss';

const Home = () => {
	const ref = useRef<HTMLInputElement | null>(null);
	const [searchParams] = useSearchParams();

	const [data, setData] = useState<any>({
		loading: false,
	});
	const [filteredData, setFilteredData] = useState<any>([]);

	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		setData({
			...data,
			loading: true,
		});
		getTeams()
			.then((list: any) => {
				setData({
					...data,
					teams: list.data,
					pagination: list.meta,
					loading: false,
				});
			})
			.catch(() =>
				setData({
					...data,
					loading: true,
				})
			);
	}, []);

	useEffect(() => {
		if (searchParams.has('team')) {
			setShow(true);
		}
	}, [searchParams.has('team')]);

	const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (value) {
			setFilteredData(
				data.teams.filter(
					(d: any) =>
						d.name.toLowerCase().includes(value.toLowerCase()) ||
						d.city.toLowerCase().includes(value.toLowerCase())
				)
			);
		} else {
			setFilteredData([]);
		}
	}, 400);

	const teamsList = () => {
		if (!filteredData.length && !ref?.current?.value) {
			return data.teams;
		}

		if (!filteredData.length) {
			return [];
		}

		if (filteredData.length) {
			return filteredData;
		}
		return data.teams;
	};

	return (
		<Container>
			<div className='my-4'>
				<h1 className={styles.head}>NBA Teams</h1>

				<Input
					placeholder='Search Team'
					ref={ref}
					icon={<SearchIcon />}
					onChange={handleChange}
				/>
				<div className={styles.tableSec}>
					<Table columns={tableColumns} data={teamsList()} loading={data.loading} />
				</div>

				<TeamDrawer show={show} onHide={() => setShow(false)} />
			</div>
		</Container>
	);
};

export default Home;

import { ReactComponent as SearchIcon } from 'assets/search.svg';
import Input from 'components/Input';
import Table from 'components/Table';
import TeamDrawer from 'components/TeamDrawer';
import tableColumns from 'constant';
import { Container } from 'react-bootstrap';

import styles from './styles.module.scss';
import useHome from './useHome';

const Home = () => {
	const { data, show, setShow, handleChange, teamsList, ref, handleSort } =
		useHome();

	return (
		<Container>
			<div className='my-4'>
				<h1 className={styles.head}>NBA Teams</h1>

				<Input
					placeholder='Search Team'
					ref={ref}
					icon={<SearchIcon />}
					onChange={handleChange}
					autoFocus
				/>

				<div className={styles.tableSec}>
					<Table
						columns={tableColumns}
						data={teamsList()}
						loading={data.loading}
						handleFilterSort={handleSort}
					/>
				</div>

				<TeamDrawer show={show} onHide={() => setShow(false)} />
			</div>
		</Container>
	);
};

export default Home;

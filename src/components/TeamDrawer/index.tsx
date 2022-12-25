import clsx from 'clsx';
import Loader from 'components/Loader';
import { FC } from 'react';
import { Offcanvas } from 'react-bootstrap';

import styles from './styles.module.scss';
import useTeamDrawer from './useTeamDrawer';

type TeamDrawerProps = {
	show: boolean;
	onHide: () => void;
};

const TeamDrawer: FC<TeamDrawerProps> = ({ show, onHide }) => {
	const { searchParams, setSearchParams, teamDetails } = useTeamDrawer();
	return (
		<Offcanvas
			show={show}
			onHide={() => {
				onHide();
				searchParams.delete('team');
				setSearchParams(searchParams);
			}}
			placement='end'
		>
			<Offcanvas.Header closeButton className={styles.drawerHeader}>
				<Offcanvas.Title>{teamDetails?.data?.name}</Offcanvas.Title>
			</Offcanvas.Header>
			{!teamDetails.loading ? (
				<Offcanvas.Body>
					<div className={styles.detail}>
						<span>Team Full Name</span>
						<span>{teamDetails?.data?.full_name}</span>
					</div>
					<div className={styles.detail}>
						<span>Total Games in 2021</span>
						<span>{teamDetails?.totalGames}</span>
					</div>
					<p className={styles.gameHead}>Random Game Details:</p>
					<div className={clsx(styles.detail, styles.game)}>
						<span>Date</span>
						<span>{teamDetails?.game?.date.split('T')[0]}</span>
					</div>
					<div className={clsx(styles.detail, styles.game)}>
						<span>Home Team</span>
						<span>{teamDetails?.game?.home_team?.name}</span>
					</div>
					<div className={clsx(styles.detail, styles.game)}>
						<span>Home Team Score</span>
						<span>{teamDetails?.game?.home_team_score}</span>
					</div>
					<div className={clsx(styles.detail, styles.game)}>
						<span>Visitor Team</span>
						<span>{teamDetails?.game?.visitor_team?.name}</span>
					</div>
					<div className={clsx(styles.detail, styles.game)}>
						<span>Visitor Team Score</span>
						<span>{teamDetails?.game?.visitor_team_score}</span>
					</div>
				</Offcanvas.Body>
			) : (
				<div className={styles.loader}>
					<Loader />
				</div>
			)}
		</Offcanvas>
	);
};

export default TeamDrawer;

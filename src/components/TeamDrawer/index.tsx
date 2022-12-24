import { getGames, getTeamById } from 'api';
import clsx from 'clsx';
import Loader from 'components/Loader';
import { FC, useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { randomNumber } from 'utils/misc';

import styles from './styles.module.scss';

type TeamDrawerProps = {
	show: boolean;
	onHide: () => void;
};

const TeamDrawer: FC<TeamDrawerProps> = ({ show, onHide }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [teamDetails, setTeamDetails] = useState<any>({
		loading: false,
	});

	useEffect(() => {
		if (searchParams.has('team')) {
			setTeamDetails({
				loading: true,
			});
			getTeamById(Number(searchParams.get('team')))
				.then(d =>
					setTeamDetails((team: any) => ({
						...team,
						data: d,
					}))
				)
				.catch(() =>
					setTeamDetails({
						loading: false,
					})
				);

			getGames({
				team_ids: [Number(searchParams.get('team'))],
				seasons: [2021],
			}).then((d: any) =>
				setTeamDetails((team: any) => ({
					...team,
					totalGames: d.meta.total_count,
					game: d.data[randomNumber(0, 24)],
					loading: false,
				}))
			);
		}
	}, [searchParams.has('team')]);

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

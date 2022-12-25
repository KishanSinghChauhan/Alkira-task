import { getGames, getTeamById } from 'api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { randomNumber } from 'utils/misc';

const useTeamDrawer = () => {
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
	return {
		searchParams,
		setSearchParams,
		teamDetails,
	};
};

export default useTeamDrawer;

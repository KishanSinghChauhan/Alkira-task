import axiosInstance from 'utils/axiosInstance';

export const getTeams = async () => {
	const teams = await axiosInstance.get('/teams');
	return teams;
};

export const getTeamById = async (id: number) => {
	const teams = await axiosInstance.get(`/teams/${id}`);
	return teams;
};

type GetGameParams = {
	team_ids?: number[];
	seasons?: number[];
};

export const getGames = async (params?: GetGameParams) => {
	const teams = await axiosInstance.get(`/games`, {
		params,
	});
	return teams;
};

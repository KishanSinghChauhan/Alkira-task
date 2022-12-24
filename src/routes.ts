import CommonLayout from 'layout/Common';
import Home from 'views/Common/Home';

const routes = [
	{
		layout: CommonLayout,
		path: '',
		children: [
			{
				component: Home,
				path: '/',
			},
		],
	},
];

export default routes;

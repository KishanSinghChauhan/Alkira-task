import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from 'routes';
import NotFound from 'views/NotFound';

const App = () => (
	<Router>
		<Routes>
			{routes.map(route => (
				<Route path={route.path} key={route.path} element={<route.layout />}>
					{route.children.map(child => (
						<Route path={child.path} key={child.path} element={<child.component />} />
					))}
				</Route>
			))}
			<Route path='*' element={<NotFound />} />
		</Routes>
	</Router>
);

export default App;

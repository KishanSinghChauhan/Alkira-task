import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

type LoaderType = {
	tableLoader?: boolean;
};

const Loader: FC<LoaderType> = ({ tableLoader }) => (
	<Spinner animation='grow' as={tableLoader ? 'tr' : 'div'} />
);

export default Loader;

Loader.defaultProps = {
	tableLoader: false,
};

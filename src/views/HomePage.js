/* eslint-disable max-len, no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HotelCard from '../components/accomodations/HotelCard';
import { getAllHotels } from '../store/actions/accomodations/getAccomodationActions';
import setAuthenticate from '../store/actions/authenticateAction';
import checkRole from '../utils/checkRole';
import updateNavbar from '../store/actions/navbar/navbarActions';

export const HomePage = ({
	data,
	getHotels,
	loading,
	status,
	setAuth,
	updateNav,
	newToast,
}) => {
	const [role, setRole] = useState(null);
	useEffect(() => {
		updateNav();
		getHotels();
	}, []);
	useEffect(() => {
		const auth = !!localStorage.bn_user_data;
		if (auth) {
			setAuth(true);
		}
		const Role = checkRole('suppliers') || checkRole('travel_administrator');
		setRole(Role);
	});
	if (!loading && status === 'success') {
		return (
			<div className='container mt-7' data-testid='home-page'>
				{role ? (
					<div>
						<Link to='/hotel/create' className='btn btn-primary mb-5'>
							Create New Hotel
						</Link>
					</div>
				) : (
					<></>
				)}
				<div className='card-deck'>
					{data.map(hotel => (
						<HotelCard key={hotel.id} data={hotel} />
					))}
				</div>
			</div>
		);
	}

	return <></>;
};

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
	status: state.hotelState.status,
	data: state.hotelState.data,
});

export const mapDispatchToProps = {
	getHotels: getAllHotels,
	setAuth: setAuthenticate,
	updateNav: updateNavbar,
};

HomePage.propTypes = {
	getHotels: PropTypes.func.isRequired,
	updateNav: PropTypes.func.isRequired,
	setAuth: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	status: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.any),
};

HomePage.defaultProps = {
	loading: null,
	status: null,
	data: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

/* eslint-disable import/no-cycle */
import toast from '../../../lib/toast';
import {
	FETCH_HOTEL_SUCCESS,
	FETCH_HOTEL_FAIL,
	FETCH_SINGLE_HOTEL_SUCCESS,
	FETCH_SINGLE_HOTEL_FAIL,
	LOADING,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import apiCall from '../../../utils/api';
import { getHotelById } from '../../../lib/services/accommodation.service';
import { getRatingData } from './rateAccomodationActions';

export const getAllHotels = () => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		let userId;
		if (localStorage.bn_user_data !== undefined) {
			userId = JSON.parse(localStorage.bn_user_data).userId;
		}
		const res = await apiCall.get(`/hotels`);
		dispatch(actionFunc(FETCH_HOTEL_SUCCESS, res.data));
		// trigger re-render: to revisit
		if (userId !== undefined) {
			dispatch(getRatingData(userId));
		}

		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(FETCH_HOTEL_FAIL, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', error.response.data.message);
	}
};

export const getHotel = id => async dispatch => {
	dispatch(actionFunc(LOADING, true));

	try {
		let userId;
		if (localStorage.bn_user_data !== undefined) {
			userId = JSON.parse(localStorage.bn_user_data).userId;
		}
		const res = await getHotelById(id);
		dispatch(actionFunc(FETCH_SINGLE_HOTEL_SUCCESS, res.data));
		// trigger re-render: to revisit
		if (userId !== undefined) {
			dispatch(getRatingData(userId));
		}
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(FETCH_SINGLE_HOTEL_FAIL, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', error.response.data.message);
	}
};

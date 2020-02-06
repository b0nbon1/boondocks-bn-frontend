import {
	getUserBooking,
	bookAccommodation,
} from '../../lib/services/booking.service';
import actionFunc from '../../utils/actionFunc';
import { GET_BOOKING_SUCCESS, BUTTON_LOADING } from './types';
import Toast from '../../lib/toast';
import { getRatingData } from './accomodations/rateAccomodationActions';

export const book = bookingInfo => async dispatch => {
	const { userId } = JSON.parse(localStorage.bn_user_data);
	dispatch(actionFunc(BUTTON_LOADING, true));
	await bookAccommodation(bookingInfo);
	dispatch(getRatingData(userId));
	Toast('success', 'Accommodation booked successfully');
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export const getBooking = () => async dispatch => {
	const bookingData = await getUserBooking();
	dispatch(actionFunc(GET_BOOKING_SUCCESS, bookingData.data.data));
};

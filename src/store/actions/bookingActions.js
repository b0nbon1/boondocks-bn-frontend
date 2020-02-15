import {
	getUserBooking,
	bookAccommodation,
} from '../../lib/services/booking.service';
import actionFunc from '../../utils/actionFunc';
import { GET_BOOKING_SUCCESS, BUTTON_LOADING, BOOKING_SUCCESS } from './types';
import Toast from '../../lib/toast';
import { getRatingData } from './accomodations/rateAccomodationActions';
import { formatBooking } from '../../utils/formatBookingData';

export const book = bookingInfo => async dispatch => {
	const { userId } = JSON.parse(localStorage.bn_user_data);
	dispatch(actionFunc(BUTTON_LOADING, true));
	const res = await bookAccommodation(bookingInfo);
	dispatch(
		actionFunc(BOOKING_SUCCESS, formatBooking(res.data.data.bookedRooms)),
	);
	dispatch(getRatingData(userId));
	Toast('success', 'Accommodation booked successfully');
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export const getBooking = () => async dispatch => {
	const bookingData = await getUserBooking();
	dispatch(actionFunc(GET_BOOKING_SUCCESS, bookingData.data.data));
};

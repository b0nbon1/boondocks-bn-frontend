import {
	BOOK_ACCOMMODATION_SUCCESS,
	GET_BOOKING_SUCCESS,
} from '../actions/types';

const initialState = {
	booking: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case BOOK_ACCOMMODATION_SUCCESS:
			return {
				...state,
			};

		case GET_BOOKING_SUCCESS:
			return {
				...state,
				booking: action.payload,
			};

		default:
			return state;
	}
};

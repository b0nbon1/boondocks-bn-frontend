import {
	ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE,
	ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS,
} from '../actions/types';

const initialState = { data: false, error: null };

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS:
			return { ...state, data: true, error: null };

		case ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE:
			return { ...state, data: false, error: payload };

		default:
			return state;
	}
};

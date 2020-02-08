import {
	DISABLE_TWO_FACTOR_AUTH,
	GET_TWO_FACTOR_AUTH,
	SEND_TWO_FACTOR_TEXT,
	SET_TWO_FACTOR_AUTH,
	VERIFY_TWO_FACTOR_AUTH,
} from '../actions/types';

const initialState = {
	twoFAType: '',
	twoFASecret: '',
	twoFADataURL: '',
	phoneNumber: '',
	tokenData: {},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_TWO_FACTOR_AUTH:
			return payload;
		case VERIFY_TWO_FACTOR_AUTH:
			return payload;
		case GET_TWO_FACTOR_AUTH:
			return payload;
		case DISABLE_TWO_FACTOR_AUTH:
			return payload;
		case SEND_TWO_FACTOR_TEXT:
			return payload;
		default:
			return state;
	}
};

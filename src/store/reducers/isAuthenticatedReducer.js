// eslint-disable-next-line import/named
import {
	IS_AUTHENTICATED,
	NOT_AUTHENTICATED,
	IS_2FA_VALIDATED,
	NOT_2FA_VALIDATED,
} from '../actions/types';

export default (state = { isAuthenticated: false }, action) => {
	switch (action.type) {
		case IS_AUTHENTICATED:
			return { ...state, isAuthenticated: true };
		case NOT_AUTHENTICATED:
			return { ...state, isAuthenticated: false };
		case IS_2FA_VALIDATED:
			return { ...state, is2FAValidated: true };
		case NOT_2FA_VALIDATED:
			return { ...state, is2FAValidated: false };
		default:
			return state;
	}
};

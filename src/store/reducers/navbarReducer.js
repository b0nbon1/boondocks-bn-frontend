import NAVBAR_TYPES from '../actions/navbar/navbarTypes';

const initialState = {
	navItems: [],
	notifications: [],
	twoFAVerified: false,
};

const navbarReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case NAVBAR_TYPES.UPDATE_NAVBAR:
			return {
				...state,
				navItems: payload.navItems,
				notifications: payload.notificationsItems,
				twoFAVerified: payload.twoFAVerified,
			};
		default:
			return state;
	}
};

export default navbarReducer;

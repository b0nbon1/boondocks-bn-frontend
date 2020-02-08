import actionFunc from '../../utils/actionFunc';
import {
	DISABLE_TWO_FACTOR_AUTH,
	ERROR,
	GET_TWO_FACTOR_AUTH,
	IS_2FA_VALIDATED,
	LOADING,
	SEND_TWO_FACTOR_TEXT,
	SET_TWO_FACTOR_AUTH,
	VERIFY_TWO_FACTOR_AUTH,
} from './types';
import apiCall from '../../utils/api';
import toast from '../../lib/toast';

const base = '/2fa/totp';

export const set2FA = type => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.post(`${base}/setup`, { twoFAType: type });
		dispatch(actionFunc(SET_TWO_FACTOR_AUTH, res.data.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', 'Something went wrong');
	}
};

export const verify2FA = token => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.post(`${base}/verify`, { token });
		dispatch(actionFunc(VERIFY_TWO_FACTOR_AUTH, res.data.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', 'Something went wrong');
	}
};

export const sendFATokenText = ({ secret, phoneNumber }) => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.get(
			`${base}/send-token-text/${secret}/${phoneNumber}`,
		);
		dispatch(actionFunc(SEND_TWO_FACTOR_TEXT, res.data.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', 'Something went wrong');
	}
};

export const disable2FA = () => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.post(`${base}/disable`);
		dispatch(actionFunc(DISABLE_TWO_FACTOR_AUTH, res.data.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', 'Something went wrong');
	}
};

export const get2FA = () => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.get(`${base}/setup`);
		dispatch(actionFunc(GET_TWO_FACTOR_AUTH, res.data.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', 'Something went wrong');
	}
};

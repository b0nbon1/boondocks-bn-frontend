import toast from '../../lib/toast';
import { LOGIN_FAILURE, LOGIN_SUCCESS, BUTTON_LOADING, LOADING } from './types';
import actionFunc from '../../utils/actionFunc';
import apiCall from '../../utils/api';
import { storeToken, decodeToken } from '../../helpers/authHelper';

const login = userRequest => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.post('/auth/signin', userRequest);
		storeToken(res.data.data.token);
		decodeToken(res.data.data.token);
		dispatch(actionFunc(LOGIN_SUCCESS, res.data.message));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(LOGIN_FAILURE, error.response.data.message));
		toast(error.response.data.status, error.response.data.message);
		dispatch(actionFunc(LOADING, false));
	}
	dispatch(actionFunc(BUTTON_LOADING, false));
	dispatch(actionFunc(LOADING, false));
};

export default login;

import { FETCH_NOTIFICATIONS_SUCCESS } from './types';
import actionFunc from '../../utils/actionFunc';
import { notificationView } from '../../lib/services/notificationService';

// eslint-disable-next-line import/prefer-default-export
export const notification = () => async dispatch => {
	const res = await notificationView();
	dispatch(actionFunc(FETCH_NOTIFICATIONS_SUCCESS, res.data));
};

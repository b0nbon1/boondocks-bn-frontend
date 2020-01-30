import { FETCH_NOTIFICATIONS_SUCCESS, UPDATE_NOTIFICATION } from './types';
import actionFunc from '../../utils/actionFunc';
import { notificationView } from '../../lib/services/notificationService';
export const notification = () => async dispatch => {
	const res = await notificationView();
	dispatch(actionFunc(FETCH_NOTIFICATIONS_SUCCESS, res.data));
};
export const getNewNotification = data => async dispatch => {
	dispatch(actionFunc(UPDATE_NOTIFICATION, data));
};

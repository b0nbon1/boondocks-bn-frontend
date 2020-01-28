/* eslint-disable import/named */
import actionFunc from '../../../utils/actionFunc';
import {
	ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE,
	ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS,
} from '../types';
import toast from '../../../lib/toast';
import { markAllAsRead } from '../../../lib/services/notificationService';

const markAllNotificationsAsRead = () => async dispatch => {
	try {
		const res = await markAllAsRead();
		dispatch(actionFunc(ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS, res.data));
	} catch (error) {
		dispatch(
			actionFunc(ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE, error.response.data),
		);
		toast(error.response.data.status, error.response.data.message);
	}
};

export default markAllNotificationsAsRead;

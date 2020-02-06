/* eslint-disable import/named */
import actionFunc from '../../../utils/actionFunc';
import { MARKED_AS_READ_FAILURE, MARKED_AS_READ_SUCCESS } from '../types';
import toast from '../../../lib/toast';
import { markAllAsRead } from '../../../lib/services/notificationService';

const markAllNotificationsAsRead = () => {
	return async dispatch => {
		try {
			await markAllAsRead();
			dispatch(actionFunc(MARKED_AS_READ_SUCCESS, true));
		} catch (error) {
			dispatch(actionFunc(MARKED_AS_READ_FAILURE, error.response.data));
			toast(error.response.data.status, error.response.data.message);
		}
	};
};

export default markAllNotificationsAsRead;

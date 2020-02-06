/* eslint-disable import/named */
import actionFunc from '../../../utils/actionFunc';
import { MARKED_AS_READ_FAILURE, MARKED_AS_READ_SUCCESS } from '../types';
import toast from '../../../lib/toast';
import { markOneAsRead } from '../../../lib/services/notificationService';

const markOneNotificationAsRead = id => {
	return async dispatch => {
		try {
			await markOneAsRead(id);
			dispatch(actionFunc(MARKED_AS_READ_SUCCESS, true));
		} catch (error) {
			dispatch(
				actionFunc(MARKED_AS_READ_FAILURE, JSON.stringify(error.response)),
			);
			toast('error', JSON.stringify(error.response));
		}
	};
};

export default markOneNotificationAsRead;

/* eslint-disable import/named */
import actionFunc from '../../../utils/actionFunc';
import {
	ONE_NOTIFICATION_MARKED_AS_READ_SUCCESS,
	ONE_NOTIFICATION_MARKED_AS_READ_FAILURE,
} from '../types';
import toast from '../../../lib/toast';
import { markOneAsRead } from '../../../lib/services/notificationService';

const markOneNotificationAsRead = id => {
	return async dispatch => {
		try {
			const res = await markOneAsRead(id);
			dispatch(actionFunc(ONE_NOTIFICATION_MARKED_AS_READ_SUCCESS, res.data));
		} catch (error) {
			dispatch(
				actionFunc(
					ONE_NOTIFICATION_MARKED_AS_READ_FAILURE,
					JSON.stringify(error.response),
				),
			);
			toast('error', JSON.stringify(error.response));
		}
	};
};

export default markOneNotificationAsRead;

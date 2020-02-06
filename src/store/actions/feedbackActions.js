import actionFunc from '../../utils/actionFunc';
import {
	fetchFeedback,
	sendFeedback,
} from '../../lib/services/feedbackService';
import {
	BUTTON_LOADING,
	FETCH_FEEDBACK_SUCCESS,
	SEND_FEEDBACK_SUCCESS,
} from './types';

export const getFeedback = hotelId => async dispatch => {
	const res = await fetchFeedback(hotelId);
	const feedback = res.data.data.reverse();
	dispatch(actionFunc(FETCH_FEEDBACK_SUCCESS, { feedback }));
};

export const postFeedback = (hotelId, feedback) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	await sendFeedback(hotelId, {
		feedback,
	});
	const feedbackRes = await fetchFeedback(hotelId);
	dispatch(actionFunc(BUTTON_LOADING, false));
	const updatedFeedback = feedbackRes.data.data.reverse();
	dispatch(
		actionFunc(SEND_FEEDBACK_SUCCESS, {
			feedback: updatedFeedback,
		}),
	);
};

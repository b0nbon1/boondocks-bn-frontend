import toast from '../../../lib/toast';
import {
	CREATE_TRIP_FAILURE,
	CREATE_TRIP_SUCCESS,
	BUTTON_LOADING,
	FETCH_CREATE_TRIP_DATA_SUCCESS,
	FETCH_CREATE_TRIP_DATA_FAILURE,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import {
	getLocations,
	getLocationsWithHotels,
	createATrip,
} from '../../../lib/services/createRequest.service';
import { transformProfile } from '../profile/profileActions';
import { updateUserProfile } from '../../../lib/services/user.service';

const fetchCreateTripData = () => async dispatch => {
	try {
		const allLocations = await getLocations();
		const locationsWithHotels = await getLocationsWithHotels();

		dispatch(
			actionFunc(FETCH_CREATE_TRIP_DATA_SUCCESS, {
				allLocations: allLocations.data.data,
				locationsWithHotels: locationsWithHotels.data.data,
			}),
		);
	} catch (error) {
		dispatch(
			actionFunc(FETCH_CREATE_TRIP_DATA_FAILURE, error.response.data.message),
		);
	}
};

const createTrip = (userRequest, endpoint, profile) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));

	const userProfile = transformProfile(profile, dispatch);

	await updateUserProfile(userProfile);

	try {
		const res = await createATrip(userRequest, endpoint);
		dispatch(actionFunc(CREATE_TRIP_SUCCESS, res.data.message));
		toast('success', 'Trip request created successfully');
	} catch (error) {
		dispatch(actionFunc(CREATE_TRIP_FAILURE, error.response.data.message));
		toast(
			error.response.data.status,
			JSON.stringify(error.response.data.message),
		);
	}
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export { fetchCreateTripData, createTrip };

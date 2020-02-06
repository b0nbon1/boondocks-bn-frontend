/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Select from 'react-select';
import moment from 'moment';
import LoadingButton from '../templates/Button';
import TextArea from '../templates/TextArea';
import {
	fetchCreateTripData,
	createTrip,
} from '../../store/actions/requests/createTripActions';
import {
	renderPageLoadingSpinner,
	closePageLoadingSpinner,
} from '../../store/actions/loadingActions';
import toast from '../../lib/toast';
import TravelProfile from '../profile/TravelProfile';
import {
	fetchUserProfile,
	saveProfile,
	updateProfile,
} from '../../store/actions/profile/profileActions';

export class CreateRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tripType: 'return',
			allTrips: [
				{
					id: 1,
					travelDate: '',
					returnDate: '',
					leavingFrom: null,
					goingTo: null,
					hotel: null,
					rooms: null,
					reason: '',
				},
			],
			checkSubmit: false,
		};
	}

	async componentDidMount() {
		const { props } = this;
		props.renderPageLoadingSpinner();
		await props.fetchCreateTripData();
		const user = JSON.parse(localStorage.getItem('bn_user_data'));
		props.fetchUserProfile(user.userId, true);
		props.closePageLoadingSpinner();
	}

	createUI(allLocationOptions) {
		const { state } = this;
		const { tripType } = state;
		const returnDateCheck = new Date();
		returnDateCheck.setDate(returnDateCheck.getDate() + 1);

		return state.allTrips.map((el, i) => (
			// eslint-disable-next-line react/no-array-index-key
			<div key={i} className='eachForm'>
				<div className='form-group trips-date-divs'>
					<div className='dateDivs'>
						<input
							type='date'
							name='travelDate'
							defaultValue={el.travelDate}
							className='form-control createTripInputs'
							onChange={event => this.handleChange(event, el)}
							required
							min={new Date().toISOString().split('T')[0]}
							data-testid='travelDate'
						/>
						<label htmlFor='travelDate'>travel date</label>
					</div>
					<span />
					<div className='dateDivs'>
						<input
							type='date'
							name='returnDate'
							defaultValue={el.returnDate}
							className='form-control createTripInputs'
							onChange={event => this.handleChangeReturnDate(event, el)}
							disabled={tripType === 'one way' || tripType === 'multi-city'}
							min={
								moment(el.travelDate)
									.add(1, 'days')
									.format()
									.split('T')[0]
							}
							data-testid='returnDate'
						/>
						<label htmlFor='returnDate'>return date</label>
					</div>
				</div>

				<div className='form-group trips-date-divs'>
					<div className='dateDivs'>
						<label htmlFor='leavingFrom'>
							LEAVING FROM
							<select
								onChange={event => this.handleChange(event, el)}
								className='form-control createTripInputs'
								name='leavingFrom'
								defaultValue={el.leavingFrom || ''}
								required
								data-testid='leavingFrom'
							>
								<option value=''>Choose</option>
								<optgroup>{allLocationOptions}</optgroup>
							</select>
						</label>
					</div>
					<span />
					<div className='dateDivs'>
						<label htmlFor='goingTo'>
							GOING TO
							<select
								onChange={event => this.handleChangeGoingTo(event, el)}
								className='form-control createTripInputs'
								name='goingTo'
								required
								data-testid='goingTo'
							>
								<option value='' defaultValue>
									Choose
								</option>
								<optgroup>{allLocationOptions}</optgroup>
							</select>
						</label>
					</div>
				</div>

				<div className='form-group accomodationDiv'>
					<div>
						<select
							onChange={event => this.handleChangeHotel(event, el)}
							className='form-control createTripInputs'
							name='hotel'
							data-testid='hotel'
						>
							<optgroup>
								<option key='sH' value=''>
									Select hotel
								</option>
								{el.hotels &&
									el.hotels.map(({ value, name, key }) => (
										<option key={key} value={value}>
											{name}
										</option>
									))}
							</optgroup>
						</select>
					</div>
					<span />
					<div>
						{el.availableRooms ? (
							<Select
								isMulti
								options={el.availableRooms}
								onChange={event => this.handleChangeRooms(event, el)}
								data-testid='room'
								placeholder='Select Room'
							/>
						) : (
							<Select
								isMulti
								options={[]}
								onChange={event => this.handleChangeRooms(event, el)}
								data-testid='room'
							/>
						)}
					</div>
				</div>

				<div className='tripReason'>
					<label htmlFor='reasonForTrip'>REASONS FOR THE TRIP</label>
					<TextArea
						placeholder='Type here'
						name='reason'
						defaultValue={el.reason}
						onChange={event => this.handleChange(event, el)}
						minLength='10'
						maxLength='200'
						required
						value={el.reason || ''}
						testId='reason'
					/>
				</div>
				<div className='deleteTripForm'>
					<button
						type='button'
						className='btn btn-default btn-sm'
						onClick={() => this.removeClick(i)}
						data-testid='delete'
						hidden={
							tripType === 'one way' ||
							tripType === 'return' ||
							state.allTrips.length <= 1
						}
					>
						<span className='oi oi-trash' />
						Remove trip
					</button>
				</div>
			</div>
		));
	}

	handleChange(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		const currentFormIndex = currentValuesInState.findIndex(
			forms => forms.id === element.id,
		);

		currentFormFieldWrapper[name] = value;
		currentValuesInState.splice(currentFormIndex, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeType(e) {
		const { name, value } = e.target;
		const { state } = this;

		if (value !== 'multi-city' && state.allTrips.length > 1) {
			this.setState(prevState => ({
				allTrips: [
					{
						...prevState.allTrips[0],
					},
				],
			}));
		}
		this.setState({
			[name]: value,
		});
	}

	handleChangeReturnDate(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];
		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		const currentFormIndex = currentValuesInState.findIndex(
			forms => forms.id === element.id,
		);

		const travelDateObj = new Date(element.travelDate);
		const returnDateObj = new Date(value);

		if (travelDateObj < returnDateObj) {
			event.target.setCustomValidity('');
			currentFormFieldWrapper[name] = value;
			currentValuesInState.splice(currentFormIndex, 1, currentFormFieldWrapper);
			this.setState({ allTrips: currentValuesInState });
		} else {
			event.target.setCustomValidity(
				'Return date must be greater than travel date',
			);
		}
	}

	handleChangeGoingTo(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		const currentFormIndex = currentValuesInState.findIndex(
			forms => forms.id === element.id,
		);

		currentFormFieldWrapper[name] = value;
		const { createTripData } = this.props;
		let hotelsArray, hotelOptions;

		if (currentFormFieldWrapper[name] !== null) {
			hotelsArray = createTripData.locationsWithHotels.find(
				({ id }) => id === Number(currentFormFieldWrapper[name]),
			);

			if (hotelsArray !== undefined) {
				if (Object.prototype.hasOwnProperty.call(hotelsArray, 'hotels')) {
					hotelsArray = hotelsArray.hotels;
					hotelOptions = hotelsArray.map(hotelOption => ({
						value: hotelOption.id,
						key: hotelOption.id,
						name: hotelOption.name.toUpperCase(),
					}));
				}
			} else {
				hotelOptions = null;
			}
			currentFormFieldWrapper.hotels = hotelOptions;
		}
		currentValuesInState.splice(currentFormIndex, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeHotel(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		const currentFormIndex = currentValuesInState.findIndex(
			forms => forms.id === element.id,
		);
		currentFormFieldWrapper[name] = value;
		let roomOptions;

		if (currentFormFieldWrapper[name] !== null) {
			const { createTripData } = this.props;
			let roomsInHotel = [];

			if (element.goingTo) {
				roomsInHotel = createTripData.locationsWithHotels
					.find(({ id }) => id === Number(element.goingTo))
					.hotels.find(({ id }) => id === Number(element.hotel)).rooms;
			}

			if (roomsInHotel.length > 0) {
				roomOptions = roomsInHotel.map(roomOpt => ({
					value: roomOpt.id,
					key: roomOpt.id,
					label: roomOpt.name.toUpperCase(),
				}));
			} else {
				roomOptions = null;
			}
			currentFormFieldWrapper.availableRooms = roomOptions;
		}
		currentValuesInState.splice(currentFormIndex, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeRooms(event, element) {
		const selectedOption = event || [];
		const rooms = selectedOption.map(room => room.value);
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		const currentFormIndex = currentValuesInState.findIndex(
			forms => forms.id === element.id,
		);

		currentFormFieldWrapper.rooms = rooms;
		currentValuesInState.splice(currentFormIndex, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	addClick() {
		this.setState(prevState => {
			return {
				allTrips: [
					...prevState.allTrips,
					{
						id: prevState.allTrips[prevState.allTrips.length - 1].id + 1,
						travelDate: '',
						returnDate: '',
						leavingFrom:
							prevState.allTrips[prevState.allTrips.length - 1].goingTo,
						goingTo: null,
						hotel: null,
						rooms: null,
						reason: null,
					},
				],
			};
		});
	}

	removeClick(i) {
		const { state } = this;
		const allTrips = [...state.allTrips];
		if (allTrips.length > 1) {
			allTrips.splice(i, 1);
			this.setState({ allTrips });
		}
	}

	handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		const { state } = this;
		const { props } = this;
		const { tripType } = state;
		const formsArray = state.allTrips;

		const { profile, editErrors } = props;

		let error;
		Object.keys(editErrors).forEach(key => {
			if (editErrors[key] !== null) {
				error = 1;
			}
		});
		if (error === 1) {
			toast('error', 'Errors found, please review information');
			return;
		}

		if (formsArray.length === 1) {
			const thisFormState = formsArray[0];
			const {
				leavingFrom,
				goingTo,
				travelDate,
				returnDate,
				hotel,
				rooms,
				reason,
			} = thisFormState;

			let endpoint;
			let userRequest = {
				type: tripType,
				leavingFrom: Number(leavingFrom),
				goingTo: Number(goingTo),
				travelDate,
				reason,
			};

			if (hotel !== null && rooms !== null) {
				userRequest = {
					...userRequest,
					hotelId: Number(hotel),
					rooms,
				};
			}

			if (tripType === 'return') {
				userRequest = {
					...userRequest,
					returnDate,
				};
				endpoint = '/trips/return';
				props.createTrip(userRequest, endpoint, profile);
				this.setState({ checkSubmit: true });
			} else {
				endpoint = '/trips/oneway';
				props.createTrip(userRequest, endpoint, profile);
				this.setState({ checkSubmit: true });
			}
		} else {
			let userRequest;
			const formRequestArray = [];
			formsArray.forEach(element => {
				const {
					leavingFrom,
					goingTo,
					travelDate,
					hotel,
					rooms,
					reason,
				} = element;
				userRequest = {
					type: 'one way',
					leavingFrom: Number(leavingFrom),
					goingTo: Number(goingTo),
					travelDate,
					reason,
				};

				if (hotel !== null && rooms !== null) {
					userRequest = {
						...userRequest,
						hotelId: Number(hotel),
						rooms,
					};
				}
				formRequestArray.push(userRequest);
			});

			props.createTrip(formRequestArray, '/trips/multi-city', profile);
			this.setState({ checkSubmit: true });
		}
	}

	render() {
		const userData = JSON.parse(localStorage.bn_user_data);
		if (userData.lineManagerId === null) {
			toast('error', 'You need to have a line manager to create trip requests');
			return <Redirect to='/profile' />;
		}
		const { createTripData } = this.props;
		const { tripCreated } = createTripData;
		const { state } = this;
		const { tripType } = state;
		const { checkSubmit } = state;
		if (tripCreated === true && checkSubmit === true) {
			return <Redirect to='/requests' />;
		}

		let allLocationOptions, allLocationsWithHotels;

		if (createTripData.fetchStatus === 'success') {
			allLocationOptions = createTripData.allLocations.map(location => (
				<option value={location.id} key={location.id}>
					{location.city.toUpperCase()}
				</option>
			));
			allLocationsWithHotels = createTripData.locationsWithHotels;
		}

		const { loadingData } = this.props;
		const { buttonLoading } = loadingData;
		const { props } = this;
		return (
			<div className='createTripContainer card mx-auto mb-2'>
				<form
					className='createTripForm card-body'
					onSubmit={event => this.handleFormSubmit(event)}
				>
					<div className='center-trip-radio-buttons'>
						<div className='form-check'>
							<label>
								<input
									type='radio'
									name='tripType'
									className='form-check-input'
									value='one way'
									checked={state.tripType === 'one way'}
									onChange={event => this.handleChangeType(event)}
									data-testid='oneway'
								/>
								One way trip
							</label>
						</div>
						<div className='form-check'>
							<label>
								<input
									type='radio'
									name='tripType'
									className='form-check-input'
									value='return'
									checked={state.tripType === 'return'}
									onChange={event => this.handleChangeType(event)}
									data-testid='return'
								/>
								Return trip
							</label>
						</div>
						<div className='form-check'>
							<label>
								<input
									type='radio'
									name='tripType'
									className='form-check-input'
									value='multi-city'
									checked={state.tripType === 'multi-city'}
									onChange={event => this.handleChangeType(event)}
									data-testid='multi-city'
								/>
								Multi-city trip
							</label>
						</div>
					</div>

					{this.createUI(allLocationOptions, allLocationsWithHotels)}
					<button
						type='button'
						className='btn btn-default btn-sm'
						onClick={() => this.addClick()}
						data-testid='addbutton'
						hidden={tripType === 'one way' || tripType === 'return'}
					>
						<span className='oi oi-plus' />
						Add trip
					</button>

					<TravelProfile
						profile={props.profile}
						managers={props.managers}
						saveData={props.updateProfile}
						errors={props.editErrors}
						isEditing={props.isEditing}
					/>

					<div className='form-group createTripBtn'>
						<LoadingButton
							data-test='submitInput'
							testId='submitInput'
							classNames='btn btn-success btn-trips'
							value='SUBMIT REQUEST'
							buttonLoading={buttonLoading}
						/>
					</div>
				</form>
			</div>
		);
	}
}

CreateRequest.propTypes = {
	fetchCreateTripData: propTypes.func,
	createTripData: propTypes.object,
	createTrip: propTypes.func,
	loadingData: propTypes.objectOf(propTypes.any),
	renderPageLoadingSpinner: propTypes.func,
	closePageLoadingSpinner: propTypes.func,
	fetchUserProfile: propTypes.func.isRequired,
	profile: propTypes.instanceOf(Object).isRequired,
	updateProfile: propTypes.func.isRequired,
	editErrors: propTypes.instanceOf(Object).isRequired,
	managers: propTypes.instanceOf(Array).isRequired,
	isEditing: propTypes.bool.isRequired,
};

CreateRequest.defaultProps = {
	fetchCreateTripData: null,
	createTripData: null,
	createTrip: null,
	loadingData: null,
	renderPageLoadingSpinner: null,
	closePageLoadingSpinner: null,
};

export const mapStateToProps = state => ({
	loadingData: state.loadingState,
	createTripData: state.createTripState,
	profile: state.profileState.userProfile,
	currentUserId: state.profileState.currentUserId,
	loggedIn: state.loginState.loggedIn,
	managers: state.profileState.managers,
	editErrors: state.profileState.errors,
	isEditing: state.profileState.isEditing,
});

const mapDispatchToProps = {
	fetchCreateTripData,
	createTrip,
	renderPageLoadingSpinner,
	closePageLoadingSpinner,
	fetchUserProfile,
	updateProfile,
	saveUserInfo: saveProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);

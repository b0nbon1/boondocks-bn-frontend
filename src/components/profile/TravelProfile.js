import React, { Component } from 'react';
import propTypes from 'prop-types';
import Accordion from '../templates/Accordion';
import InputForm from '../templates/InputForm';
import SelectInput from '../templates/SelectInput';
import { profileTravelFields, profileSelect } from '../../utils/profileFields';

export class TravelProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			remember: false,
		};
	}

	handleSave({ saveData, name, value }) {
		saveData({ [name]: value });
		this.setState({
			[name]: '',
		});
	}

	/**
	 * Save user input to the local state
	 * @param event
	 */
	handleInputChange(event) {
		let { value } = event.target;
		const { name } = event.target;

		if (value === '') {
			value = ' ';
		}

		this.setState({
			[name]: value,
		});
	}

	render() {
		const { saveData, managers, errors } = this.props;
		const { state } = this;
		const { props } = this;
		if (Object.keys(props.profile).length < 1) {
			return <div>Please Wait....</div>;
		}

		let { profile } = this.props;
		if (!props.profile.remember && !props.isEditing) {
			profile = {
				lineManager: props.profile.lineManager,
				email: props.profile.email,
				remember: props.profile.remember,
			};
		}

		return (
			<div>
				<Accordion>
					<div className='grid-form request-profile'>
						{profileTravelFields.map(
							({ id, placeholder, name, type, label, error }) => (
								<InputForm
									key={id}
									placeholder={placeholder}
									name={name}
									type={type}
									value={state[name] || profile[name] || ''}
									label={label}
									onChange={event => this.handleInputChange(event)}
									error={errors[error]}
									onBlur={event =>
										this.handleSave({
											saveData,
											name,
											value: event.target.value,
										})
									}
									classNames={`form-control form-control-sm ${errors[error] &&
										'is-invalid'}`}
								/>
							),
						)}
						<SelectInput
							name='gender'
							value={state.gender || profile.gender || ''}
							label='Gender'
							placeholder='Select Gender'
							option={profileSelect.gender}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({
									saveData,
									name: 'gender',
									value: event.target.value,
								})
							}
							classNames='form-control form-control-sm'
						/>

						<SelectInput
							name='lineManager'
							value={
								state.lineManager ||
								profile.lineManager.id ||
								profile.lineManager
							}
							label='Line Manager'
							selected={state.gender || ''}
							placeholder='Line Manager'
							option={managers.map(manager => {
								const obj = {};
								obj.id = manager.id;
								obj.name = `${manager.firstName} ${manager.lastName}`;
								obj.value = manager.id;
								return obj;
							})}
							error={errors.lineManagerError}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({
									saveData,
									name: 'lineManager',
									value: event.target.value,
								})
							}
							classNames="form-control form-control-sm"
						/>

						<SelectInput
							name='preferredCurrency'
							value={state.preferredCurrency || profile.preferredCurrency || ''}
							label='Preferred Currency'
							placeholder='Preferred Currency'
							option={profileSelect.preferredCurrency}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({
									saveData,
									name: 'preferredCurrency',
									value: event.target.value,
								})
							}
							classNames='form-control form-control-sm'
						/>
						<SelectInput
							name='preferredLanguage'
							value={state.preferredLanguage || profile.preferredLanguage || ''}
							label='Preferred Language'
							placeholder='Preferred Language'
							option={profileSelect.language}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({
									saveData,
									name: 'preferredLanguage',
									value: event.target.value,
								})}
							classNames='form-control form-control-sm'
						/>
						<div className='form-group'>
							<div className='custom-control custom-checkbox'>
								<input
									type='checkbox'
									className='custom-control-input'
									name='remember'
									data-testid='remember'
									onClick={event => {
										const value = event.target.checked;
										this.handleSave({
											saveData,
											name: 'rememberInfo',
											value,
										});
									}}
									id='customCheck1'
									defaultChecked={profile.remember}
								/>
								{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
								<label className='custom-control-label' htmlFor='customCheck1'>
									Remember Information
									<i
										className='fa fa-question-circle-o ml-2 text-primary'
										data-toggle='tooltip'
										title='Remember your edited information to all forms'
										aria-hidden='true'
									/>
								</label>
							</div>
						</div>
					</div>
				</Accordion>
			</div>
		);
	}
}

TravelProfile.propTypes = {
	profile: propTypes.instanceOf(Object).isRequired,
	managers: propTypes.instanceOf(Array).isRequired,
	errors: propTypes.instanceOf(Object).isRequired,
	saveData: propTypes.func.isRequired,
	isEditing: propTypes.bool.isRequired,
};

export default TravelProfile;

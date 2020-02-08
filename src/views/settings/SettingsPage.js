/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useRadioButtons from '../../utils/useRadioButtons';
import {
	disable2FA,
	get2FA,
	sendFATokenText,
	set2FA,
	verify2FA,
} from '../../store/actions/twoFactorAuthActions';

export const SettingsPage = ({
	set2FactorAuth,
	get2FactorAuth,
	disable2FactorAuth,
	verify2FactorAuth,
	authState,
	// eslint-disable-next-line no-shadow
	sendFATokenText,
}) => {
	const [twoFAType, setTwoFAType] = useRadioButtons({
		name: 'twoFAType',
		initialState: 'none',
	});
	const [smsSent, setSmsSent] = useState(false);
	const [twoFaStep, setTwoFaStep] = useState(null);
	const [token, setToken] = useState('');
	const [msg, setMsg] = useState(null);
	const [verify, setVerify] = useState(false);
	const [status, setStatus] = useState(false);

	const twoFAStatus = {
		none: "You haven't set any Two Factor Authentication method yet.",
		sms_text: 'You have SMS Text Two Factor Authentication method active.',
		authenticator_app:
			'You have AUTHENTICATOR APP Two Factor Authentication method active.',
		sms_text_temp:
			// eslint-disable-next-line max-len
			'You have SMS TEXT Two Factor Authentication method pending for activation.',
		authenticator_app_temp:
			// eslint-disable-next-line max-len
			'You have Authenticator app Two Factor Authentication method pending for activation.',
	};

	useEffect(() => {
		get2FactorAuth();
	}, [authState.twoFAType, twoFaStep, verify]);

	useEffect(() => {
		setStatus(twoFAStatus[authState.twoFAType]);
	}, [authState, twoFAType, token, msg, smsSent, verify]);

	useEffect(() => {
		if (authState.isTokenValid === true) {
			setTwoFaStep(null);
			setToken('');
		}
		if (authState.isTokenValid === false) {
			setMsg('Invalid Token!');
			setTimeout(() => setMsg(null), 5000);
		}
	}, [authState.isTokenValid]);

	const handleTwoFactorSetting = () => {
		set2FactorAuth(twoFAType);
		setTwoFaStep(twoFAType);
	};

	return (
		<div className='container mt-4 pt-5'>
			<div className='row'>
				<div className='col-12 col-sm-3'>
					<h2>Settings</h2>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-md-3 mt-3'>
					<div className='card border-light rounded'>
						<div className='card-body'>
							<div className='list-group' id='list-tab' role='tablist'>
								<a
									className='list-group-item list-group-item-action active'
									id='list-2fa-list'
									data-toggle='list'
									href='#list-2fa'
									role='tab'
									aria-controls='2fa'
								>
									Two Factor Authentication
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-md-9 mt-3'>
					<div className='card border-light rounded'>
						<div className='card-body'>
							<div className='tab-content' id='nav-tabContent'>
								<div
									className='tab-pane fade show active'
									id='list-2fa'
									role='tabpanel'
									aria-labelledby='list-2fa-list'
								>
									<h4>Manage Two Factor Authentication</h4>
									<hr />
									<div className='row'>
										<div className='col-12 col-md-9'>
											{(twoFaStep === null || twoFaStep === 'none') &&
												authState.twoFAType && (
													<>
														<div className='alert alert-primary' role='alert'>
															{status}
														</div>
														<div className='mx-2 my-4'>
															<h6 className='text-primary'>
																Choose a method for 2 Factor authentication:
															</h6>
														</div>
														<div className='custom-control custom-radio custom-control-inline'>
															<input
																type='radio'
																id='twoFAType1'
																name='twoFAType'
																className='custom-control-input'
																value='authenticator_app_temp'
																checked={
																	authState.twoFAType ===
																		'authenticator_app_temp' ||
																	twoFAType === 'authenticator_app_temp'
																}
																{...setTwoFAType}
															/>
															<label
																className='custom-control-label'
																htmlFor='twoFAType1'
															>
																Authenticator app
															</label>
														</div>
														<div className='custom-control custom-radio custom-control-inline'>
															<input
																type='radio'
																id='twoFAType2'
																name='twoFAType'
																className='custom-control-input'
																value='sms_text_temp'
																checked={
																	authState.twoFAType === 'sms_text_temp' ||
																	twoFAType === 'sms_text_temp'
																}
																{...setTwoFAType}
															/>
															{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
															<label
																className='custom-control-label'
																htmlFor='twoFAType2'
															>
																SMS Text message
															</label>
														</div>
														<br />
														<br />
													</>
												)}
											{twoFaStep === 'sms_text_temp' && (
												<div className='row'>
													<div className='col-12 col-md-6'>
														{/* eslint-disable-next-line max-len */}
														<div className='alert alert-secondary d-flex justify-content-center'>
															<i
																className='fa fa-mobile big-icon'
																aria-hidden='true'
															/>
														</div>
													</div>
													<div className='col-12 col-md-6'>
														{msg && (
															<div className='alert alert-danger' role='alert'>
																{msg}
															</div>
														)}
														<div className='card'>
															<div className='card-body'>
																<div className='form-row'>
																	{/* eslint-disable-next-line max-len */}
																	{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
																	<label htmlFor='tokenSMS'>
																		Type token from SMS
																	</label>
																	<input
																		type='number'
																		className='form-control'
																		id='tokenSMS'
																		value={token}
																		disabled={smsSent === false}
																		onChange={e => setToken(e.target.value)}
																		required
																	/>
																</div>
															</div>
														</div>
														<br />
													</div>
												</div>
											)}
											{twoFaStep === 'authenticator_app_temp' && (
												<div className='row'>
													<div className='col-12 col-md-6'>
														<div className='card'>
															<div className='card-body'>
																<div className='row'>
																	<div className='col-12'>
																		Scan the QR code below.
																	</div>
																</div>
																{/* eslint-disable-next-line max-len */}
																{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
																<img
																	alt='Embedded Image'
																	src={authState.twoFADataURL}
																/>
																<div className='row'>
																	<h6 className='col-12'>
																		Or type the full secret:
																	</h6>
																	<br />
																	<div className='col-12'>
																		{authState.twoFASecret}
																	</div>
																</div>
															</div>
														</div>
														<br />
													</div>
													<div className='col-12 col-md-6'>
														{msg && (
															<div className='alert alert-primary' role='alert'>
																{msg}
															</div>
														)}
														<div className='card'>
															<div className='card-body'>
																<div className='form-row'>
																	{/* eslint-disable-next-line max-len */}
																	{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
																	<label htmlFor='tokenApp'>Token</label>
																	<input
																		type='number'
																		className='form-control'
																		id='tokenApp'
																		value={token}
																		onChange={e => setToken(e.target.value)}
																		required
																	/>
																</div>
															</div>
														</div>
														<br />
													</div>
												</div>
											)}
										</div>
										<div className='col-12 col-md-3'>
											{twoFaStep === null || twoFaStep === 'none' ? (
												<div>
													{twoFAType !== 'none' && (
														<button
															type='button'
															className='btn btn-primary btn-block'
															onClick={handleTwoFactorSetting}
														>
															Proceed
														</button>
													)}
													{authState.twoFAType !== 'none' && (
														<button
															type='button'
															className='btn btn-secondary btn-block'
															onClick={() => disable2FactorAuth()}
														>
															Disable 2FA
														</button>
													)}
												</div>
											) : (
												<div>
													{twoFaStep === 'sms_text_temp' && (
														<button
															type='button'
															className='btn btn-primary btn-block'
															onClick={() => {
																sendFATokenText({
																	secret: authState.twoFASecret,
																	phoneNumber: authState.phoneNumber,
																});
																setSmsSent(true);
															}}
														>
															Send me SMS Text
														</button>
													)}
													{(smsSent ||
														twoFaStep === 'authenticator_app_temp') && (
														<button
															type='button'
															className='btn btn-primary btn-block'
															onClick={() => {
																verify2FactorAuth(token);
																setVerify(true);
															}}
														>
															Verify Token
														</button>
													)}
													<button
														type='button'
														className='btn btn-secondary btn-block'
														onClick={() => {
															setTwoFaStep(null);
															setToken('');
															setSmsSent(false);
														}}
													>
														Back
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SettingsPage.propTypes = {
	set2FactorAuth: PropTypes.func.isRequired,
	get2FactorAuth: PropTypes.func.isRequired,
	disable2FactorAuth: PropTypes.func.isRequired,
	verify2FactorAuth: PropTypes.func.isRequired,
	authState: PropTypes.any.isRequired,
	sendFATokenText: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ authState: state.twoFactorAuthState });
const mapDispatchToProps = {
	set2FactorAuth: set2FA,
	get2FactorAuth: get2FA,
	disable2FactorAuth: disable2FA,
	verify2FactorAuth: verify2FA,
	sendFATokenText,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);

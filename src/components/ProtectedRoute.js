/* eslint-disable
react/jsx-props-no-spreading,
no-undef, import/no-extraneous-dependencies,
no-unused-expressions,
no-return-assign,
prettier/prettier,
max-len
*/
import { Redirect, Route } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isValidElementType } from 'react-is';
import JWTDecode from 'jwt-decode';
import toast from '../lib/toast';
import setAuthenticate from '../store/actions/authenticateAction';
import { storeToken } from '../helpers/authHelper';

export const ProtectedRoute = ({
	setAuthState,
	component: Component,
	...rest
}) => {
	setAuthState(true);
	const {search} = rest.location;

	const hasToken = search.includes('?token=');

	const nowTimeStampSecond = Math.floor(Date.now() / 1000);

	let userData;

	if (hasToken) {
		const token = search.split('?token=')[1];
		storeToken(token);
		userData = JWTDecode(token);
	}

	const isAuthenticated = !!localStorage.bn_user_data || (hasToken && (nowTimeStampSecond - userData.iat < 3));

	!isAuthenticated && toast('error', 'You need to be logged in');

	return (
		<Route
			data-test='protected-route'
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)}
			{...rest}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: (props, propName) => {
		if (props[propName] && !isValidElementType(props[propName])) {
			return new Error(
				`Invalid prop 'component' supplied to 'Route':
				 the prop is not a valid React component`,
			);
		}
	},
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}),
	setAuthState: PropTypes.func.isRequired,
};

ProtectedRoute.defaultProps = {
	location: null,
	component: null,
};

export default connect(null, {
	setAuthState: setAuthenticate,
})(ProtectedRoute);

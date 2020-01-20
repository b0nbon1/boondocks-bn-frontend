import React from 'react';
import {
	act,
	cleanup,
	fireEvent,
	waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Cookies from 'universal-cookie';
import localStorage from '../../__mocks__/LocalStorage';
import render from '../../__mocks__/render';
import token from '../../__mocks__/token';
import { BrowserRouter } from 'react-router-dom';
import {
	getUserBooking,
} from '../../lib/services/booking.service';
import ViewBookingContainer from '../../components/ViewBookingContainer';

global.localStorage = localStorage;
jest.mock('universal-cookie', () => jest.fn());
jest.mock('../../lib/services/booking.service');

Cookies.mockImplementation(() => ({ get: () => token }));

beforeEach(() => {
	global.localStorage.setItem("bn_user_data", `{
		"email":"requestero@user.com",
		"name":"Requester",
		"userId":2,
		"verified":true,
		"role":"requester",
		"lineManagerId":7,
		"iat":1578472431,
		"exp":1578558831
	}`);
});

afterEach(() => {
	cleanup();
	global.localStorage.clear();
	localStorage.store = {};
});

const booking = {
	data: {
		status: 'success',
		message: 'Bookings retrieved successfully',
		data: [
			{
				id: 33,
				roomId: 1,
				roomStatus: 'reserved',
				firstName: 'Requester',
				lastName: 'User',
				arrivalDate: '2020-01-30T00:00:00.000Z',
				leavingDate: '2020-01-31T00:00:00.000Z',
				createdAt: '2020-01-26T12:46:35.637Z',
				hotel: 'mm',
				room: 'virunga',
			},
			{
				id: 34,
				roomId: 2,
				roomStatus: 'reserved',
				firstName: 'Requester1',
				lastName: 'User1',
				arrivalDate: '2020-01-30T00:00:00.000Z',
				leavingDate: '2020-01-31T00:00:00.000Z',
				createdAt: '2020-01-26T12:46:35.637Z',
				hotel: 'mm',
				room: 'hellop',
			},
			{
				id: 32,
				roomId: 2,
				roomStatus: 'reserved',
				firstName: 'Requester2',
				lastName: 'User2',
				arrivalDate: '2020-01-26T00:00:00.000Z',
				leavingDate: '2020-01-27T00:00:00.000Z',
				createdAt: '2020-01-26T12:46:01.490Z',
				hotel: 'mm',
				room: 'hellop',
			},

			{
				id: 31,
				roomId: 2,
				roomStatus: 'reserved',
				firstName: 'Requester3',
				lastName: 'User3',
				arrivalDate: '2020-01-26T00:00:00.000Z',
				leavingDate: '2020-01-27T00:00:00.000Z',
				createdAt: '2020-01-26T12:46:01.490Z',
				hotel: 'mm',
				room: 'hellop',
			},
		],
	}
};

const noBooking = {
	data: {
		status: 'success',
		message: 'Bookings retrieved successfully',
		data: [
		],
	}
};

describe('Booking page', () => {
	test("User can view booking page ", async () => {
		getUserBooking.mockImplementation(() => Promise.resolve(booking));
		const { getByText, getAllByText } = render(
			<BrowserRouter>
				<ViewBookingContainer />
			</BrowserRouter>
		);

		const [ names ] = await waitForElement(() => [
			getByText('Requester User')
		]);

		expect(names).toBeInTheDocument();
	});

	test("Should see empty card when no booking", async () => {
		getUserBooking.mockImplementation(() => Promise.resolve(noBooking));
		const { getByText, getAllByText } = render(
			<BrowserRouter>
				<ViewBookingContainer />
			</BrowserRouter>
		);

		const [ noBookingText ] = await waitForElement(() => [
			getByText('Seems there is nothing here, Not yet booked!')
		]);

		expect(noBookingText).toBeInTheDocument();
	});


});

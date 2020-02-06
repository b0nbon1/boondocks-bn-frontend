import React from 'react';
import { render as reactRender } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import  { SingleHotelPage, mapStateToProps } from '../../views/accomodations/SingleHotelPage';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import reducers from "../../store/reducers";
import {
	getBookingData,
	getUserRatingData,
} from '../../lib/services/rating.service';

jest.mock('../../lib/services/booking.service');
jest.mock('../../lib/services/rating.service');

const render = (ui, initialState = {}, options = {}) => {
	const store = createStore(reducers, initialState,
		composeWithDevTools(applyMiddleware(thunk)));
	const Providers = ({ children }) => (
		<Provider store={store}>{children}</Provider>
	);
	return reactRender(ui, { wrapper: Providers, ...options });
};

global.localStorage = localStorage;

const bookingDataResponse = {
	data: {
		status: 'success',
		message: 'Bookings retrieved successfully',
		data: [
			{
				id: 18,
				roomId: 6,
				roomStatus: 'reserved',
				firstName: 'Requester',
				lastName: 'User',
				arrivalDate: '2020-02-03T00:00:00.000Z',
				leavingDate: '2020-02-07T00:00:00.000Z',
				createdAt: '2020-01-31T08:30:21.576Z',
				hotel: 'Marriot Hotel',
				room: 'Cheetah',
				hotelId: 1,
			},
			{
				id: 15,
				roomId: 10,
				roomStatus: 'reserved',
				firstName: 'Requester',
				lastName: 'User',
				arrivalDate: '2020-01-30T00:00:00.000Z',
				leavingDate: '2020-01-31T00:00:00.000Z',
				createdAt: '2020-01-30T13:07:17.918Z',
				hotel: 'Best Western Hotel',
				room: 'Rain',
				hotelId: 2,
			},
		],
	},
};

const ratingDataResponse = {
	data: {
		status: 'success',
		message: 'Hotel ratings fetched successfully',
		data: [
			{
				id: 18,
				hotelId: 4,
				userId: 2,
				rating: 4,
				createdAt: '2020-01-30T13:29:53.571Z',
				updatedAt: '2020-01-30T13:30:01.477Z',
			},
			{
				id: 17,
				hotelId: 2,
				userId: 2,
				rating: 4,
				createdAt: '2020-01-30T13:13:53.368Z',
				updatedAt: '2020-01-31T07:39:11.490Z',
			},
			{
				id: 20,
				hotelId: 1,
				userId: 2,
				rating: 4,
				createdAt: '2020-01-31T08:30:51.807Z',
				updatedAt: '2020-01-31T08:31:18.034Z',
			},
		],
	},
};


jest.mock('../../components/accomodations/LikeUnlike', () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
})

describe('Single Hotel page', () => {
  beforeAll(() => {
    global.localStorage.setItem('bn_user_data', `{
      "email":"requestero@user.com",
      "name":"Requester",
      "userId":2,
      "verified":true,
      "role":"travel_administrator",
      "lineManagerId":7,
      "iat":1578472431,
      "exp":1578558831
    }`);
  });

	let props;
	it('should render without error', () => {
		props = {
      loading: false,
			data:{
				location: {
					city: 'Nairobi',
					country: 'Kenya',
				},
				average_rating: '1',
				rooms: [{
				id: 1,
				status: 'available'
			}]
		},
      status: 'success',
      getHotel: jest.fn(id => id),
			match: {
				params: {
					id: 1
				}
			}
    }
    
    getUserRatingData.mockImplementation(() => Promise.resolve(ratingDataResponse));
    getBookingData.mockImplementation(() => Promise.resolve(bookingDataResponse));
    
		const { getByTestId } = render(<BrowserRouter><SingleHotelPage {...props} /></BrowserRouter>);
		expect(getByTestId('single-hotel')).toBeInTheDocument();
	});
	it('should render nothing when loading', () => {
		props = {
      loading: true,
      status: 'error',
      getHotel: jest.fn(id => id),
			match: {
				params: {
					id: 1
				}
			}
		};
		const component = render(<BrowserRouter><SingleHotelPage {...props} /></BrowserRouter>);
		expect(component.findByText())
	});

	it('should render not reserved rooms', () => {

    getUserRatingData.mockImplementation(() => Promise.resolve(ratingDataResponse));
    getBookingData.mockImplementation(() => Promise.resolve(bookingDataResponse));

		props = {
      loading: false,
			data:{
				location: {
					city: 'Nairobi',
					country: 'Kenya',
				},
				average_rating: '1',
				rooms: [{
				id: 1,
				status: 'reserved'
			}]
		},
      status: 'success',
      getHotel: jest.fn(id => id),
			match: {
				params: {
					id: 1
				}
			}
		}
		const { getByTestId } = render(<BrowserRouter><SingleHotelPage {...props} /></BrowserRouter>);
		expect(getByTestId('single-hotel')).toBeInTheDocument();
	});

	it('Should return initial data', () => {
    const initialState = {
			singleHotelState: {
          data: null,
          status: '',
        },
      loadingState: { buttonLoading: null },
    };
    expect(mapStateToProps(initialState))
    .toEqual({ data: null, status: '', loading: null });
  });

});

import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFound from './views/NotFoundPage';
import HomePage from './views/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/templates/Footer';
import store from './store';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import ResetPasswordPage from './views/ResetPasswordPage';
import SingleRequestPage from './views/SingleRequestPage';
import Loader from './components/templates/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import RequestPage from './views/RequestPage';
import EditProfileContainer from './components/EditProfileContainer';
import ViewProfileContainer from './components/ViewProfileContainer';
import UsersContainer from './components/UsersContainer';
// eslint-disable-next-line max-len
import CreateAccomodationPage from './views/accomodations/CreateAccomodationPage';
import CreateRoomsPage from './views/accomodations/CreateRoomsPage';
import SingleHotelPage from './views/accomodations/SingleHotelPage';
import CreateRequestPage from './views/requests/CreateRequestPage';
import ChatView from './views/ChatView';
import BookingContainer from './components/BookingContainer';
import ViewBooking from './components/ViewBookingContainer';
import TravelStatsPage from './views/TravelStatsPage';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Loader />
				<Navbar />
				<div data-testid='app' className='App pt-5'>
					<Switch>
						<Route path='/home' exact component={HomePage} />
						<Route path='/register' exact component={RegisterPage} />
						<Route path='/login' exact component={LoginPage} />
						<ProtectedRoute
							path='/profile/:userId'
							component={ViewProfileContainer}
						/>
						<ProtectedRoute
							path='/profile'
							exact
							component={ViewProfileContainer}
						/>
						<ProtectedRoute
							path='/travel-stats'
							exact
							component={TravelStatsPage}
						/>
						<ProtectedRoute
							path='/edit'
							exact
							component={EditProfileContainer}
						/>
						<ProtectedRoute
							path='/hotel/create'
							exact
							component={CreateAccomodationPage}
						/>
						<ProtectedRoute
							path='/hotel/:id'
							exact
							component={SingleHotelPage}
						/>
						<ProtectedRoute
							path='/hotel/:id/room/create'
							exact
							component={CreateRoomsPage}
						/>
						<ProtectedRoute
							path='/booking/:hotelId'
							exact
							component={BookingContainer}
							title='Booking'
						/>
						<ProtectedRoute
							path='/request/:requestId'
							exact
							component={SingleRequestPage}
						/>
						<Route
							path='/auth/forgot-password'
							component={ForgotPasswordPage}
							exact
						/>
						<Route
							path='/auth/reset-password'
							exact
							component={ResetPasswordPage}
						/>
						<ProtectedRoute path='/users' exact component={UsersContainer} />
						<ProtectedRoute
							path='/trip-request'
							exact
							component={CreateRequestPage}
						/>
						<ProtectedRoute path='/destinations' exact component={HomePage} />
						<ProtectedRoute path='/approved-trips' exact component={HomePage} />
						<ProtectedRoute
							path='/profile/:userId'
							exact
							component={ViewProfileContainer}
						/>
						<ProtectedRoute
							path='/profile'
							exact
							component={ViewProfileContainer}
						/>
						<ProtectedRoute path='/requests' exact component={RequestPage} />
						<ProtectedRoute path='/booking' exact component={ViewBooking} />
						<ProtectedRoute path='/users' component={UsersContainer} />
						<Redirect exact from='/' to='home' />
						<Route component={NotFound} />
					</Switch>
				</div>
				<ToastContainer />
				<ChatView />
				<Footer />
			</Router>
		</Provider>
	);
}

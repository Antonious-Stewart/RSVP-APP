import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './containers/Landing/Landing';
import { loadUser } from './store/actions/Auth/creators';
import Login from './containers/Login/Login';
import PublicRoute from './Routing/PublicRoute';
import PrivateRoute from './Routing/PrivateRoute';
import Event from './components/Events/Event';
import CreateEvent from './components/Forms/CreateEvent';
import SelectedEvent from './components/Events/SelectedEvent';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import ChangePassword from './components/Forms/ChangePassword';

export default class App extends Component {
	render() {
		if (localStorage.token) {
			store.dispatch(loadUser());
		}
		return (
			<Provider store={store}>
				<Router>
					<Navbar />
					<PublicRoute exact path='/' component={LandingPage} />
					<PublicRoute path='/Login' component={Login} />
					<Route path='/About' />
					<PrivateRoute path='/Home' component={Event} />
					<PrivateRoute path='/Create_Event' component={CreateEvent} />
					<PrivateRoute exact path='/event/:id' component={SelectedEvent} />
					<PrivateRoute path='/Logout' />
					<PrivateRoute exact path='/Profile' component={Profile} />
					<PrivateRoute path='/Profile/:id/edit' component={EditProfile} />
					<PrivateRoute path='/Change_Password' component={ChangePassword} />
				</Router>
			</Provider>
		);
	}
}

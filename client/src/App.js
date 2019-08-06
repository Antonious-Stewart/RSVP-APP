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
					<PrivateRoute path='/Home' component={Login} />
					<PrivateRoute path='/Create_Event' />
					<PrivateRoute path='/Logout' />
					<PrivateRoute path='/Profile' />
				</Router>
			</Provider>
		);
	}
}

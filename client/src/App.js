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
import ChangePassword from './components/Forms/ChangePassword';
import SearchedEvents from './components/Events/SearchedEvents';
import { StyleRoot } from 'radium';
import './App.css';
import Footer from './components/footer/Footer';

export default class App extends Component {
	render() {
		if (localStorage.token) {
			store.dispatch(loadUser());
		}
		return (
			<Provider store={store}>
				<Router>
					<StyleRoot>
						<Navbar />
						<PublicRoute exact path='/' component={LandingPage} />
						<PublicRoute path='/Login' component={Login} />
						<Route exact path='/About' />
						<PrivateRoute exact path='/Home' component={Event} />
						<PrivateRoute exact path='/Create_Event' component={CreateEvent} />
						<PrivateRoute exact path='/Events' component={SearchedEvents} />
						<PrivateRoute exact path='/event/:id' component={SelectedEvent} />
						<PrivateRoute path='/Logout' />
						<PrivateRoute exact path='/Profile' component={Profile} />
						<PrivateRoute
							exact
							path='/Change_Password'
							component={ChangePassword}
						/>
						<Footer />
					</StyleRoot>
				</Router>
			</Provider>
		);
	}
}

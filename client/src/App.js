import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route exact path='/' />
				</Router>
			</Provider>
		);
	}
}

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Navbar from './components/Navbar/Navbar';
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Navbar />
					{/* <Route exact path='/' /> */}
				</Router>
			</Provider>
		);
	}
}

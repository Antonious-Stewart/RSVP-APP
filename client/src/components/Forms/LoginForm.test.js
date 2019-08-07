import React from 'react';
import LoginForm from './LoginForm';
import { findByTestAttr } from '../../Utils/testUtils';
import { shallow } from 'enzyme';

const setupWrapper = (props = {}) => {
	return shallow(<LoginForm {...props} />);
};

describe('<LoginForm />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setupWrapper();
	});
	test('renders without errors', () => {
		const formComponent = findByTestAttr(wrapper, 'app-login-form');
		expect(formComponent).toHaveLength(1);
	});
	test('renders default state', () => {
		expect(wrapper.state()).toEqual({ name: '', password: '' });
	});
	test('render 2 input fields', () => {
		const inputFields = wrapper.find(`input`);
		expect(inputFields.length).toBe(2);
	});
	test('submit form on button click', () => {
		const submitButton = wrapper.find(`LoginButton`).dive();
		wrapper.setState({ name: 'Henry', password: 'mypass123' });
		submitButton.simulate('click', {
			preventDefault() {
				return null;
			}
		});
		wrapper.update();
		expect(wrapper.state()).toEqual({ name: '', password: '' });
	});
});

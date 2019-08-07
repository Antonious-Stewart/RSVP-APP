import React from 'react';
import { findByTestAttr } from '../../Utils/testUtils';
import { shallow } from 'enzyme';
import SignUpForm from './SignUpForm';

const setupWrapper = (props = {}) => {
	return shallow(<SignUpForm {...props} />);
};

describe('<SignUpForm />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setupWrapper();
	});
	test('renders without errors', () => {
		const formComponent = findByTestAttr(wrapper, 'app-signup-form');
		expect(formComponent).toHaveLength(1);
	});
	test('renders default state', () => {
		expect(wrapper.state()).toEqual({
			username: '',
			password: '',
			email: '',
			confirmEmail: '',
			confirmPassword: ''
		});
	});
	test('render 5 input fields', () => {
		const inputFields = wrapper.find(`input`);
		expect(inputFields.length).toBe(5);
	});
	test('submit form on button click', () => {
		const submitButton = wrapper.find(`SignUpButton`).dive();
		wrapper.setState({
			username: 'Henry',
			password: 'mypass123',
			confirmPassword: 'mypass123',
			email: 'henry@email.com',
			confirmEmail: 'henry@email.com'
		});
		submitButton.simulate('click', {
			preventDefault() {
				return null;
			}
		});
		wrapper.update();
		expect(wrapper.state()).toEqual({
			username: '',
			password: '',
			email: '',
			confirmEmail: '',
			confirmPassword: ''
		});
	});
});

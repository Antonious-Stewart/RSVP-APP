import checkPropTypes from 'check-prop-types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middleware = [thunk];
const mockStore = configureStore(middleware);

export const store = mockStore({});
//find by test by data attribute on wrapper
/**
 * @function findByTestAttr
 * @param {Object} wrapper - Enzyme ShallowWrapper to be tested
 * @param {String} val - Test attribute to be tested
 */
export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};

//check prop-types for errors
/**
 * @function checkProps
 * @param {Object} component - React Component
 * @param {Object} props - props of the component thats being passed to check for any warnings or errors
 * @returns - undefined if no errors are present
 */
export const checkProp = (component, props) => {
	return checkPropTypes(component.PropTypes, props, 'prop', component.name);
};

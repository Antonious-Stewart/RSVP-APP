import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alert extends Component {
	static propTypes = {
		alerts: PropTypes.array.isRequired
	};
	render() {
		const { alerts } = this.props;
		return (
			<Fragment>
				{alerts !== null &&
					alerts.length > 0 &&
					alerts.map(alert => (
						<div
							key={alert.id}
							className={`bg-${alert.alertType}`}
							style={{
								position: 'fixed',
								top: '8%',
								left: 0,
								width: '100%',
								padding: '1rem',
								fontSize: '2.4rem',
								color: 'white',
								fontFamily: 'Lobster Two , cursive',
								zIndex: 1000,
								textAlign: 'center'
							}}>
							{alert.msg}
						</div>
					))}
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);

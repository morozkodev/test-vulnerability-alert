import React from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import UserViewDetail from './UserViewDetail';

class UserViewId extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			user: {}, 
			loading: true
		}
	}

	componentDidMount() {
		console.log('componenteDidMount');
		axios
			.get( `https://jsonplaceholder.typicode.com/users/${this.props.userId}` )
			.then(res => {
				console.log(res);
				const user = res.data;
				this.setState({ user: user, loading: false });
			});

	}

	render() {
		const user = this.state.user;
		let contenuto;
		if (this.state.loading) {
			contenuto = <div>sto caricando</div>
		} else {
			contenuto = <Card style={{ width: '18rem' }}>
				<Card.Title>{user.name}</Card.Title>
				<Card.Text>
					<UserViewDetail user={user} />
					<Button
						variant="success"
						onClick={() => this.props.onViewList()}
					>Torna alla lista</Button>
				</Card.Text>
			</Card>
		}
		return (
			<section>
				<h1>Dettaglio utente</h1>
				{contenuto}
			</section>
		)
	}
}
export default UserViewId;
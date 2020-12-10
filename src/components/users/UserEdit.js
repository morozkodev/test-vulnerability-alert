import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {handleCommonValidateText, handleCommonValidateEmail} from '../common/ValidateUtil.js'

export default class UserEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = { user: this.props.user };
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleEdit(e, validateFun) {
		e.persist();
		console.log(`Evento : ${e.target.name} -> ${e.target.value}`)
		validateFun(e.target.value);
		this.setState(prevState => ({
			user: { ...prevState.user, [e.target.name]: e.target.value }
		}));
		/** o in alternativa
		let oldUser = this.state.user;
		oldUser.[e.target.name] = e.target.value;
		this.setState( { user: oldUser } );
		 */		
	}

	handleSave(e) {
		e.preventDefault();
		console.log(`Salvataggio utente : ${JSON.stringify(this.state.user)}`)
		/* controllo validazioni input */
		/* salvataggio utente */
		this.props.onSaveUser(this.state.user);
	}

	render() {
		return (
			<section>
				<h1>Modifica utente</h1>
				<Form onSubmit={this.handleSave}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" name="name" onChange={(e) => this.handleEdit(e, handleCommonValidateText)} value={this.state.user.name} />
					</Form.Group>
					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" name="username" onChange={(e) => this.handleEdit(e, handleCommonValidateText)} value={this.state.user.username} />
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="text" name="email" onChange={(e) => this.handleEdit(e, handleCommonValidateEmail)} value={this.state.user.email} />
					</Form.Group>
					<Button variant="primary" onClick={this.handleSave}>Salva</Button>
				</Form>
				<br />
				<Button onClick={() => this.props.onViewList()}
					variant="success">Torna alla lista</Button>
			</section>
		)
	}

}
import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import UsersTable from './components/users/UsersTable';
import UserView from './components/users/UserView';
import UserViewId from './components/users/UserViewId';
import UserEdit from './components/users/UserEdit';
import UserAdd from './components/users/UserAdd';

const displayList = 'list';
const displayView = 'view';
const displayViewId = 'viewId';
const displayEdit = 'edit';
const displayAdd = 'add';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			currentUser: {},
			userId: '',
			display: displayList
		}
		this.viewUser = this.viewUser.bind(this);
		this.viewUserId = this.viewUserId.bind(this);
		this.editUser = this.editUser.bind(this);
		this.viewList = this.viewList.bind(this);
		this.saveUser = this.saveUser.bind(this);
		this.addUser = this.addUser.bind(this);
		this.saveAddUser = this.saveAddUser.bind(this);
	}

	componentDidMount() {
		console.log('componenteDidMount');
		this.initUsers();
	}

	initUsers() {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then(res => {
				console.log(res);
				const users = res.data;
				this.setState({ users: users });
			});		
	}

	viewUser(user) {
		console.log(`App.viewUser -> ${JSON.stringify(user)}`);
		this.setState({ currentUser: user, display: displayView });
	}

	viewUserId(id) {
		console.log(`App.viewUserId -> ${id}`);
		this.setState({ userId: id, display: displayViewId });
	}

	viewList() {
		console.log(`App.viewList`);
		this.setState({ currentUser: {}, display: displayList });
	}

	editUser(user) {
		console.log(`App.editUser -> ${JSON.stringify(user)}`);
		this.setState({ currentUser: user, display: displayEdit });
	}

	saveUser(user) {
		console.log(`App.saveUser -> ${JSON.stringify(user)}`);
		axios
			.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
			.then(res => {
				console.log( `saveUser -> ${res.status} / ${JSON.stringify(res.data)}` );
				this.initUsers();
				this.viewList();
			});
	}

	addUser() {
		console.log(`App.addUser`);
		this.setState({ display: displayAdd });
	}
	
	saveAddUser( user ) {
		console.log(`App.saveAddUser -> ${JSON.stringify(user)}`);
		axios
			.post(`https://jsonplaceholder.typicode.com/users`, user )
			.then(res => {
				console.log( `saveAddUser -> ${res.status} / ${JSON.stringify(res.data)}` );
				this.initUsers();
				this.viewList();
			});		
	}	

	render() {
		let contenuto;
		if (this.state.display === displayList) {
			contenuto = <UsersTable
				users={this.state.users}
				onViewUser={this.viewUser}
				onViewUserId={this.viewUserId}
				onEditUser={this.editUser} 
				onAddUser={this.addUser}/>;
		} else if (this.state.display === displayView) {
			contenuto = <UserView user={this.state.currentUser} onViewList={this.viewList} />;
		} else if (this.state.display === displayViewId) {
			contenuto = <UserViewId userId={this.state.userId} onViewList={this.viewList} />;
		} else if (this.state.display === displayEdit) {
			contenuto = <UserEdit user={this.state.currentUser} onViewList={this.viewList} onSaveUser={this.saveUser} />;
		} else if (this.state.display === displayAdd) {
			contenuto = <UserAdd onViewList={this.viewList} onAddUser={this.saveAddUser}/>;			
		} else {
			contenuto = '<p>Non supportato</p>'
		}
		return (
			<Container>
				<h1>Pannello di controllo</h1>
				{contenuto}
			</Container>
		);
	}
}
export default App;
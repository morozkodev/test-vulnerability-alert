import React from 'react';
import {Card, Button} from 'react-bootstrap';
import UserViewDetail from './UserViewDetail';

class UserView extends React.Component{
    render(){
        const user = this.props.user;
        return(
            <section>
                <h1>Dettaglio utente</h1>
                <Card style={{ width: '18rem' }}>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                        <UserViewDetail user={user}/>
						<Button 
		                    variant="success" 
		                    onClick={ () => this.props.onViewList() }
		                    >Torna alla lista</Button>
                    </Card.Text>
                </Card>
            </section>
        )
    }
}
export default UserView;
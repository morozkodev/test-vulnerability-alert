import React from 'react';

class UserViewDetail extends React.Component{
    render(){
        const user = this.props.user;
        return(
				<div>
                        <strong>Username: </strong>
						<span>{user.username}</span> <br/>
						<strong>Indirizzo: </strong>
                        <span>{user.address.street}</span>, 
                        <span>{user.address.suite}</span>, 
                        <span>{user.address.city}</span>, 
                        <span>{user.address.zipcode}</span>, 
                        <br />
                        <strong>Email: </strong><span>{user.email}</span><br />
                        <strong>Telefono: </strong><span>{user.phone}</span><br />
                </div>
        )
    }
}
export default UserViewDetail;
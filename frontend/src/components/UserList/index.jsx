import React from 'react';

const UserList = props => <div className="UserList">
  { props.users.map(( user, i ) => <h3 key={ i }> { user.company.name } </h3> )
  }
</div>

export default UserList;

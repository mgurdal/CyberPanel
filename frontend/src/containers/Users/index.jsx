import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';
import { fetchUsers } from '../../actions/userActions';
import { fetchPosts } from '../../actions/postActions';

import { VictoryPie } from 'victory';
import DataTable from '../DataTable';
import GoogleMap from 'google-map-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const UserMarker = ({ text }) => <svg height="100" width="100"> <circle cx="50" cy="50" r="20" stroke="black" strokeWidth={ 3 } fill="#16a085" /> </svg>

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar_data: [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ]

    }

    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleFetchPosts = this.handleFetchPosts.bind(this);

  }

  componentWillMount() {
    this.handleFetchUsers()
    this.handleFetchPosts()
  }

  handleFetchUsers() {
    this.props.dispatch(fetchUsers())
  }

  handleFetchPosts() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    // let rows = [];
    // for (let i = 1; i < 10; i++) {
    //   rows.push({
    //     id: i,
    //     title: 'Title ' + i,
    //     count: i * 10,
    //     active: i % 2
    //   });
    // }
    let users = this.props.users;
    let posts = this.props.posts;
    let columns = ['id', 'username', 'name', 'email', 'phone', 'website', 'company', 'address'].map( col => {return { key: col, name: col }} )
    let rows = [];
    let selectedUsers = [];
    let postCounts = [];

    if(users.fetched){
      selectedUsers = this.props.users.data.filter( usr => this.props.users.selectedUsers.map(u => u.id).includes(usr.id))
      users.data.map( user => {
        rows.push({
          'id': user.id,
          'username': user.username,
          'name': user.name,
          'email': user.email,
          'phone': user.phone,
          'website': user.website,
          'company': user.company.name,
          'address': user.address.street+", "+user.address.city,
        })
      })

    }
    if(this.props.posts.fetched) {
      this.props.posts.data.map(post => {
        let u = selectedUsers.find( user => user.id == post.userId )
        if( u ) {
          let pc = postCounts.find(p => p.name == u.name)
          if( pc ) {
            pc['count'] += 1;
          } else {
            postCounts.push({ name: u.name, count: 0 })
          }
        }
      })
      console.log(postCounts)
    }

    return (
      <div className="Users">

      { this.props.users.error ? <h1> ERROR! </h1> : this.props.users.fetching ?
        <h1> Loading.. </h1> : <Container>
          <Row>
            <Column>
              <h1> User Locations </h1>
              <GoogleMap center={[ 36.955413, 39.337844 ]} zoom={1}>
                {  selectedUsers.map(( user, i ) => <UserMarker key={ i } lat={ user.address.geo.lat } lng={ user.address.geo.lng } text={'Marker'} />)}
              </GoogleMap>
            </Column>

            <Column style={{ height: 300 }}>
            <h1> Posts Percentage </h1>
              {
                 postCounts ? <VictoryPie
                   padAngle={1}
                   x="name"
                   y="count"
                   animate={{ duration: 500 }}
                   innerRadius={5}
                   labels={ postCounts.map( p => p.name+" "+p.count ) }
                   colorScale={["#1abc9c", "#3498db", "#34495e", "#27ae60", "#e67e22",  "#95a5a6", "#1abc9c", "#c0392b", "#2c3e50" ]}
                   data={ postCounts }
                 /> : <VictoryPie
                   padAngle={1}
                   x="name"
                   y="count"
                   animate={{ duration: 500 }}
                   innerRadius={5}
                   colorScale={[ "lightgray" ]}
                   data={ { name: "No User", count: 0 } }
                 />
              }
            </Column>
          </Row>
          <Row>
            <Column>
              <DataTable columns={ columns } rows={ rows }/>
            </Column>
            </Row>
        </Container>
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      users : state.users,
      posts: state.posts
    }
}

export default connect(
  mapStateToProps
)(Users)

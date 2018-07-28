import React from 'react';
import axios from 'axios';
import {Router, Switch} from 'react-router-dom'

import Nav from './component-nav/Nav.jsx';
import Bookmarks from './component-nav/Bookmarks.jsx';
import Login from  './component-nav/Login.jsx';
import Signup from  './component-nav/Signup.jsx';

import SearchBars from './component-search-bars/SearchBars.jsx';
import SearchByAddress from './component-search-bars/SearchByAddress.jsx';
import SearchByBusinessName from './component-search-bars/SearchByBusinessName.jsx';

import Results from './Results.jsx';
import Profile from './Profile.jsx';
import history from './History.jsx';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchResults: [], 
			yelpRestaurantID: '',
			yelpResultsForId: [],
			signedInUserID: null 
		}

		this.handleSearchResults = this.handleSearchResults.bind(this);
    this.savePlaceToDB = this.savePlaceToDB.bind(this); 
    this.handleUsername = this.handleUsername.bind(this);
    this.handleYelpRestaurantID = this.handleYelpRestaurantID.bind(this);
	}

	//**   RENDERING RESTAURANT RESULTS COMPONENT
	handleSearchResults(data) {
		this.setState({searchResults: data}, () => history.push({pathname: '/results'}))
	}

  //**   SAVING TO DB
  savePlaceToDB(place) {
    const {id,  image_url, name, url, rating } = place
    const body ={
      id: id,
      image_url: image_url,
      name: name,
      url: url,
      rating: rating,
      location_address1: place.location['address1'],
      location_city: place.location['city'], 
      location_zip_code: place.location['zip_code'],
      userId: this.state.signedInUserID
    } 
    axios.post('/places', body)
    .then(response => console.log('saved', response.data))
    .catch(err => console.log('not saved', err))
  }

  //**   KEEP USERID IN STATE
	handleUsername(data) {
		this.setState({signedInUserID: data})
	}

	//**   RENDERING RESTAURANT DETAILS COMPONENT
	handleYelpRestaurantID(id) {
    const obj = {params: {id}}
		this.setState({yelpRestaurantID: id})
    axios.get('/searchRestaurantName', obj)
    .then(res => {
      let newResults = [res.data]
      this.setState({yelpResultsForId: newResults}, () => history.push({pathname: '/profile'}))
    })
    .catch(err => console.log('handle yelp id search error: ', err))
	}

	render() {
		return (
			<Router history={history}>
				<div>
					  <Nav history={history}/>
					  <SearchBars handleSearchResults={this.handleSearchResults}/>

						<Switch>
								<Bookmarks path="/bookmarks" component={Bookmarks} signedInUserID={this.state.signedInUserID}/>
								<Login path="/login" component={Login} handleUsername={this.handleUsername}/>
								<Signup path="/signup" component={Signup} handleUsername={this.handleUsername}/>

								<Results path="/results" component={Results}
									searchResults={this.state.searchResults} 
									handleYelpRestaurantID={this.handleYelpRestaurantID}
									savePlaceToDB={this.savePlaceToDB}/> 

								<Profile path="/profile" component={Profile}
									yelpResultsForId={this.state.yelpResultsForId}
									savePlaceToDB={this.savePlaceToDB}/>	
						</Switch>
				</div>
			</Router>

		)
	}
}

export default App;



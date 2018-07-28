import React from 'react';
import axios from 'axios';
import history from '../History.jsx';
import {Col, Button, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class SearchByAddress extends React.Component {

  constructor(props) {
		super(props)
		this.state = {
			address: '',
			zipcode: ''
		}
		this.onChange = this.onChange.bind(this);
		this.fetchRestaurants = this.fetchRestaurants.bind(this);
	}

	onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

	fetchRestaurants() {
		const body = {address: this.state.address, zipcode: this.state.zipcode}
		axios.post('/searchRestaurants', body)
			.then((res) => {
				this.props.handleSearchResults(res.data)
        this.setState({ address: '',  zipcode: '' })
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className="searchBars">		
					<div>Places Nearby</div>
					<Input type="text" name="address" value={this.state.address} placeholder="Street" onChange={this.onChange}/>
					<Input type="text" name="zipcode" value={this.state.zipcode} placeholder="Zipcode" onChange={this.onChange}/>
					<Button className="Button" onClick={() => this.fetchRestaurants()}>Find a Bite</Button>
		    </div>
		)
	}
}

export default withRouter(SearchByAddress);

/*
  handleLatLgn(targetAddress, targetLat, targetLng) {
    this.setState({fulladdress: targetAddress, lat: targetLat, lng: targetLng}, 
      () => this.handleYelpSearch())
  }
*/




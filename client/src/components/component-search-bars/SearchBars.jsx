import React from "react"
import history from '../History.jsx';
import SearchByAddress from './SearchByAddress.jsx';
import SearchByBusinessName from './SearchByBusinessName.jsx';
import {withRouter} from 'react-router-dom';

const SearchBars = ({handleSearchResults}) => {
	return (
			<div className="container">
					<div className="row">
						<div className="col-md-6">
							<SearchByAddress handleSearchResults={handleSearchResults}/>
						</div>
						<div className="col-md-6">
							<SearchByBusinessName handleSearchResults={handleSearchResults}/>
						</div>
					</div>				
			</div>
		)
}

export default withRouter(SearchBars)

/*
  lat={this.state.lat} lng={this.state.lng} fulladdress={this.state.fulladdress}
  handleSearchResults(data) {
    this.setState({searchResults: data}, 
      () => history.push({pathname: '/results'}))

*/
import React from 'react';
import axios from 'axios';
import history from './History.jsx';
import Information from './component-profile/Information.jsx';
import Chart from './component-profile/Chart.jsx';
import {Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class Profile extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			yearsAvailable: [],
			yearToView:[]
		}
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	componentDidMount() {
		const years = Object.keys(this.props.yelpResultsForId[0].healthRating[0])		
		this.setState({yearsAvailable: years}, () => {
			  const dataToDisplay = this.props.yelpResultsForId[0].healthRating[0][this.state.yearsAvailable[this.state.yearsAvailable.length - 1]]
				this.setState({yearToView: dataToDisplay})
		})
	}

	handleYearChange(data) {
		const dataToDisplay = this.props.yelpResultsForId[0].healthRating[0][data]
		this.setState({yearToView: dataToDisplay})  
	}

	render() {
		const place = this.props.yelpResultsForId[0]
		const name = place.name	
		const address = place.location.display_address.join(', ')

		return (
				<div className="container-fluid">
					<div className="col-lg-12">

					    <h1 className="Title">{name}</h1>
					    <h6 className="Address">{address}</h6>
							
							<div className="row" style={{fontSize: '15px'}}>
								<Information yelpResultsForId={this.props.yelpResultsForId}/>

									<div className="btn-group btn-group-sm" role="group" aria-label="Basic example" style={{float: "right", padding: '5px'}}>
										{
											this.state.yearsAvailable.map((year, idx) => {
												return (<button type="button" className="btn btn-secondary" onClick={() => this.handleYearChange(year)} key={idx}>{year}</button>)
											})
										}
									</div>
								<Chart year={this.state.yearToView}/> 
						</div>

							<Button className="Button-details" onClick={() => this.props.savePlaceToDB(place)}>Save to Bookmarks</Button>
							<Button className="Button-details" onClick={() => history.push({pathname: '/results'})}>Back to search results...</Button>		
					</div>
				</div>
		)
	}
}

export default withRouter(Profile);

import React from 'react';
import axios from 'axios';
import history from './History.jsx';
import {Col, Card, CardBody, CardTitle, CardSubtitle, CardText, CardGroup, CardImg, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';

const Results = ({searchResults, handleYelpRestaurantID, savePlaceToDB}) => { 
	return (

			<CardGroup>
			  {
			   searchResults.map((place, idx) => {
			    	return (
						 <Col sm="3"key={idx}>
						    <Card style={{width: "18rem"}} >
						   	<CardImg top width="100%" src={place.image_url} className="img-responsive"/>
						      <div style={{height: "10rem"}} className="card-body" style={{"marginLeft": "5px"}}>
						          <div ><a href={place.url}>{place.name}</a></div>
						          <div >Yelp Rating: {place.rating}</div>
						          <div>{place.healthRating.length > 0 ? "Health Rating Available" : "Health Rating Not Available" } </div>
						          <div>{place.location.address1} 
						          <br></br>
						          {place.location.city}, {place.location.zip_code}</div>
						          <Button type="button" className="btn-sm" style={{  "marginTop": "5px", "marginBottom": "5px","marginRight": "5px","backgroundColor": "#F7F5F3"}}
						          	onClick={() => handleYelpRestaurantID(place.id)}>Profile</Button>
						          <Button type="button" className="btn-sm" style={{  "marginTop": "5px", "marginBottom": "5px","marginRight": "5px","marginLeft": "5px","backgroundColor": "#F7F5F3"}}
						          	onClick={() => savePlaceToDB(place)}> Save </Button>
							   </div>
						    </Card>
						</Col>
			    	)
			    })
			  }
		</CardGroup>
		)
}

export default withRouter(Results); 

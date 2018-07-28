import React from 'react';
import axios from 'axios'; 
import history from '../History.jsx';
import Autocomplete from 'react-autocomplete'
import {Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';

class SearchByBusinessName extends React.Component{

	constructor(props) {
		super(props)
		this.state = {
			value: '',
			autocompleteData: [], 
			isHighlighted: false
		}

		this.onChange = this.onChange.bind(this);
		this.onStateChange = this.onStateChange.bind(this);
	  this.autoCompleteBody = this.autoCompleteBody.bind(this);
		this.autoComplete = this.autoComplete.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.getItemValue = this.getItemValue.bind(this);
		this.getYelpProfile = this.getYelpProfile.bind(this);
	}

	onChange(event) { 
		this.setState({value: event.target.value}) 
		this.autoComplete() 
	}

	onStateChange(key, value) {
		this.setState({[key]: value})
	}

	autoCompleteBody() {
		return {input: this.state.value}
	}

	autoComplete() {		
		axios.post(`/searchRestaurant`, this.autoCompleteBody())
		.then(response => {
			response.data.length > 0 && this.onStateChange('autocompleteData', response.data)
		})
		.catch(err => console.log(err))
	}

	renderItem(item) {
		return (
        <div key={item.id} style={{ background: this.state.isHighlighted ? 'lightgray' : 'white' }}>
          {item.description}
        </div>   
     )
	}
	
	getItemValue(item){
    return item.description;
  }

  getYelpProfile() {
  	const body = {term: this.state.value}
  	axios.post('/searchRestaurantName', body)
  	.then(response => {
  		this.props.handleSearchResults(response.data)
  		this.setState({value: ''})
  	})
  	.catch(err => console.log(err))
  }

	render() {
		const {value, autocompleteData} = this.state;
		return (
			<div className="searchBars">	
				Search by Name 
					<Autocomplete
						inputProps={{ className: 'form-control', placeholder: 'Business', style: { width: '500px'}}} 
						items={autocompleteData}
						getItemValue={this.getItemValue}
						renderItem={(item) => this.renderItem(item)}
						value={value}
						onChange={this.onChange}
						onSelect={val => this.onStateChange('value', val)}/>					
					<Button className="Button " onClick={() => this.getYelpProfile()}>Search</Button>    													  	
			</div>	
		)
	}
}

export default withRouter(SearchByBusinessName);



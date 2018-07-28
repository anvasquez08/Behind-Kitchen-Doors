import React from 'react'; 

const Information = ({yelpResultsForId}) => {	
	const categories = yelpResultsForId[0].categories.map(obj => {return obj.title}).join(', ');	
	
	return (
		<div className="col-lg-6">
			{
			yelpResultsForId.map((business, idx) => {
				return (
					<dl className="row" key={idx} >
						<dt className="col-md-3">Category</dt>
						<dd className="col-md-9">{categories && categories}</dd>

						<dt className="col-md-3">Open</dt>
						{
							business.hours ? (
								<dd className="col-md-9">{business.hours[0].is_open_now ? "Yes" : "No"}</dd>
									) : (
								<dd className="col-md-9">Business Hours Not Available</dd>
								)
						}
						<dt className="col-md-3">Price</dt>
						<dd className="col-md-9">{business.price && business.price}</dd>

						<dt className="col-md-3">Rating</dt>
						<dd className="col-md-9">{business.rating && business.rating}</dd>

						<dt className="col-md-3">Reviews</dt>
									<dd className="col-md-9">					    
									<dl className="row">
											<dd className="col-md-10">"{business.reviews.reviews[0] && business.reviews.reviews[0].text}"</dd>
									</dl>
									<dl className="row">
											<dd className="col-md-10">"{business.reviews.reviews[1] && business.reviews.reviews[1].text}"</dd>
									</dl>
									<dl className="row">
											<dd className="col-md-10">"{business.reviews.reviews[2] && business.reviews.reviews[2].text}"</dd>
									</dl>
									</dd>
					</dl>
				)
			})
		}
	</div>
	)
}

export default Information;
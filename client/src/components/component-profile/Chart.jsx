import React from 'react'; 

const Chart = ({year}) => {	
	return (
		<div className="col-lg-6">
		{ year &&
					year.map((result, idx) => {
						return (
						<table className="table table-dark" key={idx}>
							<thead>
							<tr className="table-danger">
								<th scope="col-md-3">{result.inspection_date.split('-')[0]}</th>
								<th scope="col-md-3"></th>
								<th scope="col-md-3">Violations</th>
							</tr>
							</thead>
							<tbody>
		
							<tr >
								<th scope="row">Grading</th>
								<td>{result.healthRating[0]}</td>
								<td rowSpan="2">{
		
									result.violations.map((violation, idx) => {
										return (<div key={ idx}>
												<div>{violation.violation_code}: {violation.violation_description} </div>
												</div>
											)
									})
		
								}</td>
							</tr>
		
							<tr >
								<th scope="row">Inspection Date</th>
								<td>{result.inspection_date}</td>
							</tr>
		
							<tr>
								<th scope="row">Points</th>
								<td>{result.score[0]}</td>
							</tr>
							</tbody>
							</table>
						)
					})
		}
	</div>
	)
}

export default Chart;

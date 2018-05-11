import React from 'react'

export default class App extends React.Component {
	render() {
		var users = [
			{
				name: 'reyhan',
				hobbies: ['ac kalmak', 'yurumek', 'uyumak'],
			},
			{
				name: 'abdurrahman',
				hobbies: ['saz calmak', 'flut calmak', 'sac uzatmak'],
			},
		]
		return (
			<div style={{ textAlign: 'center' }}>
				<table border="1">
					{users.map((x, i) => {
						return (
							<tr>
								<td>{x.name}</td>
								<td>{x.hobbies.join()}</td>
								<td>
									<button
										onClick={() => {
											console.log(
												users[i]
											)
										}}
									>
										Sil
									</button>
								</td>
							</tr>
						)
					})}
				</table>
			</div>
		)
	}
}

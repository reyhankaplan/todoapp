import React from 'react'

export default class Task extends React.Component {
	render() {
		console.log(JSON.stringify(this.props.task))
		return (
			<div className="todo-item task">
				<div className="todo-item-content">
					<div className="item-title">
						{this.props.task.title || 'lorem'}
						<span>{this.props.task.date}</span>
					</div>
					<div className="item-description">
						{this.props.task.content}
					</div>
				</div>
				<div className="todo-edit-delete">
					<button
						className="edit-btn"
						onClick={() => {
							console.log('edit')
						}}
					>
						Edit
					</button>
					<button
						className="del-btn"
						onClick={() => {
							this.props.removeTask(
								this.props.task.id
							)
						}}
					>
						Delete
					</button>
				</div>
			</div>
		)
	}
}

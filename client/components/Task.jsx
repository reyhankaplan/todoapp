import React from 'react'

export default class Task extends React.Component {
	constructor(props) {
		super(props)
		this.state = { edit: false }
	}
	render() {
		console.log(JSON.stringify(this.props.task))
		return (
			<div
				className={
					'todo-item' + ` color${this.props.task.priority}`
				}
			>
				<span style={{ padding: '1em' }}>
					{this.props.task.date}
				</span>
				<div className="todo-item-content">
					<div className="item-title">
						{this.state.edit ? (
							<input
								className="todo-edit-title"
								type="text"
								ref={(ref) => {
									this.title = ref
								}}
								placeholder={
									this.props.task.title
								}
							/>
						) : (
							this.props.task.title
						)}
					</div>
					<div className="item-description">
						{this.state.edit ? (
							<textarea
								className="todo-edit-content"
								ref={(ref) => {
									this.content = ref
								}}
								placeholder={
									this.props.task.content
								}
							/>
						) : (
							this.props.task.content
						)}
					</div>
				</div>
				<div className="todo-edit-delete">
					<button
						className="edit-btn"
						onClick={() => {
							if (this.state.edit) {
								this.props.updateTask({
									id: this.props.task.id,
									title:
										this.title.value ===
											this
												.tempTitle ||
										!this.title.value
											? this
													.tempTitle
											: this.title
													.value,
									content:
										this.content
											.value ===
											this
												.tempContent ||
										!this.content.value
											? this
													.tempContent
											: this.content
													.value,
								})
							} else {
								this.tempTitle = this.props.task.title
								this.tempContent = this.props.task.content
							}
							this.setState({
								edit: !this.state.edit,
							})
							console.log('edit')
						}}
					>
						{this.state.edit ? 'Save' : 'Edit'}
					</button>
					<button
						className="del-btn"
						onClick={() => {
							if (this.state.edit) {
								this.setState({
									edit: !this.state.edit,
								})
							} else {
								this.props.removeTask(
									this.props.task.id
								)
							}
						}}
					>
						{this.state.edit ? 'Cancel' : 'Delete'}
					</button>
				</div>
			</div>
		)
	}
}

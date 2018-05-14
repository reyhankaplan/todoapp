import React from 'react'

export default class InBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {color: 0}
	}
	render() {
		return (
			<div className="todo-add-container" >
				<div className="todo-add-container-top">
					<input
						className="title-input"
						type="text"
						ref={(ref) => {
							this.title = ref
						}}
						placeholder="What to do..."
					/>
					<div className="an-other-container">
						<div className="range-slider">
							<input
								ref={(ref) => {
									this.priority = ref
								}}
								type="range"
								min="0"
								max="5"
								defaultValue="0"
								className="range-slider__range"
								onChange={
									() => {
										this.setState({color: this.priority.value})
										console.log('color:', this.state.color)
									}
								}
							/>
						</div>
						<button
							className={`color${this.state.color}`}
							onClick={() => {
								this.props.addTask({
									priority: this.priority
										.value,
									content: this.content
										.value,
									title: this.title.value,
								})
							}}
						>
							Add
						</button>
					</div>
				</div>
				<textarea
					ref={(ref) => {
						this.content = ref
					}}
					className="todo-add-container-bottom"
					placeholder="Content"
				/>
			</div>
		)
	}
}

import React from 'react'
import Task from './Task.jsx'
import InBox from './InBox.jsx'
/**
 * task = {
 * 		priority: oncelik,
 * 		date: yazildigi tarih, 
 * 		content: icerik,
 * 		title: baslik
 * }
 */
export class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			todolist: [
				{
					priority: 1,
					date: new Date().toLocaleDateString(),
					content:
						'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
				},
				{
					priority: 0,
					date: new Date().toLocaleDateString(),
					content:
						'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
				},
			],
		}
		this.removeTask = this.removeTask.bind(this)
		this.addTask = this.addTask.bind(this)
	}

	removeTask(index) {
		console.log('remove task ....')
		console.log(JSON.stringify(this.state.todolist[index]))
		this.state.todolist.splice(index, 1)
		this.setState({ todolist: this.state.todolist })
	}

	addTask(task) {
		task.date = new Date().toLocaleDateString()
		console.log('add task ....')
		console.log(JSON.stringify(task))
		this.state.todolist.push(task)
		this.setState({ todolist: this.state.todolist })
	}
	render() {
		return (
			<div className="todo-container">
				<InBox addTask={this.addTask} />
				<div className="todo-list">
					{this.state.todolist.map((e, i) => {
						console.log(`${JSON.stringify(e)}`)
						return (
							<Task
								task={Object.assign({}, e, {
									id: i,
								})}
								removeTask={this.removeTask}
							/>
						)
					})}
				</div>
			</div>
		)
	}
}

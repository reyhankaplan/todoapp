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
					title: '0',
					edit: false,
					priority: 0,
					date: new Date(),
					content:
						'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
				},
			],
			sortType: false,
		}
		this.removeTask = this.removeTask.bind(this)
		this.addTask = this.addTask.bind(this)
		this.updateTask = this.updateTask.bind(this)
		this.editEdit = this.editEdit.bind(this)
		this.changeSortType = this.changeSortType.bind(this)
	}

	removeTask(index) {
		console.log('remove task ....')
		console.log(JSON.stringify(this.state.todolist[index]))
		this.state.todolist.splice(index, 1)
		this.setState({ todolist: this.state.todolist })
	}

	addTask(task) {
		task.date = new Date()
		console.log('add task ....')
		console.log(JSON.stringify(task))
		this.state.todolist.push(task)
		this.setState({ todolist: this.state.todolist })
	}
	updateTask({ id, title, content }) {
		console.log('update task....')
		console.log(`id: ${id}, title: ${title}, content: ${content}`)
		this.state.todolist[id].title = title
		this.state.todolist[id].content = content
		this.setState({ todolist: this.state.todolist, sortType: false })
	}
	editEdit(index) {
		this.state.todolist[index].edit = !this.state.todolist[index].edit
		this.setState({todolist: this.state.todolist})
	}
	changeSortType(e) {
		this.setState({sortType: !!parseInt(e.target.value)})
	}

	render() {
		
		return (
			<div className="todo-container">
				<InBox addTask={this.addTask} />
				<div className="todo-sorting-options">
					<select 
						className="todo-list-sort-select"
						ref= {
								(ref) => {
									this.sortType = ref
								}
							}
						onChange= {this.changeSortType}
					>
						<option value={0}>Date</option>
						<option value={1}>Priority</option>
					</select>
				</div>
				<div className="todo-list">
					{
						this.state.todolist
						.sort(
							(a, b) => 
								(this.state.sortType ? 
									b.priority - a.priority :
									b.date - a.date)
						)
						.map((e, i) => {
							console.log(`${JSON.stringify(e)}`)
							return (
								<Task
									task={Object.assign({}, e, {
										id: i,
									})}
									removeTask={this.removeTask}
									updateTask={this.updateTask}
									editEdit={this.editEdit}
								/>
							)
						})
					}
				</div>
			</div>
		)
	}
}

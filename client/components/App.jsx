import React from 'react'
import Task from './Task.jsx'
import InBox from './InBox.jsx'
import db from '../data/db.js'
import websqlite from 'websqlite'
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

		this.SqlService = new websqlite()

		this.SqlService.init({
			id: 'todos',
			dbObject: window,
			timeout: 5000
		})

		this.sortType = false

		this.state = {
			todolist: [],
			editItemCount: 0
		}
		// Select todos
		// table_name, column_names, where, values, order
		this.SqlService.select(
			'todo',
			'*',
			'',
			'',
			'date desc'
		).then(res => {
			this.setState({todolist: res})
		})
		// end of select
		this.removeTask = this.removeTask.bind(this)
		this.addTask = this.addTask.bind(this)
		this.updateTask = this.updateTask.bind(this)
		this.changeSortType = this.changeSortType.bind(this)
		this.updateTodolist = this.updateTodolist.bind(this)
		this.countEditModeItems = this.countEditModeItems.bind(this)
	}

	updateTodolist() {
		console.log('updateTodolist ....')
		// Select todos
		// table_name, column_names, where, values, order
		this.SqlService.select(
			'todo',
			'*',
			'',
			'',
			`${this.sortType?'priority, date':'date'} desc`
		).then(res => {
			this.setState({todolist: res})
		})
		// end of select
	}
	removeTask(id) {
		console.log('remove task ....')
		// table_name, where, values
		this.SqlService.delete('todo', 'id=?', [id]).then(res => {
			console.log(res)
		})
		this.updateTodolist()
	}

	addTask(task) {
		console.log('add task ....')
		// table_name, column_names, values
		this.SqlService.insert(
			'todo', 
			['id', 'title', 'content', 'date', 'priority'], 
			[new Date().getTime(), task.title, task.content, new Date(), task.priority])
			.then(res => {
				console.log(res)
			})
		// end of insert
		this.updateTodolist()
	}

	updateTask({ id, title, content }) {
		console.log('update task....')
		// table_name, column_names, values, where, binds_for_where
		this.SqlService.update(
			'todo',
			['title', 'content'],
			[title, content],
			'id=?',
			[id]
		).then(res => {
			console.log(res)
		})
		// end of update
		this.updateTodolist()
	}

	countEditModeItems(edit) {
		this.setState(
			{
				editItemCount: edit ? 
					++this.state.editItemCount :
					--this.state.editItemCount
			}
		)
	}

	changeSortType(e) {
		this.sortType = !!parseInt(e.target.value)
		this.updateTodolist()
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

						this.state.todolist.map(e => {
							e.date = new Date(e.date)
							return (
								<Task
									task={e}
									removeTask={this.removeTask}
									updateTask={this.updateTask}
									updateEditItemCount={this.countEditModeItems}
								/>
							)
						})
					}
				</div>
			</div>
		)
	}
}

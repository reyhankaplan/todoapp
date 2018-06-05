module.exports = (()=> {

	const db = window.openDatabase('todos.db', '1.0', 'ToDo Application DB', 2*1024*1024)

	db.transaction(tx => {
		tx.executeSql('create table if not exists todo (id unique, title, content, date, priority)')
	})

	return db

})()
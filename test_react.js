var React = require('react')
var ReactDOMServer = require('react-dom/server')

class hello extends React.Component{
	render() {
		return React.createElement('div', {className:'foo'}, 'hello world')	
	}
}

var x = ReactDOMServer.renderToString(React.createElement(hello))
console.log(x)

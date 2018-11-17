import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Popular from './Popular.js'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'


class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/Battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route path='/Popular' component={Popular} />
						<Route render={() => <p>Not Found</p> } />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App
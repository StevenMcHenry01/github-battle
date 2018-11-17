import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { battle } from '../utils/api'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

function Profile ({ info }) {
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company&& <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  componentDidMount () {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search)
    battle([
      playerOneName,
      playerTwoName,
    ]).then((results) => {
      if (results === null) {
        return this.setState(() => ({
            error: 'Looks like you have an error, please make sure that both users exist on github',
            loading: false
        }))
      }

      this.setState(() => ({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
      }))
    })
  }

  render() {
    const { error, winner, loser, loading } = this.state

    if (loading) {
      return (
        <Loading />
      )
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results
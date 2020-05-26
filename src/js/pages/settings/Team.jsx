import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { customStyles } from 'js/components/ui/filters/MultiSelect/CustomStyles'
import { Option, Placeholder } from 'js/components/ui/filters/MultiSelect/CustomComponents'
import { getTeams, createTeam, getDevelopers, removeTeam, updateTeam } from 'js/services/api'
import { useUserContext } from 'js/context/User'
import { useAuth0 } from 'js/context/Auth0'
import { github } from 'js/services/format'

import { SettingsGroup, Search, Accordion } from 'js/pages/Settings'

const defaultProps = {
  backspaceRemovesValue: false,
  closeMenuOnSelect: false,
  isClearable: false,
  openMenuOnClick: false,
  isSearchable: true,
  isMulti: true,
  hideSelectedOptions: false,
  controlShouldRenderValue: false
}

const isFilteredIn = (user, term) => !term ||
  user.name.toLowerCase().includes(term.toLowerCase()) ||
  user.login.toLowerCase().includes(term.toLowerCase())

const usersLabelFormat = ({ name, login, picture }) => {
  const user = github.userName(login)
  return (
    <div className="align-items-center filter-dropdown-option">
      <img src={picture} alt={name} className="filter-dropdown-option-img" />
      { name && <span className="filter-dropdown-option-name mr-1">{name}</span> }
      { user && user !== name && <span className="filter-dropdown-option-user filter-dropdown-option-name mr-2">{user}</span> }
    </div>
  )
}

const getOptionValueUsers = val => `${val.name} ${val.login}`

const plusIcon = String.fromCharCode(43)

const closeDropdown = () => document.body.click()

export default function Teams() {
  const { getTokenSilently } = useAuth0()
  const { user } = useUserContext()

  const [filterTermState, setFilterTermState] = useState('')
  const [teams, setTeams] = useState([])
  const [developers, setDevelopers] = useState([])

  const saveTeam = async ({ name, members }) => {
    const { token } = await getTokenSilently()
    const { defaultAccount: { id: account } } = user
    const body = {
      account,
      name,
      members: members.map(m => m.login)
    }
    try {
      const { id } = await createTeam({ token, body })
      setTeams([
        { id, members, name },
        ...teams,
      ])
    } catch (err) {}

  }

  const deleteTeam = async id => {
    const { token } = await getTokenSilently()
    try {
      await removeTeam(token, id)
      setTeams([
        ...teams.filter(team => team.id !== id)
      ])
    } catch (err) {}
  }

  const removeDeveloper = async (teamId, devLogin) => {
    const { token } = await getTokenSilently()
    const index = teams.findIndex(t => t.id === teamId)
    const team = teams[index]

    const updatedTeam = {
      ...team,
      members: team
        .members
        .filter(m => m.login !== devLogin)
        .map(tm => tm.login)
    }
    try {
      await updateTeam(token, updatedTeam)

      const newTeamsArray = [...teams]
      newTeamsArray[index] = {
        ...updatedTeam,
        members: team
          .members
          .filter(m => m.login !== devLogin)
      }

      setTeams(newTeamsArray)
    } catch (err) {}
  }

  useEffect(() => {
    (async () => {
      const { token } = await getTokenSilently()
      const { defaultAccount: { id } } = user
      const [devTeams, devs] = await Promise.all([getTeams(token, id), getDevelopers(token, id)])
      setTeams(devTeams)
      setDevelopers(devs)
    })()
  }, [getTokenSilently, user])

  return (
    <SettingsGroup
      title="Teams"
      extra={<AddTeam developers={developers} onSave={saveTeam} />}
    >
      <p className="text-secondary mt-2 mb-3">
        Manage and add teams for your organization
      </p>
      <Search
        placeholder="Find a team..."
        onFilter={setFilterTermState}
      />
      <TeamsList
        teams={teams}
        filterTerm={filterTermState}
        removeTeam={deleteTeam}
        removeDeveloper={removeDeveloper}
      />
    </SettingsGroup>
  )
}

const AddTeam = ({ onSave, developers }) => {
  const [teamName, setTeamName] = useState('')
  const [teamMembers, setTeamMembers] = useState([])

  const onChange = ev => {
    const { target: { value } } = ev
    setTeamName(value)
    setTeamMembers([])
  }

  const saveTeam = () => {
    onSave({
      name: teamName,
      members: teamMembers
    })
    setTeamName('')
    closeDropdown()
    setTeamMembers([])
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-orange"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {plusIcon} Add New Team
      </button>
      <form
        className="dropdown-menu dropdown-card dropdown-menu-right p-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="p-3">
          <h3 className="text-dark h6">New team</h3>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              name="teamName"
              placeholder="Team name"
              value={teamName}
              onChange={onChange}
              autoComplete='off'
            />
          </div>
          <div className="mt-4 mb-3">
            <span className="text-dark h6">Add users to your team:</span>
          </div>
          <Select
            options={developers}
            className='filter text-xs'
            name='users'
            getOptionLabel={usersLabelFormat}
            getOptionValue={getOptionValueUsers}
            onChange={setTeamMembers}
            value={teamMembers}
            menuIsOpen
            components={{
              Option, Placeholder
            }}
            styles={{
              ...customStyles,
              container: styles => ({
                position: 'relative',
                background: '#E7E7EC',
                paddingTop: 2
              }),
              control: styles => ({
                ...styles,
                margin: 14,
                minHeight: 30,
                height: 30,
                borderRadius: 0,
                border: 0
              }),
              menu: styles => ({
                ...styles,
                position: 'relative',
                top: 0,
                marginTop: 0,
                borderRadius: 'none',
                boxShadow: 'none',
                border: '1px solid #d6dbe4'
              })
            }}
            {...defaultProps}
          />
        </div>
        <div className="dropdown-divider"></div>
        <div className="bg-white font-weight-light d-flex align-items-center justify-content-end p-3">
          <button className="btn text-s text-secondary mr-3" onClick={closeDropdown}>Cancel</button>
          <button
            className="btn btn-orange"
            onClick={saveTeam}
            disabled={!teamName.length || !teamMembers.length}
          >
            Add
          </button>
        </div>
      </form>
    </>
  )
}

const TeamsList = ({ teams, filterTerm, removeTeam, removeDeveloper }) => {
  return (
    <Accordion
      id="accordion"
      items={teams.map(team => ({
        title: team.name,
        description: `(${team.members.filter(user => isFilteredIn(user, filterTerm)).length} members)`,
        extra: <TeamActions team={team} filterTerm={filterTerm} removeTeam={removeTeam} />,
        content: <Team team={team} filterTerm={filterTerm} removeDeveloper={removeDeveloper} />,
      }))}
    />
  )
}

const TeamActions = ({ team, filterTerm, removeTeam }) => {
  const deleteTeam = id => () => {
    removeTeam(id)
  }

  return (
    <>
      <div className="mr-3">
        {team.members.map(user => isFilteredIn(user, filterTerm) && (
          <img src={user.picture} className="pr-user-avatar" key={user.login} alt="" />
        ))}
      </div>
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-small btn-transparent"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item">Rename</button>
          <button className="dropdown-item" onClick={deleteTeam(team.id)}>Remove</button>
        </div>
      </div>
    </>
  )
}

const Team = ({ team, filterTerm, removeDeveloper}) => {
  return (
    <ul className="list-group list-group-flush">
      {team.members.map(user => (
        <li
          className="list-group-item bg-white font-weight-normal"
          style={{ display: isFilteredIn(user, filterTerm) ? 'block' : 'none' }}
          key={user.login}
        >
          <div className="row">
            <div className="col-6 d-flex">
              <img src={user.picture} className="pr-user-avatar mr-2 ml-4" alt={user.name} />
              <p className="text-dark text-truncate my-1">{user.name} ({github.userName(user.login)})</p>
            </div>
            <div className="col-6 d-flex align-items-center">
              <button
                onClick={() => removeDeveloper(team.id, user.login)}
                className="btn btn-transparent text-bright ml-auto"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </li>
      ))}

      <li className="list-group-item bg-white font-weight-normal">
        <div className="dropdown ml-4">
          <button
            className="btn btn-orange"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {plusIcon} Add user
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            USERS
          </div>
        </div>
      </li>
    </ul>
  )
}

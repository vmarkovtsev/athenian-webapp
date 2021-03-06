import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { customStyles } from 'js/components/ui/filters/MultiSelect/CustomStyles'
import { Option, Placeholder } from 'js/components/ui/filters/MultiSelect/CustomComponents'
import { getTeams, createTeam, getDevelopers, removeTeam, updateTeam } from 'js/services/api'
import { useApi } from 'js/hooks';
import { github } from 'js/services/format'
import { usersLabelFormat } from 'js/components/ui/filters/MultiSelect/CustomComponents'
import { SettingsGroup, Search, Accordion } from 'js/pages/Settings'

import _ from 'lodash';

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

const getOptionValueUsers = val => `${val.name} ${val.login}`

const plusIcon = String.fromCharCode(43)

const closeDropdown = () => document.body.click()

export default function Teams() {
  const [filterTermState, setFilterTermState] = useState('')
  const [teams, setTeams] = useState([])
  const [developers, setDevelopers] = useState([])
  const {api, ready: apiReady, context} = useApi(true, false);

  useEffect(() => {
    if (!apiReady) {
      return
    }

    (async () => {
      const [devTeams, devs] = await Promise.all(
        [getTeams(api, context.account), getDevelopers(api, context.account)]
      )
      setTeams(devTeams)
      setDevelopers(devs)
    })()
  }, [api, apiReady, context.account])

  const saveTeam = async ({ name, members }) => {
    try {
      const { id } = await createTeam(api, context.account, name, members.map(m => m.login))
      setTeams([
        { id, members, name },
        ...teams,
      ])
    } catch (err) {}

  }

  const addDevelopers = async ({ teamId, members }) => {
    const index = teams.findIndex(t => t.id === teamId)
    const team = teams[index]
    team.members = _(team.members).union(members).value()
    try {
      await updateTeam(api, teamId, team.name, team.members.map(m => m.login))
      setTeams([...teams])
    } catch (err) {}

  }

  const deleteTeam = async id => {
    try {
      await removeTeam(api, id)
      setTeams([...teams.filter(team => team.id !== id)])
    } catch (err) {}
  }

  const removeDeveloper = async (teamId, devLogin) => {
    const index = teams.findIndex(t => t.id === teamId)
    const team = teams[index]
    team.members = team.members.filter(m => m.login !== devLogin)
    try {
      await updateTeam(api, teamId, team.name, team.members.map(tm => tm.login))
      setTeams([...teams])
    } catch (err) {}
  }

  if (!apiReady) {
    return null
  }

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
        addDevelopers={addDevelopers}
        developers={developers}
      />
    </SettingsGroup>
  )
}

const AddTeam = ({ onSave, developers }) => {
  return <TeamForm btnText={"Add New Team"}
                   onSave={onSave}
                   developers={developers}
                   options={{
                     nameChangeEnabled: true,
                     membersChangeEnabled: true
                   }}
         />
}

const AddMembers = ({ onSave, developers, team }) => {
  return <TeamForm btnText={"Add user"}
                   onSave={onSave}
                   developers={developers}
                   team={team}
                   options={{
                     membersChangeEnabled: true
                   }}
         />
}

const TeamsList = ({ teams, filterTerm, removeTeam, removeDeveloper, addDevelopers, developers }) => {
  return (
    <Accordion
      id="accordion"
      items={teams.map(team => ({
        title: team.name,
        description: `(${team.members.filter(user => isFilteredIn(user, filterTerm)).length} members)`,
        extra: <TeamActions team={team} filterTerm={filterTerm} removeTeam={removeTeam} />,
        content: <Team
                   team={team}
                   filterTerm={filterTerm}
                   removeDeveloper={removeDeveloper}
                   addDevelopers={addDevelopers}
                   developers={developers}
                   onSave={addDevelopers}
                 />,
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
          <button className="dropdown-item" onClick={deleteTeam(team.id)}>Remove</button>
        </div>
      </div>
    </>
  )
}

const TeamForm = ({btnText, onSave, developers, team, options}) => {
  const [teamName, setTeamName] = useState(team ? team.name : "")
  const [teamMembers, setTeamMembers] = useState([])

  const opts = options || {}
  opts.nameChangeEnabled = opts.nameChangeEnabled || false;
  opts.membersChangeEnabled = opts.membersChangeEnabled || false;

  const membersOptions = team ? _(developers)
        .filter(v => !(v.login in _(team.members)
                       .keyBy('login')
                       .mapValues(x => true)
                       .value()))
        .orderBy(['name'], ['asc'])
        .value() : _(developers).sortBy(['name', 'login'], ['asc', 'asc'])

  const onChange = ev => {
    const { target: { value } } = ev
    setTeamName(value)
    setTeamMembers(teamMembers)
  }

  const saveTeam = () => {
    onSave({
      teamId: team ? team.id : "",
      name: teamName,
      members: teamMembers
    })
    setTeamName('')
    closeDropdown()
    setTeamMembers([])
  }

  const applyDisabled = (opts.nameChangeEnabled && opts.membersChangeEnabled) ?
        (!teamName.length || !teamMembers.length) :
        (opts.nameChangeEnabled ? !teamName.length : !teamMembers.length)
  
  return (
    <>
      <button
        type="button"
        className="btn btn-orange"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {plusIcon} {btnText}
      </button>
      <form
        className="dropdown-menu dropdown-card dropdown-menu-right p-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="p-3">
          {
            opts.nameChangeEnabled &&
              <div>
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
              </div>
          }
          {
            opts.membersChangeEnabled &&
              <div>
                <div className="mt-4 mb-3">
                  <span className="text-dark h6">Add users to your team:</span>
                </div>
                <Select
                  options={membersOptions}
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
                    control: (base, state) => ({
                      ...base,
                      margin: 14,
                      minHeight: 30,
                      height: 30,
                      borderRadius: 0,
                      borderColor: state.isFocused
                        ? '#ffd188'
                        : '#e7e7ec',
                      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(255, 160, 8, 0.25)' : 0,
                      '&:hover': {
                        boxShadow: '0 0 0 0.2rem rgba(255, 160, 8, 0.25)',
                        borderColor: '#ffd188',
                      }
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
          }
        </div>
        <div className="dropdown-divider"></div>
        <div className="bg-white font-weight-light d-flex align-items-center justify-content-end p-3">
          <button className="btn text-s text-secondary mr-3" onClick={closeDropdown}>Cancel</button>
          <button
            className="btn btn-orange"
            onClick={saveTeam}
            disabled={applyDisabled}
          >
            Add
          </button>
        </div>
      </form>
    </>
  )
}

const Team = ({ team, filterTerm, removeDeveloper, developers, addDevelopers }) => {
  return (
    <ul className="list-group list-group-flush">
      {team.members.map(member => {
        const gituser = github.userName(member.login)
        const user = gituser || 'ANONYMOUS'
        return (
          <li
            className="list-group-item bg-white font-weight-normal"
            style={{ display: isFilteredIn(user, filterTerm) ? 'block' : 'none' }}
            key={member.login}
          >
            <div className="row">
              <div className="col-6 d-flex">
                <img src={member.picture} className="pr-user-avatar mr-2 ml-4" alt={member.name} />
                <p className="text-dark text-truncate my-1">
                  {member.name} <span className={`text-${!member.name ? 'dark' : 'secondary'} text-xs`}>{user}</span>
                </p>
              </div>
              <div className="col-6 d-flex align-items-center">
                <button
                  onClick={() => removeDeveloper(team.id, member.login)}
                  className="btn btn-transparent text-bright ml-auto"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </li>
        )
      })}

      <li className="list-group-item bg-white font-weight-normal">
        <div className="dropdown ml-4">
          <AddMembers developers={developers} onSave={addDevelopers} team={team}/>
        </div>
      </li>
    </ul>
  )
}

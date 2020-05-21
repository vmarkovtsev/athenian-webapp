export const filterReducer = (state, action) => {
  switch (action.type) {
    case TYPE.INIT:
      const { ready, repos, contribs, teams } = action.payload
      return {
        ...state,
        ready,
        repos: {
          ready,
          data: [...repos],
          selected: [...repos]
        },
        contribs: {
          ready,
          data: [...contribs],
          selected: [...contribs]
        },
        teams: {
          ready,
          data: [...teams]
        }
      }
    case TYPE.SET_INTERVAL:
      return {
        ...state, 
        dateInterval: action.payload
      }
    case TYPE.SET_REPOS: 
      return {
        ...state,
        repos: {
          ...state.repos,
          ready: true,
          data: action.payload,
          selected: []
        }
      }
    case TYPE.SET_TEAMS:
      return {
        ...state,
        teams: {
          ready: true,
          data: action.payload
        }
      }
    case TYPE.READY:
      return {
        ...state,
        ready: action.payload
      }
    case TYPE.SET_CONTRIBS:
        return {
          ...state,
          contribs: {
            ...state.contribs,
            ready: true,
            data: action.payload,
            selected: []
          }
        }
    case TYPE.SET_SELECTED_REPOS:
        return {
          ...state,
          repos: {
            ...state.repos,
            selected: action.payload
          }
        }
    case TYPE.SET_SELECTED_CONTRIBS:
        console.log('PAYLOAD: ', action)
        return {
          ...state,
          contribs: {
            ...state.contribs,
            selected: action.payload
          }
        }
    default:
      return state
  }
}

export const defaultFilter = {
  ready: false,
  repos: {
    data: [],
    ready: false,
    selected: []
  },
  teams: {
    data: [],
    ready: false
  },
  contribs: {
    data: [],
    ready: false,
    selected: []
  },
  dateInterval: null
}

export const TYPE = {
  INIT: 'INIT',
  SET_REPOS: 'SET_REPOS',
  SET_INTERVAL: 'SET_INTERVAL',
  SET_TEAMS: 'SET_TEAMS',
  SET_READY: 'SET_READY',
  SET_CONTRIBS: 'SET_CONTRIBS',
  SET_SELECTED_REPOS: 'SET_SELECTED_REPOS',
  SET_SELECTED_CONTRIBS: 'SET_SELECTED_CONTRIBS'
}

/**
 * Merge and map contributors list and teams
 * contributors without a team is left in the 'Other' team
 * @param {Array} contribs 
 * @param {Array} teams
 */
export const mapContribsToTeam = (contribs, teams) => {
  const contribsWithoutTeam = [...contribs]

  const mapMember = ({ login, name, picture, avatar }) => ({
    login, name, avatar: (picture || avatar)
  })

  const mappedTeams = teams.reduce((acc, curr) => {
    const team = {
      id: curr.id,
      label: curr.name,
      options: curr.members.map(m => {
        const removeIndex = contribsWithoutTeam.findIndex(c => c.login === m.login)
        contribsWithoutTeam.splice(removeIndex, 1)
        return mapMember(m)
      })
    }
    return [ ...acc, team ]
  }, [])

  return [
    ...mappedTeams,
    {
      id: 'other',
      label: 'Other',
      options: contribsWithoutTeam.map(mapMember)
    }
  ]
}
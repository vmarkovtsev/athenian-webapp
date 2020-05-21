export const filterReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export const defaultFilter = {
  ready: false,
  repos: {
    data: [],
    ready: false,
    selected: new Set()
  },
  teams: {
    data: [],
    ready: false
  },
  contribs: {
    data: [],
    ready: false,
    selected: new Set()
  },
  dateInterval: null
}

export const TYPE = {
  SET_REPOS: 'SET_REPOS',
  SET_INTERVAL: 'SET_INTERVAL',
  SET_TEAMS: 'SET_TEAMS',
  SET_READY: 'SET_READY',
  SET_CONTRIBS: 'SET_CONTRIBS',
  SET_SELECTED_REPOS: 'SET_SELECTED_REPOS'
}

export const mapContribsToTeam = (contribs, teams) => {
  return teams.reduce((acc, curr) => {
    const team = {
      id: curr.id,
      label: curr.name,
      options: curr.members.map(m => ({
        login: m.login,
        name: m.name,
        avatar: m.picture
      }))
    }
    return [
      ...acc,
      team
    ]
  }, [])
}
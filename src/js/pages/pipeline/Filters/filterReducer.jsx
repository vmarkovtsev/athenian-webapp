const mapTeam = (contribs, teams) => {
  if (!teams.length) return contribs;
  return mapContribsToTeam(contribs, teams).reduce((acc, curr) => {
    return acc.concat(curr.options);
  }, []);
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case TYPE.INIT:
      const { ready, repos, contribs, teams } = action.payload;

      const initTeamsContribs = mapTeam(contribs, teams);
      return {
        ...state,
        ready,
        repos: {
          ready,
          data: repos,
          selected: repos,
          applied: repos,
        },
        contribs: {
          ready,
          data: initTeamsContribs,
          selected: initTeamsContribs,
          applied: initTeamsContribs,
        },
        teams: {
          ready,
          data: teams
        },
      };
    case TYPE.SET_INTERVAL:
      return {
        ...state,
        dateInterval: action.payload,
      };
    case TYPE.SET_REPOS:
      return {
        ...state,
        repos: {
          ...state.repos,
          ready: true,
          data: action.payload,
          selected: [],
        },
      };
    case TYPE.SET_TEAMS:
      return {
        ...state,
        teams: {
          ready: true,
          data: action.payload,
        },
      };
    case TYPE.READY:
      return {
        ...state,
        ready: action.payload,
      };
    case TYPE.SET_CONTRIBS:
      return {
        ...state,
        contribs: {
          ...state.contribs,
          ready: true,
          data: mapTeam(action.payload, state.teams.data)
        },
      };
    case TYPE.SET_SELECTED_REPOS:
      return {
        ...state,
        repos: {
          ...state.repos,
          selected: action.payload,
        },
      };
    case TYPE.SET_SELECTED_CONTRIBS:
      const [contrib] = action.payload
      // if action.payload was not formatted yet use mapTeam
      // contrib && contrib.team - value comes from onChange of select
      const selected = contrib && contrib.team ? action.payload : mapTeam(action.payload, state.teams.data)
      return {
        ...state,
        contribs: {
          ...state.contribs,
          selected
        },
      };
    case TYPE.SET_APPLIED_CONTRIBS:
      return {
        ...state,
        contribs: {
          ...state.contribs,
          applied: mapTeam(action.payload, state.teams.data)
        },
      };
    case TYPE.SET_APPLIED_REPOS:
      return {
        ...state,
        repos: {
          ...state.repos,
          applied: action.payload,
        },
      };
    default:
      return state;
  }
};

export const defaultFilter = {
  ready: false,
  repos: {
    data: [],
    ready: false,
    selected: [],
    applied: [],
  },
  teams: {
    data: [],
    ready: false,
  },
  contribs: {
    data: [],
    ready: false,
    selected: [],
    applied: [],
  },
  dateInterval: null,
};

export const TYPE = {
  INIT: "INIT",
  SET_REPOS: "SET_REPOS",
  SET_INTERVAL: "SET_INTERVAL",
  SET_TEAMS: "SET_TEAMS",
  SET_READY: "SET_READY",
  SET_CONTRIBS: "SET_CONTRIBS",
  SET_SELECTED_REPOS: "SET_SELECTED_REPOS",
  SET_SELECTED_CONTRIBS: "SET_SELECTED_CONTRIBS",
  SET_APPLIED_REPOS: "SET_APPLIED_REPOS",
  SET_APPLIED_CONTRIBS: "SET_APPLIED_CONTRIBS",
  READY: 'READY'
};

/**
 * Merge and map contributors list and teams
 * contributors without a team is left in the 'Other' team
 * @param {Array} contribs
 * @param {Array} teams
 */
export const mapContribsToTeam = (contribs, teams) => {
  if (!teams.length) return contribs;

  const mapMember = ({ login, name, picture, avatar }) => ({
    login,
    name,
    avatar: picture || avatar,
  });

  const teamsBlueprint = teams.map(({ name: label, members }) => {
    return {
      label,
      options: members
        // remove contributors not in the date range
        .filter(member => contribs.find(contrib => contrib.login === member.login))
        .map(member => ({ ...mapMember(member), team: label })),
    };
  });

  teamsBlueprint.push({
    label: "Other",
    options: [],
  });

  const otherTeam = teamsBlueprint.length - 1;

  const mappedTeams = contribs.reduce((teams, contributor) => {
    let isContributorAdded = false
    for (let { options } of teams) {
      const foundMember = options.find(member => member.login === contributor.login)
      if (foundMember) {
        isContributorAdded = true
        break
      }
    }

    if (!isContributorAdded) {
      teams[otherTeam].options.push({
        ...mapMember(contributor),
        team: 'Other'
      })
    }
    return teams
  }, teamsBlueprint)

  return mappedTeams;
};

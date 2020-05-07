import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SettingsGroup, Search, Accordion } from 'js/pages/Settings';

const names = ['Mario', 'Alvaro', 'Charles', 'Miro', 'Bill', 'Ursula', 'Fran', 'Blas'];
const groups = [{ name: 'web', size: 7 }, { name: 'qa', size: 2 }, { name: 'backend', size: 12 }];

const getRandomUser = () => {
  const name = names[Math.round(10 * Math.random()) % names.length];
  return {
    avatar: `https://randomuser.me/api/portraits/men/${1 + Math.round(10 * Math.random())}.jpg`,
    name,
    handler: `hanndler_${name}_${Math.round(10000 * Math.random())}`,
  };
};

const getRandomUsers = amount => Array.from(new Array(amount)).map(() => getRandomUser());

const getRandomGroups = groups => groups.map(group => (
  {
    ...group,
    members: getRandomUsers(group.size),
  }
));

const isFilteredIn = (user, term) => !term ||
  user.name.toLowerCase().includes(term.toLowerCase()) ||
  user.handler.toLowerCase().includes(term.toLowerCase());
const teams = getRandomGroups(groups);

export default () => {
  const [filterTermState, setFilterTermState] = useState('');
  return (
    <SettingsGroup title="Teams" extra={<AddTeam />}>
      <p className="text-secondary mt-2 mb-3">Manage and add teams for your organization</p>
      <Search
        placeholder="Find a team..."
        onFilter={setFilterTermState}
      />
      <Teams
        teams={teams}
        filterTerm={filterTermState}
      />
    </SettingsGroup>
  );
};

const AddTeam = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-orange"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        &#43; Add New Team
      </button>
      <form className="dropdown-menu dropdown-card dropdown-menu-right p-0">
        <div className="p-3">
          <h3 className="text-dark h6">New team</h3>
          <div className="form-group mt-3">
            <label htmlFor="groupName">Name:</label>
            <input type="email" className="form-control" id="groupName" />
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <div className="bg-white font-weight-light d-flex align-items-center justify-content-end p-3">
          <a className="text-s text-secondary mr-3" href>Cancel</a>
          <a href className="btn btn-orange">Add</a>
        </div>
      </form>
    </>
  );
};

const Teams = ({ teams, filterTerm }) => {
  return (
    <Accordion
      id="accordion"
      items={teams.map(team => ({
        title: team.name,
        description: `(${team.members.filter(user => isFilteredIn(user, filterTerm)).length} members)`,
        extra: <TeamActions team={team} filterTerm={filterTerm} />,
        content: <Team team={team} filterTerm={filterTerm} />,
      }))}
    />
  );
};

const TeamActions = ({ team, filterTerm }) => {
  return (
    <>
      <div className="mr-3">
        {team.members.map(user => isFilteredIn(user, filterTerm) && (
          <img src={user.avatar} className="pr-user-avatar" key={user.handler} alt="" />
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
          <a className="dropdown-item" href>Rename</a>
          <a className="dropdown-item" href>Remove</a>
        </div>
      </div>
    </>
  );
};

const Team = ({ team, filterTerm }) => {
  return (
    <ul className="list-group list-group-flush">
      {team.members.map(user => (
        <li
          className="list-group-item bg-white font-weight-normal"
          style={{ display: isFilteredIn(user, filterTerm) ? 'block' : 'none' }}
          key={user.handler}
        >
          <div className="row">
            <div className="col-6 d-flex">
              <img src={user.avatar} className="pr-user-avatar mr-2 ml-4" alt="" />
              <p className="text-dark text-truncate my-1">{user.name} ({user.handler})</p>
            </div>
            <div className="col-6 d-flex align-items-center">
              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
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
            &#43; Add user
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            USERS
          </div>
        </div>
      </li>
    </ul>
  );
}

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SettingsGroup, Search, Accordion } from 'js/pages/Settings';

const names = ['Mario', 'Alvaro', 'Charles', 'Miró', 'Bill', 'Ursula', 'Fran', 'Blas'];
const groups = [{ name: 'web', size: 7 }, { name: 'qa', size: 2 }, { name: 'backend', size: 12 }];

const getRandomUser = () => ({
  avatar: `https://randomuser.me/api/portraits/men/${1 + Math.round(10 * Math.random())}.jpg`,
  name: names[Math.round(10 * Math.random()) % names.length],
});

const getRandomUsers = amount => Array.from(new Array(amount)).map(() => getRandomUser());

const getRandomGroups = groups => groups.map(group => (
  {
    ...group,
    members: getRandomUsers(group.size),
  }
));

export default () => {
  const teams = getRandomGroups(groups);
  return (
    <SettingsGroup title="Teams" extra={<AddTeam />}>
      <p className="text-secondary mt-2 mb-3">Manage and add teams for your organization</p>
      <Search placeholder="Find a team..." />
      <Teams teams={teams} />
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

const Teams = ({ teams }) => {
  return (
    <Accordion
      id="accordion"
      items={teams.map(team => ({
        title: team.name,
        description: `${team.size} members`,
        extra: <TeamActions team={team} />,
        content: <Team team={team} />,
      }))}
    />
  );
};

const TeamActions = ({ team }) => {
  return (
    <>
      <div className="mr-3">
        {team.members.map(user => (
          <img src={user.avatar} className="pr-user-avatar" alt="" />
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

const Team = ({ team }) => {
  return (
    <ul className="list-group list-group-flush">
      {team.members.map(user => (
        <li className="list-group-item bg-white font-weight-normal">
          <div className="row">
            <div className="col-6 d-flex">
              <img src={user.avatar} className="pr-user-avatar mr-2 ml-4" alt="" />
              <p className="text-dark text-truncate my-1">{user.name}</p>
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

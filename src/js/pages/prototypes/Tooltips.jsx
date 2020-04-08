import React from 'react';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'

import chart01 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart01.png';
import chart02 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart02.png';
import chart03 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart03.png';
import chart04 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart04.png';
import chart05 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart05.png';
import chart06 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart06.png';
import chart07 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart07.png';
import chart08 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart08.png';
import chart10 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart10.png';

import {
  TooltipContainer,
  Group,
  BigText,
  SmallTitle,
  SmallDate,
  PullRequestRepoTitle,
  Icon,
  UserAvatar,
  PRCommentsStats,
} from 'js/components/charts/Tooltip';
import moment from 'moment';

const SmallText = ({ content }) => (
  <span className="font-weight-bold d-inline-block align-middle text-dark text-m">
    {content}
  </span>
);

const ReleaseStats = ({ PRs, additions, removals }) => (
  <p className="text-s m-0">
    <Icon icon={faCodeBranch} className="text-green" />
    <span className="text-secondary mr-2">{PRs}</span>
    <span className="mr-1 text-green">+{additions}</span>
    <span className="text-danger">-{removals}</span>
  </p>
);

const Release = ({ project, version }) => (
  <span className="text-dark text-m align-middle">
    <span>{project} </span>
    <span className="text-secondary">{version}</span>
  </span>
);

export default () => {
  return (
    <div>
      <div className="row">
        <div className="col-12 mb-3">
          <p className="text-centerleft font-weight-light text-dark text-lg">Tooltips</p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mr-2 mb-2">Pull requests</h4>

          <img className="mb-2" src={chart01} alt="" width="620" />

          <p className="font-weight-light text-m mt-2 mb-3">Regular Pull Request</p>

          <TooltipContainer left>
            <Group>
              <SmallTitle uppercase content="#458" />
              <PullRequestRepoTitle repo="src-d/go-git" title="git: remove potentially duplicate check for unstaged files" />
            </Group>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" middleText="6 hours ago by" size="18" />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">Pull Request waiting for Review</p>

          <TooltipContainer left>
            <Group>
              <SmallTitle uppercase content="#458" />
              <PullRequestRepoTitle repo="src-d/go-git" title="git: remove potentially duplicate check for unstaged files" />
            </Group>
            <Group className="text-orange">
              <Icon icon={faClock} />
              <span>Waiting review for 16 hours</span>
            </Group>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" middleText="Created by" size="18" />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">Pull Request Reviewed</p>

          <TooltipContainer left>
            <Group>
              <SmallTitle uppercase content="#458" />
              <PullRequestRepoTitle repo="src-d/go-git" title="git: remove potentially duplicate check for unstaged files" />
            </Group>
            <Group className="text-turquoise">
              <Icon icon={faClock} />
              <span>Waited review for 7 hours</span>
            </Group>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" middleText="Created by" size="18" />
            </Group>
          </TooltipContainer>

        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mt-3 mr-2 mb-4">User tooltips</h4>

          <img className="mb-2" src={chart02} alt="" width="620" />

          <p className="font-weight-light text-m mt-2 mb-3">User with PRs and comments</p>

          <TooltipContainer>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" />
            </Group>
            <Group>
              <PRCommentsStats prs={10} comments={8} />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">User Reviews comments</p>

          <TooltipContainer>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" />
            </Group>
            <Group>
              <SmallTitle uppercase content="Reviews comments" />
              <BigText content={23} extra="75%" />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-2">User Reviews</p>

          <TooltipContainer>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" />
            </Group>
            <Group>
              <SmallTitle uppercase content="Reviews" />
              <BigText content={15} extra="35%" />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">User Icon</p>

          <TooltipContainer>
            <Group>
              <UserAvatar src="https://randomuser.me/api/portraits/women/44.jpg" name="jennifer_38" />
            </Group>
          </TooltipContainer>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mt-5 mr-2 mb-4">Lead Time + 4 Summary Line Charts + Wait time for 1st Review</h4>

          <img className="mb-2" src={chart03} alt="" width="620" /><br />

          <img className="mb-2" src={chart06} alt="" width="620" />

          <p className="font-weight-light text-m mt-2 mb-3">One date with time</p>

          <TooltipContainer left>
            <Group>
              <SmallTitle content={<SmallDate date={moment('2020-03-23')} />} />
              <BigText content="6 hours" />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">One date, time and pull requests</p>

          <TooltipContainer left>
            <Group>
              <SmallTitle content={<SmallDate date={moment('2020-03-23')} />} />
              <BigText content="35min" />
              <p className="align-middle text-dark text-m">6 pull requests</p>
            </Group>
          </TooltipContainer>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mt-5 mr-2 mb-4">Pull Request Ratio Flow</h4>

          <img className="mb-2" src={chart04} alt="" width="620" />

          <p className="font-weight-light text-m mt-2 mb-3">PR Ratio Flow</p>

          <TooltipContainer>
            <Group>
              <SmallTitle content={<SmallDate date={moment('2020-03-23')} />} />
              <BigText content="7/5" extra={1.4} />
            </Group>
          </TooltipContainer>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mt-5 mr-2 mb-4">Most Active Developers</h4>

          <img className="mb-2" src={chart05} alt="" width="620" />

          <p className="font-weight-light text-m mt-5 mb-3">Pull Requests Created</p>

          <TooltipContainer>
            <Group>
              <SmallTitle uppercase content="Pull Requests" />
              <BigText content={19} />
            </Group>
          </TooltipContainer>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mr-2 mb-4">Merge Delays</h4>

          <img className="mb-2" src={chart07} alt="" width="620" />

          <p className="font-weight-light text-m mt-5 mb-3">Time to merge</p>

          <TooltipContainer>
            <Group>
              <span className="text-secondary text-m align-middle">athenian/api</span>
            </Group>
            <Group>
              <p className="text-m text-dark m-0">
                <Icon icon={faClock} className="text-blue" />
                <span>10.3 hours</span>
              </p>
            </Group>
          </TooltipContainer>

        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mr-2 mt-5">Text and numbers</h4>

          <img className="mb-2" src={chart08} alt="" width="620" /><br />

          <p className="font-weight-light text-m mt-5 mb-3">One title and one number</p>

          <TooltipContainer>
            <Group>
              <SmallTitle uppercase content="PRs Created" />
              <BigText content={49} />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">Two titles and two numbers</p>

          <TooltipContainer left>
            <Group>
              <SmallTitle uppercase content="Average time to merge" />
              <SmallText content="18 hours" />
            </Group>
            <Group>
              <SmallTitle uppercase content="Developers with merge privileges" />
              <SmallText content={6} />
            </Group>
          </TooltipContainer>

        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mr-2">Repositories</h4>

          <p className="font-weight-light text-m mt-5 mb-3">Single repository</p>

          <TooltipContainer>
            <Group>
              <span className="text-secondary text-m align-middle">athenian/api</span>
            </Group>
            <Group>
              <p className="text-m text-dark m-0">
                <Icon icon={faClock} className="text-blue" />
                <span className="mr-3">38 min</span>
                <Icon icon={faUser} className="text-secondary" />
                <span>5</span></p>
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">Multiple repositories</p>

          <TooltipContainer >
            <Group>
              <span className="text-secondary text-m align-middle">5 repositories</span>
            </Group>
            <Group>
              <p className="text-m text-dark m-0">
                <Icon icon={faClock} className="text-orange" />
                <span className="mr-3">38 min</span>
                <Icon icon={faUser} className="text-secondary" />
                <span>5</span></p>
            </Group>
          </TooltipContainer>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <h4 className="text-centerleft text-dark font-weight-light mr-2">Releases</h4>

          <img className="mb-2" src={chart10} alt="" width="620" /><br />

          <p className="font-weight-light text-m mt-5 mb-3">Single release</p>

          <TooltipContainer>
            <Group>
              <Release project="webapp" version="v1.3.2" />
            </Group>
            <Group>
              <ReleaseStats PRs={9} additions={1543} removals={504} />
            </Group>
          </TooltipContainer>

          <p className="font-weight-light text-m mt-5 mb-3">Multiple releases</p>

          <TooltipContainer>
            <Group>
              <Release project="webapp" version="v1.3.2" />
            </Group>
            <Group>
              <ReleaseStats PRs={9} additions={1543} removals={504} />
            </Group>
            <Group className="mt-3">
              <Release project="api" version="v1.4.0" />
            </Group>
            <Group>
              <ReleaseStats PRs={5} additions={328} removals={139} />
            </Group>
          </TooltipContainer>
        </div>
      </div>
    </div >
  );
};

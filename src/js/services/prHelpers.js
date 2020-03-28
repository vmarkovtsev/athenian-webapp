import { github } from 'js/services/format';

export const PR_STATUS = {
  OPENED: 'opened',
  MERGED: 'merged',
  CLOSED: 'closed',
};


export default pr => {
  const status = extractStatus(pr);

  const { authors, mergers, commentersReviewers } = extractParticipantsByKind(pr);

  return {
    ...pr,
    status,
    authors,
    mergers,
    commentersReviewers,
    organization: github.repoOrg(pr.repository),
    repo: github.repoName(pr.repository),
    created: new Date(pr.created),
    updated: new Date(pr.updated),
    closed: new Date(pr.closed),
  }
};

const extractParticipantsByKind = pr => pr.participants.reduce((acc, participant) => {
  if (participant.status.indexOf('author') >= 0) {
    acc.authors.push(participant.id);
    return acc;
  }

  if (participant.status.indexOf('merger') >= 0) {
    acc.mergers.push(participant.id);
  }

  if (participant.status.indexOf('reviewer') >= 0 || participant.status.indexOf('commenter') >= 0) {
    acc.commentersReviewers.push(participant.id);
  }

  return acc;
}, { authors: [], commentersReviewers: [], mergers: [] });

const extractStatus = pr => {
  if (pr.merged) {
    return PR_STATUS.MERGED;
  } else if (pr.closed) {
    return PR_STATUS.CLOSED;
  } else {
    return PR_STATUS.OPENED;
  }
};

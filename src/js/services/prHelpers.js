import { github } from 'js/services/format';

export const PR_STAGE = {
  WIP: 'wip',
  REVIEW: 'review',
  MERGE: 'merge',
  RELEASE: 'release',
  DONE: 'done',
  COMPLETE: {
    WIP: 'wip-complete',
    REVIEW: 'review-complete',
    MERGE: 'merge-complete',
    RELEASE: 'release-complete',
  },
};

export const PR_EVENT = {
  CREATION: 'created',
  COMMIT: 'commit_happened',
  REVIEW_REQUEST: 'review_requested', // Transitions to 'review' Stage
  REVIEW: 'review_happened',
  APPROVE: 'approve_happened',        // Transitions to 'merge' Stage
  MERGE: 'merge_happened',            // Transitions to 'release' Stage
  RELEASE: 'release_happened',        // Transitions to 'done' Stage
};

export const PR_STATUS = {
  OPENED: 'opened',
  MERGED: 'merged',
  CLOSED: 'closed',
};

const realEvents = Object.keys(PR_EVENT).map(eventKey => PR_EVENT[eventKey]);

export default pr => {
  // TODO(dpordomingo): This won't be needed once 'pr.properties' are split into 'pr.stage' and 'pr.events'
  const events = extractEvents(pr);

  const completedStages = extractCompletedStages(events);
  const status = extractStatus(pr);

  const { authors, mergers, commentersReviewers } = extractParticipantsByKind(pr);

  return {
    ...pr,
    events,
    status,
    completedStages,
    authors,
    mergers,
    commentersReviewers,
    organization: github.repoOrg(pr.repository),
    repo: github.repoName(pr.repository),
    created: new Date(pr.created),
    updated: new Date(pr.updated),
    closed: pr.closed && new Date(pr.closed),
    merged: pr.merged && new Date(pr.merged),
    released: pr.released && new Date(pr.released),
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

const extractEvents = pr => {
  const events = pr.properties.filter(property => realEvents.indexOf(property) >= 0);
  if (pr.review_requested) {
    events.push(PR_EVENT.REVIEW_REQUEST);
  }

  return events;
};

const extractStatus = pr => {
  if (pr.merged) {
    return PR_STATUS.MERGED;
  } else if (pr.closed) {
    return PR_STATUS.CLOSED;
  } else {
    return PR_STATUS.OPENED;
  }
};

const extractCompletedStages = events => {
  if (events.indexOf(PR_EVENT.RELEASE) >= 0) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW,
      PR_STAGE.COMPLETE.MERGE,
      PR_STAGE.COMPLETE.RELEASE
    ];
  } else if (events.indexOf(PR_EVENT.MERGE) >= 0) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW,
      PR_STAGE.COMPLETE.MERGE,
    ];
  } else if (events.indexOf(PR_EVENT.APPROVE) >= 0) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW,
    ];
  } else if (events.indexOf(PR_EVENT.REVIEW_REQUEST) >= 0) {
    return [
      PR_STAGE.COMPLETE.WIP,
    ];
  }

  return [];
}

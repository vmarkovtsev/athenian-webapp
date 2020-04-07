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
  REVIEW_REQUEST: 'review_request_happened', // Transitions to 'review' Stage
  REVIEW: 'review_happened',
  REJECTION: 'changes_request_happened',
  APPROVE: 'approve_happened',               // Transitions to 'merge' Stage
  MERGE: 'merge_happened',                   // Transitions to 'release' Stage
  RELEASE: 'release_happened',               // Transitions to 'done' Stage
};

export const PR_STATUS = {
  OPENED: 'opened',
  MERGED: 'merged',
  CLOSED: 'closed',
};

// These are the PR labels that will appear in PR tables depending on pr status/stage/events
// and depending from which stage the PR is analyzed (see: https://athenianco.atlassian.net/browse/ENG-325)
export const PR_LABELS = {
  WIP: 'Work in Progress',
  WIP_DONE: 'Work Submitted',
  REVIEW_PENDING: 'Review Required',
  REVIEW_SUBMITTED: 'Review Submitted',
  REVIEW_REJECTED: 'Changes Requested',
  REVIEW_APPROVAL: 'Review Approved',
  MERGE_PENDING: 'Waiting for Merge',
  MERGE_COMPLETED: 'Merged',
  RELEASE_PENDING: 'Waiting for Release',
  RELEASE_COMPLETED: 'Released',
  CLOSED: 'Closed',
};

export const PR_LABELS_CLASSNAMES = {
  [PR_LABELS.WIP]: 'label-wip',
  [PR_LABELS.WIP_DONE]: 'label-review-requested',
  [PR_LABELS.REVIEW_PENDING]: 'label-review-pending',
  [PR_LABELS.REVIEW_SUBMITTED]: 'label-review-submitted',
  [PR_LABELS.REVIEW_REJECTED]: 'label-review-rejected',
  [PR_LABELS.REVIEW_APPROVAL]: 'label-review-approval',
  [PR_LABELS.MERGE_PENDING]: 'label-merge-pending',
  [PR_LABELS.MERGE_COMPLETED]: 'label-merged',
  [PR_LABELS.RELEASE_PENDING]: 'label-release-pending',
  [PR_LABELS.RELEASE_COMPLETED]: 'label-released',
  [PR_LABELS.CLOSED]: 'label-closed',
};

const realEvents = Object.keys(PR_EVENT).map(eventKey => PR_EVENT[eventKey]);

export default pr => {
  // TODO(dpordomingo): This won't be needed once 'pr.properties' are split into 'pr.stage' and 'pr.events'
  const events = extractEvents(pr);

  const completedStages = extractCompletedStages(pr);
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
    review_requested: pr.review_requested && new Date(pr.review_requested),
    approved: pr.approved && new Date(pr.approved),
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

const extractEvents = pr => pr.properties.filter(property => realEvents.indexOf(property) >= 0);

const extractStatus = pr => {
  if (pr.merged) {
    return PR_STATUS.MERGED;
  } else if (pr.closed) {
    return PR_STATUS.CLOSED;
  } else {
    return PR_STATUS.OPENED;
  }
};

const extractCompletedStages = pr => {
  if (pr.merged && pr.stage === PR_STAGE.DONE) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW,
      PR_STAGE.COMPLETE.MERGE,
      PR_STAGE.COMPLETE.RELEASE
    ];
  } else if (pr.stage === PR_STAGE.DONE) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW
    ];
  } else if (pr.stage === PR_STAGE.RELEASE) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW,
      PR_STAGE.COMPLETE.MERGE,
    ];
  } else if (pr.stage === PR_STAGE.MERGE || pr.properties.indexOf(PR_EVENT.APPROVE) >= 0) {
    return [
      PR_STAGE.COMPLETE.WIP,
      PR_STAGE.COMPLETE.REVIEW,
    ];
  } else if (pr.stage === PR_STAGE.REVIEW || pr.properties.indexOf(PR_EVENT.REVIEW_REQUEST) >= 0) {
    return [
      PR_STAGE.COMPLETE.WIP,
    ];
  }

  return [];
}

export const prLabel = stage => pr => {
  if (pr.status === PR_STATUS.CLOSED) {
    return PR_LABELS.CLOSED;
  }

  switch (stage) {
    case PR_STAGE.WIP:
      if (pr.completedStages.includes(PR_STAGE.COMPLETE.WIP)) {
        return PR_LABELS.WIP_DONE;
      }
      return PR_LABELS.WIP;
    case PR_STAGE.REVIEW:
      if (pr.completedStages.includes(PR_STAGE.COMPLETE.REVIEW)) {
        return PR_LABELS.REVIEW_APPROVAL;
      } else if (pr.events.includes(PR_EVENT.REVIEW)) {
        return PR_LABELS.REVIEW_REJECTED;
      }
      return PR_LABELS.REVIEW_PENDING;
    case PR_STAGE.MERGE:
      if (pr.completedStages.includes(PR_STAGE.COMPLETE.MERGE)) {
        return PR_LABELS.MERGE_COMPLETED;
      }
      return PR_LABELS.MERGE_PENDING;
    case PR_STAGE.RELEASE:
      if (pr.completedStages.includes(PR_STAGE.COMPLETE.RELEASE)) {
        return PR_LABELS.RELEASE_COMPLETED;
      }
      return PR_LABELS.RELEASE_PENDING;
    case PR_STAGE.DONE:
      if (pr.completedStages.includes(PR_STAGE.COMPLETE.RELEASE)) {
        return PR_LABELS.RELEASE_COMPLETED;
      }
      return PR_LABELS.CLOSED;
    default:
      if (pr.completedStages.includes(PR_STAGE.COMPLETE.RELEASE)) {
        return PR_LABELS.RELEASE_COMPLETED;
      } else if (pr.completedStages.includes(PR_STAGE.COMPLETE.MERGE)) {
        return PR_LABELS.RELEASE_PENDING;
      } else if (pr.completedStages.includes(PR_STAGE.COMPLETE.REVIEW)) {
        return PR_LABELS.MERGE_PENDING;
      } else if (pr.events.includes(PR_EVENT.REVIEW)) {
        return PR_LABELS.REVIEW_REJECTED;
      } else if (pr.completedStages.includes(PR_STAGE.COMPLETE.WIP)) {
        return PR_LABELS.REVIEW_PENDING;
      }
      return PR_LABELS.WIP;
  }
};

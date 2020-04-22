import { github } from 'js/services/format';

import _ from 'lodash';

export const PR_STATUS = {
  OPENED: 'opened',
  MERGED: 'merged',
  CLOSED: 'closed',
};

export const PR_STAGE = {
    WIP: 'wip',
    REVIEW: 'review',
    MERGE: 'merge',
    RELEASE: 'release',
    DONE: 'done',
};

const PR_STAGE_API_MAPPING = {
    wip: PR_STAGE.WIP,
    reviewing: PR_STAGE.REVIEW,
    merging: PR_STAGE.MERGE,
    releasing: PR_STAGE.RELEASE,
    done: PR_STAGE.DONE
};

const PR_STAGE_TIMELINE = [
    PR_STAGE.WIP,
    PR_STAGE.REVIEW,
    PR_STAGE.MERGE,
    PR_STAGE.RELEASE,
    PR_STAGE.DONE,
];

export const PR_EVENT = {
  CREATION: 'created',
  COMMIT: 'commit_happened',
  REVIEW_REQUEST: 'review_request_happened',
  REVIEW: 'review_happened',
  REJECTION: 'changes_request_happened',
  APPROVE: 'approve_happened',
  MERGE: 'merge_happened',
  RELEASE: 'release_happened',
};

const PR_STAGE_EVENTS = {
    [PR_STAGE.WIP]: {
        start: PR_EVENT.COMMIT,
        end: PR_EVENT.REVIEW_REQUEST,
        others: [PR_EVENT.CREATION],
    },
    [PR_STAGE.REVIEW]: {
        start: PR_EVENT.REVIEW_REQUEST,
        end: PR_EVENT.APPROVE,
        others: [PR_EVENT.REVIEW, PR_EVENT.REJECTION],
    },
    [PR_STAGE.MERGE]: {
        start: PR_EVENT.APPROVE,
        end: PR_EVENT.MERGE,
        others: []
    },
    [PR_STAGE.RELEASE]: {
        start: PR_EVENT.MERGE,
        end: PR_EVENT.RELEASE,
        others: []
    },
    [PR_STAGE.DONE]: {
        start: null,
        end: null,
        others: []
    },
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
  REVIEW_SKIPPED: 'Not Reviewed',
  REVIEW_IGNORED: 'Review Ignored',
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
  [PR_LABELS.REVIEW_SKIPPED]: 'label-review-skipped',
  [PR_LABELS.REVIEW_IGNORED]: 'label-review-ignored',
  [PR_LABELS.MERGE_PENDING]: 'label-merge-pending',
  [PR_LABELS.MERGE_COMPLETED]: 'label-merged',
  [PR_LABELS.RELEASE_PENDING]: 'label-release-pending',
  [PR_LABELS.RELEASE_COMPLETED]: 'label-released',
  [PR_LABELS.CLOSED]: 'label-closed',
};

export default pr => {
  const status = extractStatus(pr);
  const { authors, mergers, commentersReviewers } = extractParticipantsByKind(pr);
  const stage_timings = extractStageTimings(pr);

  pr.properties = _(pr.properties).map(p => PR_STAGE_API_MAPPING[p] || p).value();
  const completedStages = extractCompletedStages(pr);

  return {
    ...pr,
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
    stage_timings,
  };
};

const extractStageTimings = pr => _(pr.stage_timings)
      .pickBy()
      .mapValues(v => parseInt(v.slice(0, v.length - 1)))
      .value();

const extractParticipantsByKind = pr => pr.participants.reduce((acc, participant) => {
  const has_status = status => participant.status.includes(status);
  if (has_status('merger')) {
    acc.mergers.push(participant.id);
  }

  if (has_status('author')) {
    acc.authors.push(participant.id);
    return acc;
  }

  if (has_status('reviewer') || has_status('commenter')) {
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

export const happened = (pr, event) => pr.properties.includes(event);

export const authored = prs => prs.filter(pr => pr.participants.filter(dev => dev.status.includes('author')).length);

export const isInStage = (pr, stage) => (
    stageHappening(pr, stage) || stageHappened(pr, stage)
);
const stageHappening = (pr, stage) => _(pr.properties)
      .includes(stage);
const stageCompleted = (pr, stage) => _(pr.properties)
      .includes(PR_STAGE_EVENTS[stage].end);
const stageHappened = (pr, stage) => {
    if (stageCompleted(pr, stage)) {
        return true;
    }

    if (stage === 'MERGE' && pr.status === PR_STATUS.CLOSED) {
        return true;
    }

    const events = PR_STAGE_EVENTS[stage];
    return (
        _(pr.properties).includes(events.start) ||
            _(pr.properties).intersection(events.others).length > 0
    );
};

const getCurrentStageHappening = (pr) => {
    for (const s of PR_STAGE_TIMELINE) {
        if (stageHappening(pr, s)) {
            return s;
        }
    };

    throw Error("no stage happening");
};

const getFirstStageHappened = (pr) => {
    for (const s of PR_STAGE_TIMELINE) {
        if (stageHappened(pr, s)) {
            return s;
        }
    };

    // no events happened in current interval
    return null;
};

const extractCompletedStages = pr => {
    const firstStageHapened = getFirstStageHappened(pr);
    if (!firstStageHapened) {
        return [];
    }

    const currentStage = getCurrentStageHappening(pr);

    const firstStageIndex = _(PR_STAGE_TIMELINE).indexOf(firstStageHapened);
    const currentStageIndex = _(PR_STAGE_TIMELINE).indexOf(currentStage);

    return PR_STAGE_TIMELINE.slice(firstStageIndex, currentStageIndex);
};

export const prLabel = stage => pr => {
    if (pr.status === PR_STATUS.CLOSED) {
        return PR_LABELS.CLOSED;
    }

    const hasCompletedStage = stage => pr.completedStages.includes(stage);
    const isStageHappening = stage => stageHappening(pr, stage);

    switch (stage) {
    case PR_STAGE.WIP:
        if (hasCompletedStage(PR_STAGE.WIP)) {
            return PR_LABELS.WIP_DONE;
        }

        return PR_LABELS.WIP;
    case PR_STAGE.REVIEW:
        if (hasCompletedStage(PR_STAGE.REVIEW)) {
            if (pr.properties.includes(PR_EVENT.APPROVE)) {
                return PR_LABELS.REVIEW_APPROVAL;
            } else if (pr.properties.includes(PR_EVENT.REJECTION)) {
                return PR_LABELS.REVIEW_REJECTED;
            } else if (!pr.properties.includes(PR_EVENT.REVIEW)) {
                return PR_LABELS.REVIEW_SKIPPED;
            } else {
                return PR_LABELS.REVIEW_IGNORED;
            }
        }

        return PR_LABELS.REVIEW_PENDING;
    case PR_STAGE.MERGE:
        if (hasCompletedStage(PR_STAGE.MERGE)) {
            return PR_LABELS.MERGE_COMPLETED;
        }

        return PR_LABELS.MERGE_PENDING;
    case PR_STAGE.RELEASE:
        if (hasCompletedStage(PR_STAGE.RELEASE)) {
            return PR_LABELS.RELEASE_COMPLETED;
        }

        return PR_LABELS.RELEASE_PENDING;
    default:
        if (pr.completedStages.length === 0) {
            if (isStageHappening(PR_STAGE.RELEASE)) {
                return PR_LABELS.RELEASE_PENDING;
            } else if (isStageHappening(PR_STAGE.MERGE)) {
                return PR_LABELS.MERGE_PENDING;
            }  else if (isStageHappening(PR_STAGE.REVIEW)) {
                if (pr.properties.includes(PR_EVENT.REJECTION)) {
                    return PR_LABELS.REVIEW_REJECTED;
                } else {
                    return PR_LABELS.REVIEW_PENDING;
                }
            }

            return PR_LABELS.WIP;
        }

        if (hasCompletedStage(PR_STAGE.RELEASE)) {
            return PR_LABELS.RELEASE_COMPLETED;
        } else if (hasCompletedStage(PR_STAGE.MERGE)) {
            return PR_LABELS.RELEASE_PENDING;
        } else if (hasCompletedStage(PR_STAGE.REVIEW)) {
            return PR_LABELS.MERGE_PENDING;
        } else if (pr.properties.includes(PR_EVENT.REJECTION)) {
            return PR_LABELS.REVIEW_REJECTED;
        } else if (hasCompletedStage(PR_STAGE.WIP)) {
            return PR_LABELS.REVIEW_PENDING;
        }

        return PR_LABELS.WIP;
    }
};

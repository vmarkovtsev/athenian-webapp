# SummaryMetrics

Design doc at https://docs.google.com/document/d/1DXLVz4L1Ag9sOUMAKdRRgVh1fk6peUrvVIp2xzeCRzQ

## Common for all the stages

- AVG:
    requested separatelly
- %:
  ```
  100 x Avg.stage / LeadTime
  ```

## WIP
- Created PRs: Pull Requests Created
  ```
  prs.filter(from<pr.created<to).count
  ```
- Contributors: Number of PR creators of PRs created during the period selected
  ```
  prs.filter(from<pr.created<to).creators.distinct.count
  ```
- Repos: where commits have been pushed during the time period selected
  ```
  prs.filter(from<pr.created<to).repos.distinct.count
  ```

## Review
- Reviewed PRs: Pull Requests Reviewed (PRs where a review has been submitted or a regular comment posted)
  ```
  prs.filter(pr.stage>=review).having(comments|reviews).count
  ```
- Reviewers: authors of one review or regular comment among the Reviewed PRs
  ```
  prs.filter(pr.stage>=review).participants.filter(p.status.oneOf(reviewer,commenter)).distinct.count
  ```
- Repos: where such comments have been posted
  ```
  prs.filter(pr.stage>=review).having(comments|reviews).repos.distinct.count
  ```

## Merge
- Merged PRs:
  ```
  prs.filter(pr.merged=true).count
  ```
- Contributors: Number of “mergers”
  ```
  prs.filter(pr.merged=true).merger.distinct.count
  ```
- Repos: where such merges have happened
  ```
  prs.filter(pr.merged=true).repos.distinct.count
  ```

## Release
- Released PRs: Pull Requests Released (PRs part of releases that happened during the time period selected)
  ```
  prs.filter(pr.stage=done&&pr.merged).count
  ```
- Releases:
  ```
  NOT-POSSIBLE; Should come from upcoming /releases endpoint
  ```
- Repos: Where a release happened
  ```
  prs.filter(pr.stage=done&&pr.merged).repos.distinct.count
  ```


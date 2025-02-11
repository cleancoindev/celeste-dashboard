import actions from '../../actions/court-action-types'

import iconHny from './assets/activity-icon-hny.svg'
import iconAppealRuling from './assets/activity-icon-appeal-ruling.svg'
import iconClaimRewards from './assets/activity-icon-claim-rewards.svg'
import iconCommitVote from './assets/activity-icon-commit-vote.svg'
import iconCourtLogo from './assets/activity-icon-court-logo.svg'
import iconDraftJury from './assets/activity-icon-draft-jury.svg'
import iconExecuteRuling from './assets/activity-icon-execute-ruling.svg'

// The different types of activity
const ACTIVITY_TYPES = {
  [actions.APPROVE_FEE_DEPOSIT]: {
    icon: iconHny,
    title: 'Approve fee deposit',
  },
  [actions.ACTIVATE_ANJ]: {
    icon: iconHny,
    title: 'Activate ANJ',
  },
  [actions.APPEAL_RULING]: {
    title: 'Appeal ruling',
    icon: iconAppealRuling,
  },
  [actions.CLAIM_REWARDS]: {
    title: 'Claim rewards',
    icon: iconClaimRewards,
  },
  [actions.CLAIM_SUBSCRIPTION_FEES]: {
    title: 'Claim Subscription rewards',
    icon: iconClaimRewards,
  },
  [actions.COMMIT_VOTE]: {
    title: 'Commit vote',
    icon: iconCommitVote,
  },
  [actions.CONFIRM_APPEAL]: {
    title: 'Confirm appeal',
    icon: iconAppealRuling,
  },
  [actions.DEACTIVATE_ANJ]: {
    icon: iconHny,
    title: 'Deactivate ANJ',
  },
  [actions.DRAFT_JURY]: {
    title: 'Draft jury',
    icon: iconDraftJury,
  },
  [actions.EXECUTE_RULING]: {
    title: 'Execute ruling',
    icon: iconExecuteRuling,
  },
  [actions.HEARTBEAT]: {
    title: 'Update term',
    icon: iconCourtLogo,
  },
  [actions.LEAK_VOTE]: {
    title: 'Leak vote',
    icon: iconCommitVote,
  },
  [actions.REVEAL_VOTE]: {
    title: 'Reveal vote',
    icon: iconHny,
  },
  [actions.SETTLE_REWARD]: {
    icon: iconHny,
    title: 'Settle reward',
  },
  [actions.SETTLE_APPEAL_DEPOSIT]: {
    icon: iconHny,
    title: 'Settle appeal deposit',
  },
  [actions.WITHDRAW_ANJ]: {
    icon: iconHny,
    title: 'Withdraw ANJ',
  },
}

export function getActivityData(type) {
  return ACTIVITY_TYPES[type]
}

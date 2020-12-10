// Disputable apps extractors
import {
  convictionVotingExtractor,
  dandelionVotingExtractor,
  delayExtractor,
  votingExtractor,
} from './scriptExtractors'
import {
  CONVICTION_VOTING_APP_IDS,
  DANDELION_VOTING_APP_IDS,
  DELAY_APP_IDS,
  VOTING_APP_IDS,
} from './known-appIds'

const disputableVotingAction = {
  entityPath: 'vote',
  scriptExtractor: votingExtractor,
}

const disputableDandelionAction = {
  entityPath: 'vote',
  scriptExtractor: dandelionVotingExtractor,
}

const disputableDelayAction = {
  entityPath: 'delay',
  scriptExtractor: delayExtractor,
}

const disputableConvictionVotingAction = {
  entityPath: 'proposal',
  scriptExtractor: convictionVotingExtractor,
}

// Mapping of all disputable apps appId to their
// corresponding method for describing a disputed action.
// TODO: Add Conviction Voting
export const DISPUTABLE_ACTIONS = new Map([
  ...DANDELION_VOTING_APP_IDS.map(appId => [appId, disputableDandelionAction]),
  ...DELAY_APP_IDS.map(appId => [appId, disputableDelayAction]),
  ...VOTING_APP_IDS.map(appId => [appId, disputableVotingAction]),
  ...CONVICTION_VOTING_APP_IDS.map(appId => [
    appId,
    disputableConvictionVotingAction,
  ]),
])

// Mapping of all disputable apps appId to their
// corresponding subgraph urls by network
export const DISPUTABLE_SUBGRAPH_URLS = new Map([
  ...VOTING_APP_IDS.map(appId => [
    appId,
    {
      main:
        'https://graph.backend.aragon.org/subgraphs/name/aragon/aragon-dvoting-mainnet-staging', // TODO: Update to main subgraph when available
      rinkeby:
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-dvoting-rinkeby',
      ropsten:
        'https://api.thegraph.com/subgraphs/name/aragon/aragon-dvoting-ropsten',
    },
  ]),
])

import { getContract } from '../web3-contracts'
import { performDisputableVotingQuery } from './queries'

import erc20Abi from '../abi/ERC20.json'
import disputableDandelionVotingAbi from '../abi/disputables/DisputableDandelionVoting.json'
import disputableDelayAbi from '../abi/disputables/DisputableDelay.json'
import disputableConvictionVotingAbi from '../abi/disputables/DisputableConvictionVoting.json'
import { formatTokenAmount } from '../lib/math-utils'

export function delayExtractor(disputableAddress, disputableActionId) {
  return extractFromContract(
    disputableDelayAbi,
    disputableAddress,
    disputableActionId,
    'delayedScripts',
    4
  )
}

export function dandelionVotingExtractor(
  disputableAddress,
  disputableActionId
) {
  return extractFromContract(
    disputableDandelionVotingAbi,
    disputableAddress,
    disputableActionId,
    'getVote',
    10
  )
}

export async function votingExtractor(
  disputableAddress,
  disputableActionId,
  disputableAppId
) {
  const { data } = await performDisputableVotingQuery(
    disputableAddress,
    disputableActionId,
    disputableAppId
  )

  if (!data?.disputableVoting?.votes?.length) {
    throw new Error('Failed to fetch evmScript from subgraph')
  }

  return { script: data.disputableVoting.votes[0].script }
}

// Sinnce conviction voting proposals don't execute arbitrary functions, we must manually describe it.
export async function convictionVotingExtractor(
  disputableAddress,
  disputableActionId
) {
  const convictionVotingAppContract = getContract(
    disputableAddress,
    disputableConvictionVotingAbi
  )

  const requestToken = await convictionVotingAppContract.requestToken()
  const tokenContract = getContract(requestToken, erc20Abi)
  const tokenSymbol = await tokenContract.symbol()
  const tokenDecimals = await tokenContract.decimals()

  const proposal = await convictionVotingAppContract.getProposal(
    disputableActionId
  )

  return {
    resolvedScript: `Request ${formatTokenAmount(
      proposal[0],
      tokenDecimals
    )} ${tokenSymbol} from the common pool.`,
    script: '0x',
  }
}

async function extractFromContract(
  abi,
  disputableAddress,
  disputableActionId,
  fn,
  scriptPosition
) {
  const disputableAppContract = getContract(disputableAddress, abi)

  // Fetch the evmScript via contract call
  const result = await disputableAppContract[fn](disputableActionId)
  return { script: result[scriptPosition] }
}

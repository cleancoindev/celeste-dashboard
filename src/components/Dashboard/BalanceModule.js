import React from 'react'
import { Box, GU, Split, useLayout, useTheme } from '@1hive/1hive-ui'
import AccountBanner from './AccountBanner'
import Balance from './Balance'
import Profile from './Profile'

import { useCourtConfig } from '../../providers/CourtConfig'
import { useWallet } from '../../providers/Wallet'
import {
  getTotalUnlockedActiveBalance,
  getTotalLockedANJDistribution,
  getTotalEffectiveInactiveBalance,
} from '../../utils/balance-utils'
import { getAccountStatus } from '../../utils/account-utils'

import walletIcon from '../../assets/IconWallet.svg'
import inactiveHNYIcon from '../../assets/IconHNYInactive.svg'
import activeHNYIcon from '../../assets/IconHNYActive.svg'

const BalanceModule = React.memo(
  ({
    balances,
    loading,
    onRequestActivate,
    onRequestDeactivate,
    onRequestStakeActivate,
    onRequestWithdraw,
  }) => {
    const wallet = useWallet()
    const theme = useTheme()
    const { name: layout } = useLayout()
    const { minActiveBalance } = useCourtConfig()

    const oneColumn = layout === 'small' || layout === 'medium'
    const status = balances && getAccountStatus(balances, minActiveBalance)

    const { walletBalance, activeBalance, inactiveBalance } = balances || {}

    const lockedBalanceDistribution =
      balances && getTotalLockedANJDistribution(balances)
    const unlockedActiveBalance =
      balances && getTotalUnlockedActiveBalance(balances)
    const effectiveInactiveBalance =
      balances && getTotalEffectiveInactiveBalance(balances)

    return (
      <Split
        primary={
          <div
            css={`
              display: flex;
              flex-direction: column;
              height: 100%;
            `}
          >
            <Box
              css={`
                border: 0;
              `}
              padding={3 * GU}
            >
              <AccountBanner
                status={status}
                loading={loading}
                minActiveBalance={minActiveBalance}
                activeBalance={activeBalance}
              />
            </Box>
            <div
              css={`
                display: ${oneColumn ? 'block' : 'flex'};
                flex-grow: 1;
              `}
            >
              <Box
                padding={3 * GU}
                css={`
                  flex-basis: 50%;
                  margin-top: ${2 * GU}px;
                  margin-right: ${oneColumn ? 0 : `${2 * GU}px`};
                  border: 0;
                `}
              >
                <Balance
                  amount={effectiveInactiveBalance}
                  label="Inactive"
                  mainIcon={inactiveHNYIcon}
                  actions={[
                    { label: 'Withdraw', onClick: onRequestWithdraw },
                    {
                      label: 'Activate',
                      mode: 'strong',
                      onClick: onRequestActivate,
                    },
                  ]}
                  activity={inactiveBalance && inactiveBalance.latestMovement}
                  loading={loading}
                />
              </Box>
              <Box
                padding={3 * GU}
                css={`
                  flex-basis: 50%;
                  border: 0;
                `}
              >
                <Balance
                  amount={unlockedActiveBalance}
                  label="Active"
                  mainIcon={activeHNYIcon}
                  actions={[
                    { label: 'Deactivate', onClick: onRequestDeactivate },
                  ]}
                  activity={activeBalance && activeBalance.latestMovement}
                  distribution={lockedBalanceDistribution}
                  loading={loading}
                />
              </Box>
            </div>
          </div>
        }
        secondary={
          <Box
            padding={0}
            css={`
              overflow: hidden;
              border: 0;
              height: 100%;
            `}
          >
            <Profile status={status} account={wallet.account} />
            <div
              css={`
                padding: ${3 * GU}px;
                margin-top: ${2 * GU}px;
              `}
            >
              <Balance
                amount={walletBalance && walletBalance.amount}
                label="My wallet"
                mainIcon={walletIcon}
                mainIconBackground={theme.accent.alpha(0.2)}
                actions={[
                  {
                    label: 'Activate',
                    mode: 'strong',
                    onClick: onRequestStakeActivate,
                  },
                ]}
                activity={walletBalance && walletBalance.latestMovement}
                loading={loading}
              />
            </div>
          </Box>
        }
        invert={oneColumn ? 'vertical' : 'horizontal'}
      />
    )
  }
)

export default BalanceModule

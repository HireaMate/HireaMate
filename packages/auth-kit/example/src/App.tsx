import { useEffect, useState } from 'react'
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  UserInfo,
  WALLET_ADAPTERS
} from '@web3auth/base'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { Web3AuthOptions } from '@web3auth/modal'
import { EthHashInfo } from '@safe-global/safe-react-components'

import AppBar from './AppBar'
import Sidebar from './Sidebar'
import Widgets from './Widgets'
import Feed from './Feed'
import ContractInteractionComponent from './AvailableOffer';
import { useAuth } from './AuthContext';
import './index.css'




import { AuthKitSignInData, Web3AuthModalPack, Web3AuthEventListener } from '../../src/index'

const connectedHandler: Web3AuthEventListener = (data) => console.log('CONNECTED', data)
const disconnectedHandler: Web3AuthEventListener = (data) => console.log('DISCONNECTED', data)

function App() {
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<Web3AuthModalPack>()
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData | null>(
    null
  )
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>()
  const [signInInfo, setsignInInfo] = useState()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null)


  useEffect(() => {
    ;(async () => {
      const options: Web3AuthOptions = {
        clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID || '',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0xaa36a7',
          rpcTarget: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['google', 'facebook']
        }
      }

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false
        }
      }

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      })

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global'
      })

      await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)

      setWeb3AuthModalPack(web3AuthModalPack)

      return () => {
        web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler)
        web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler)
      }
    })()
  }, [])

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      ;(async () => {
        await login()

      })()
    }
  }, [web3AuthModalPack])


  const login = async () => {
    if (!web3AuthModalPack) return

    const signInInfo = await web3AuthModalPack.signIn()
    setsignInInfo(signInInfo || undefined)
    console.log('SIGN IN RESPONSE: ', signInInfo)

    const userInfo = await web3AuthModalPack.getUserInfo()
    console.log('USER INFO: ', userInfo)

    setSafeAuthSignInResponse(signInInfo)
    setUserInfo(userInfo || undefined)
    setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider)
  }

  const logout = async () => {
    if (!web3AuthModalPack) return

    await web3AuthModalPack.signOut()

    setProvider(null)
    setSafeAuthSignInResponse(null)
  }



  if (!provider){
    return null;
  }

  return (
    <>
      <AppBar onLogin={login} onLogout={logout} userInfo={userInfo} isLoggedIn={!!provider} />




      <div className="comp">
      <div className="App_body">
      <Sidebar userInfo={userInfo} isLoggedIn={!!provider} safeAuthSignInResponse={safeAuthSignInResponse} />
      <Feed 
      userInfo={userInfo}  userInfo={userInfo} isLoggedIn={!!provider} safeAuthSignInResponse={safeAuthSignInResponse}
      signInInfo={signInInfo}

      />
      <Widgets userInfo={userInfo} onLogout={logout} userInfo={userInfo} isLoggedIn={!!provider} />
      </div>
      </div>
    </>
  )
}

const getPrefix = (chainId: string) => {
  switch (chainId) {
    case '0x1':
      return 'eth'
    case '0x5':
      return 'gor'
    case '0x100':
      return 'gno'
    case '0x137':
      return 'matic'
    default:
      return 'eth'
  }
}



export default App

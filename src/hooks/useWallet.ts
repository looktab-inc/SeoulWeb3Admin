import {useRecoilState} from "recoil";
import {accountSelector} from "@/states/states";

// 월렛
const useWallet = () => {
  const [account, setAccountInfo] = useRecoilState(accountSelector)
  // @ts-ignore
  const isPhantomInstalled = window.phantom?.solana?.isPhantom
  const connectWallet = async () => {
    return new Promise(async (resolve, reject) => {
      const provider = getWalletProvider()
      if (provider) {
        const resp = await provider?.connect()
        setAccountInfo(prev => ({
          ...prev,
          address: resp.publicKey.toString(),
          loggedIn: true
        }))
        return resolve(resp.publicKey.toString())
      }

      return reject('failed connecting wallet')
    })
  }

  const getWalletProvider = () => {
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
    }

    if ('phantom' in window) {
      const provider = (window as any).solana
      if (provider?.isPhantom) {
        return provider
      }
    }
    return false
  }

  const disconnectWallet = () => {
    setAccountInfo(null)
  }

  const getAccount = () => {
    return account
  }

  const isLoggedIn = () => {
    return account?.loggedIn
  }

  return {
    getAccount,
    isLoggedIn,
    connectWallet,
    disconnectWallet
  }
}

export default useWallet

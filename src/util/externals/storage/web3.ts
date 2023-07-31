// @ts-nocheck
import {Web3Storage} from 'web3.storage';


const getClient = () => {
  return new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY || "" });
}

export const getImage = async (uri: string) => {
  const client = getClient()
  const rootCid = uri.split(':')[1]
  await client.get(rootCid).then(async res => {
    if ("files" in res) {
      const files = await res.files();
      const file = files[0]
      return `https://${rootCid}.ipfs.w3s.link/${encodeURIComponent(file.name)}`
    } // Web3File[]
  }).catch(e => {
    console.log(e)
    throw e
  })
}

// @ts-ignore
export const uploadFile = async (files, address) => {
  const client = getClient()
  return await client.put(files, {
    name: `${address}-${Date.now()}`,
    maxRetries: 3,
  })
}

export const uploadByBase64 = async (base64URL: string, address: string) => {
  const arr = base64URL.split(',');
  if (arr.length > 0) {
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const files = [
      new File([u8arr], `${address}-${Date.now()}`, { type: mime })
    ]
    return await uploadFile(files, address)
  }
}
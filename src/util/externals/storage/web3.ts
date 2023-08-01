// @ts-nocheck
import {Web3Storage} from 'web3.storage';

class StorageByWeb3 {
  getClient() {
    return new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY || "" });
  }

  getImage (uri: string) {
    return new Promise(async (resolve, reject) => {
      const client = this.getClient()
      await client.get(uri).then(async res => {
        if ("files" in res) {
          const files = await res.files();
          const file = files[0]
          return resolve(`https://${uri}.ipfs.w3s.link/${encodeURIComponent(file.name)}`)
        } // Web3File[]
        return resolve('')
      }).catch(e => {
        console.log(e)
        throw e
      })
    })

  }

  async uploadFile (files, fileName) {
    const client = this.getClient()
    return await client.put(files, {
      name: fileName,
      maxRetries: 3,
    })
  }

  async uploadByBase64 (base64URL: string, address: string) {
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
      const fileName = `${address}-${Date.now()}`
      const files = [
        new File([u8arr], fileName, { type: mime })
      ]
      this.uploadFile(files,fileName)
        .then(result => {
          console.log(`https://${result}.ipfs.w3s.link/${encodeURIComponent(fileName)}`)
          return `https://${result}.ipfs.w3s.link/${encodeURIComponent(fileName)}`
        }).catch(e => {
          console.log(e)
          throw e
      })
    }
  }
}

export default StorageByWeb3

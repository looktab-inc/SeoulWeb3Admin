import {DynamoDBClient, GetItemCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";

class Dynamo {
  async storeCollection(address: string, collectionId: string) {
    const client = this.getClient()
    const item = {
      id: { S: collectionId },
      address: { S: address },
      collection_id: {S: collectionId}
    }

    try {
      const putItemCommand = new PutItemCommand({
        TableName: "access_codes",
        Item: item,
      });
      const response = await client.send(putItemCommand);
      console.log("Successfully added item: ", response);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getByAccessCode (collectionId: string) {
    const client = this.getClient()
    const params = {
      TableName: 'access_codes',
      Key: {
        id: { S: collectionId },
        collection_id: { S: collectionId},
      }
    }
    const getItemCommand = new GetItemCommand(params);
    try {
      const response = await client.send(getItemCommand);
      console.log("조회된 아이템:", response.Item);
      return response.Item;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  getClient () {
    return new DynamoDBClient({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID || '',
        secretAccessKey: process.env.AWS_ACCESS_KEY || '',
      },
      region: process.env.AWS_REGION_KEY || ''
    })
  }
}

export default Dynamo

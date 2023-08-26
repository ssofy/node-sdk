import {Datasource} from '.';
import {Connection} from './Connection';
import {DynamoDB} from 'aws-sdk';

export class DynamoDBConnection extends Connection {
    protected client: DynamoDB.DocumentClient;

    constructor(client: DynamoDB.DocumentClient) {
        super();
        this.client = client;
    }

    async query(schema: string, criteria: Datasource.Criteria): Promise<Datasource.Item[]> {
        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: schema,
            KeyConditionExpression: Object.keys(criteria).map(key => `${key} = :${key}`).join(' AND '),
            ExpressionAttributeValues: Object.entries(criteria).reduce((acc, [key, value]) => {
                acc[`:${key}`] = value;
                return acc;
            }, {} as DynamoDB.DocumentClient.ExpressionAttributeValueMap),
        };

        const result = await this.client.query(params).promise();
        return result.Items as Datasource.Item[];
    }

    async insert(schema: string, item: Datasource.Item): Promise<Datasource.Item> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: schema,
            Item: item,
        };

        await this.client.put(params).promise();
        return item;
    }

    async update(schema: string, criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        const updateExpressions: string[] = [];
        const expressionAttributeNames: { [key: string]: string } = {};
        const expressionAttributeValues: DynamoDB.DocumentClient.ExpressionAttributeValueMap = {};

        Object.entries(item).forEach(([key, value], index) => {
            const attributeKey = `#attr${index}`;
            const attributeValueKey = `:value${index}`;

            updateExpressions.push(`${attributeKey} = ${attributeValueKey}`);
            expressionAttributeNames[attributeKey] = key;
            expressionAttributeValues[attributeValueKey] = value;
        });

        const params: DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: schema,
            Key: criteria,
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
        };

        await this.client.update(params).promise();
    }

    async upsert(schema: string, _criteria: Datasource.Criteria, item: Datasource.Item): Promise<void> {
        await this.insert(schema, item);
    }

    async delete(schema: string, criteria: Datasource.Criteria): Promise<void> {
        const params: DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: schema,
            Key: criteria,
        };

        await this.client.delete(params).promise();
    }
}

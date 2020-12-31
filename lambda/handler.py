import json
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def hello(event, context):

    body = {
        "message": json.loads(event["body"])["name"],
        "input": event
    }
    logging.info(f'event: {event}')

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

def hello(event, context):
    # ping auth0 API with token
    token = json.loads(event["body"])["token"]

    # Check to see if in DynamoDB
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('Users')
    body = {

    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response


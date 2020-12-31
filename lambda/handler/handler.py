import json
import boto3
import logging
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def hello(event, context):
    body = {
        "message": json.loads(event["body"])["name"],
        "input": event
    }
    logger.info(f'event: {event}')

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response


def login(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    token_response = requests.get("https://team190.us.auth0.com/userinfo", headers={"Authorization": token})
    logger.info(f"auth: {token_response.json()}")

    # Check to see if in DynamoDB
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('Users')
    dynamodb_response = table.get_item(
        Key={
            'email': 'gcperkins@wpi.edu'
        }
    )
    logger.info(dynamodb_response)

    body = {"message": ""}
    response = {"statusCode": 200, "body": ""}
    # try:
    item = dynamodb_response["Item"]
    # user exists
    body["message"] = item
    response["statusCode"] = 200
    # except KeyError:
    #     # user doesn't exist yet
    #     body["message"] = "User not found"
    #     response["statusCode"] = 201

    response["body"] = json.dumps(body)

    return response

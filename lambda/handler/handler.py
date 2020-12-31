import json
import boto3
import logging
import requests

from model.user import User
from db.dao import UserDAO

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
    token_response = requests.get("https://team190.us.auth0.com/userinfo", headers={"Authorization": token}).json()
    logger.info(f"auth: {token_response}")
    user = User(token_response)

    # Check to see if in DynamoDB
    userDAO = UserDAO()
    user = userDAO.get_user(user.email)

    body = {"message": ""}
    response = {"statusCode": 200, "body": ""}
    if user is None:
        # user doesn't exist yet
        body["message"] = "User not found"
        response["statusCode"] = 201
    else:
        # user exists
        body["message"] = user
        response["statusCode"] = 200

    response["body"] = json.dumps(body)

    return response

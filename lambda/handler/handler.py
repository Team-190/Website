import json
import logging

from handler.auth0 import Auth0
from db.dao import UserDAO, RecordDAO

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def login(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

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
        body = {"message": "ubermentor" if user.role == "ubermentor" else "student"}
        response["statusCode"] = 200

    response["body"] = json.dumps(body)
    logger.info(body["message"])
    return response


def assign_role(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Assign role to user in DynamoDB
    userDAO = UserDAO()
    user = userDAO.set_role(user, json.loads(event["body"])["role"])

    body = {"message": "ubermentor" if user.role == "ubermentor" else "student"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    logger.info(body["message"])
    return response

def get_records(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    recordDAO = RecordDAO()
    records = recordDAO.get_records_for_user(user.email)
    response = {"statusCode": 200, "body": json.dumps(records)}
    return response

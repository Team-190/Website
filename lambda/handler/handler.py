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

    role = json.loads(event["body"])["role"]

    if role != "student" or role != "mentor":
         return {"statusCode": 400, "body": "You can only request to be a student or a mentor"}

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

    userDAO = UserDAO()
    userRole = userDAO.get_user(user.email)["role"]


    email = user.email

    # If the requesting user has asked for the records of a particular user and is an ubermentor, override the email
    if event["queryStringParameters"] and event["queryStringParameters"]["email"] and userRole == "ubermentor":
        email = event["queryStringParameters"]["email"]
    

    # Add request to DynamoDB
    recordDAO = RecordDAO()
    records = recordDAO.get_records_for_user(email)
    total = 0
    for record in records:
        if record["record_type"] == "Hours":
            total += int(record["data"])
    records.append({"record_type": "Total Hours", "data": total})
    response = {"statusCode": 200, "body": json.dumps(records)}
    return response

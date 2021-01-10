import json
import logging

from db.dao import UserDAO, RecordDAO
from model.utils import Event

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def login(event, context):
    logger.info(f"event: {event}")
    email = Event(event).email

    # Check to see if in DynamoDB
    userDAO = UserDAO()
    user = userDAO.get_user(email)

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
    logger.info(f"event: {event}")
    user = Event(event).to_user()

    role = json.loads(event["body"])["role"]

    if role != "student" or role != "mentor":
        return {"statusCode": 400, "body": "You can only request to be a student or a mentor"}

    # Assign role to user in DynamoDB
    userDAO = UserDAO()
    userDAO.set_role(user, role)

    body = {"message": "ubermentor" if role == "ubermentor" else "student"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    logger.info(body["message"])
    return response


def get_records(event, context):
    logger.info(f"event: {event}")
    email = Event(event).email

    userDAO = UserDAO()
    userRole = userDAO.get_user(email).role

    # If the requesting user has asked for the records of a particular user and is an ubermentor, override the email
    if "queryStringParameters" in event.keys() and "email" in event[
        "queryStringParameters"].keys() and userRole == "ubermentor":
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

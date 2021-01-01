import logging
import json
from uuid import uuid1 as uuid

from model.approval_request import MeetingRequest
from model.approval_request import HoursRequest
from db.dao import RequestDAO
from handler.auth0 import Auth0

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def request_meeting(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requestDAO.send_request(MeetingRequest(str(uuid()), user, data["date"], data["codeWord"]))

    body = {"message": "Request for meeting attendance submitted"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

def request_hours(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requestDAO.send_request(HoursRequest(str(uuid()), user, data["date"], data["hours"]))

    body = {"message": "Request for hours worked submitted"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


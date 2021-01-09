import logging
import json
from uuid import uuid1 as uuid

from model.approval_request import Request
from db.dao import RequestDAO
from handler.auth0 import Auth0

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def request(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requestDAO.send_request(Request(str(uuid()), data["requestType"], user.email, data["date"], data["data"], data["status"]))

    body = {"message": "Request received"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

def get_pending_requests(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    requests = requestDAO.get_user_requests(user.email)

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

def delete_pending_requests(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requests = data["requests"]
    for req in requests:
        if req["status"] != "pending":
            logger.info("Removed " + str(req))
            requestDAO.delete_request(req["uuid"])

    requests = requestDAO.get_user_requests(user.email)

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

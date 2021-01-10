import logging
import json

from db.dao import RequestDAO, RecordDAO, UserDAO
from handler.auth0 import Auth0
from model.record import Record

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_requests(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    if user.role != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    requests = requestDAO.get_all_requests()

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


def get_all_users(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    if user.role != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}

    userDAO = UserDAO()

    allUsers = userDAO.get_all_users()
    body = {"users": allUsers}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response



def confirm_requests(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    if user.role != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    recordDAO = RecordDAO()
    data = json.loads(event["body"])
    requests = data["requests"]
    for req in requests:
        if req["status"] != "pending":
            logger.info("Removed " + str(req))
            requestDAO.delete_request(req["uuid"])
            if req["status"] == "approved":
                logger.info("Approved " + str(req))
                record = Record(req["uuid"], req["request_type"], req["email"], req["date"], req["data"])
                recordDAO.add_record(record)

    requests = requestDAO.get_all_requests()
    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

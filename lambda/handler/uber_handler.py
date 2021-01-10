import logging
import json

from db.dao import RequestDAO, RecordDAO, UserDAO
from model.record import Record
from model.utils import Event

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_requests(event, context):
    logger.info(f"event: {event}")
    email = Event(event).email

    userDAO = UserDAO()
    userRole = userDAO.get_user(email).role

    if userRole != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    requests = requestDAO.get_all_requests()

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


def get_all_users(event, context):
    logger.info(f"event: {event}")
    email = Event(event).email

    userDAO = UserDAO()
    user_role = userDAO.get_user(email).role

    if user_role != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}

    userDAO = UserDAO()

    all_users = userDAO.get_all_users()
    body = {"users": all_users}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


def confirm_requests(event, context):
    logger.info(f"event: {event}")
    email = Event(event).email

    userDAO = UserDAO()
    user_role = userDAO.get_user(email).role

    if user_role != "ubermentor":
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

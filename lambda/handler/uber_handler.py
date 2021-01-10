import logging
import json

from db.dao import RequestDAO, RecordDAO, UserDAO, EventDAO, VotingDAO
from model.event import Event
from model.record import Record
from model.utils import APIGatewayEvent
from model.poll import Poll

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_requests(event, context):
    logger.info(f"event: {event}")
    email = APIGatewayEvent(event).email

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
    email = APIGatewayEvent(event).email

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
    email = APIGatewayEvent(event).email

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


def create_event(event, context):
    logger.info(f"event: {event}")
    email = APIGatewayEvent(event).email

    userDAO = UserDAO()
    user_role = userDAO.get_user(email).role

    if user_role != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}

    # Add request to DynamoDB
    eventDAO = EventDAO()
    data = json.loads(event["body"])
    event = Event(data["event_type"], data["name"], data["location"], json.dumps(data["dates"]))
    eventDAO.add_event(event)

    body = {"message": "Event created"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


def create_poll(event, context):
    logger.info(f"event: {event}")
    email = APIGatewayEvent(event).email

    userDAO = UserDAO()
    user_role = userDAO.get_user(email).role

    if user_role != "ubermentor":
        return {"statusCode": 403, "body": "you must be an ubermentor to call this route!!!"}
    # Add request to DynamoDB
    votingDAO = VotingDAO()
    data = json.loads(event["body"])
    votingDAO.send_request(
        Poll(data["description"], data["choices"], data["audience"]))

    body = {"message": "Request received"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

import logging
import json

from db.dao import RequestDAO, RecordDAO, EventDAO
from handler.auth0 import Auth0
from model.event import Event
from model.record import Record

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_requests(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    requests = requestDAO.get_all_requests()

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response


def confirm_requests(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

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
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    eventDAO = EventDAO()
    data = json.loads(event["body"])
    event = Event(data["event_type"], data["name"], data["location"], json.dumps(data["dates"]))
    eventDAO.add_event(event)

    body = {"message": "Event created"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response
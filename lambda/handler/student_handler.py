import logging
import json
from uuid import uuid1 as uuid

from model.request import Request
from db.dao import RequestDAO
from model.utils import APIGatewayEvent

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def request(event, context):
    logger.info(f"event: {event}")
    email = APIGatewayEvent(event).email

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requestDAO.send_request(Request(str(uuid()), data["requestType"], email, data["date"], data["data"], data["status"]))

    body = {"message": "Request received"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

def get_pending_requests(event, context):
    logger.info(f"event: {event}")
    email = APIGatewayEvent(event).email

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    requests = requestDAO.get_user_requests(email)

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

def delete_pending_requests(event, context):
    logger.info(f"event: {event}")
    email = APIGatewayEvent(event).email

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requests = data["requests"]
    for req in requests:
        if req["status"] != "pending":
            logger.info("Removed " + str(req))
            requestDAO.delete_request(req["uuid"])

    requests = requestDAO.get_user_requests(email)

    body = {"requests": requests}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

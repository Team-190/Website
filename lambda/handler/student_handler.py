import logging
import json
from uuid import uuid1 as uuid

from model.approval_request import Request
from db.dao import RequestDAO
from model.utils import Event

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def request(event, context):
    logger.info(f"event: {event}")
    email = Event(event).email

    # Add request to DynamoDB
    requestDAO = RequestDAO()
    data = json.loads(event["body"])
    requestDAO.send_request(Request(str(uuid()), data["requestType"], email, data["date"], data["data"], data["status"]))

    body = {"message": "Request received"}
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response

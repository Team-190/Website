import logging
import json
from uuid import uuid1 as uuid

from model.approval_request import Request
from db.dao import RecordDAO
from handler.auth0 import Auth0

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def getRecords(event, context):
    # ping auth0 API with token
    logger.info(f"event: {event}")
    token = event["headers"]["authorization"]
    auth0 = Auth0()
    user = auth0.get_user(token)

    # Add request to DynamoDB
    recordDAO = RecordDAO()
    records = recordDAO.get_records_for_user(user.email)
    response = {"statusCode": 200, "body": json.dumps(records)}
    return response

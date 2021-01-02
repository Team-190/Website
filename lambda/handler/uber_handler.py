import logging
import json

from db.dao import RequestDAO
from handler.auth0 import Auth0

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

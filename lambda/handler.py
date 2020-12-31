import json
import logging


def hello(event, context):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    body = {
        "message": json.loads(event["body"])["name"],
        "input": event
    }
    logging.info(f'event: {event}')

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response


if __name__ == "__main__":
    hello('', '')

import logging
import boto3
from boto3.dynamodb.conditions import Key

from model.request import Request
from model.user import User
from model.record import Record
from model.poll import Poll

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class DAO:
    dynamodb = boto3.resource("dynamodb")

    def __init__(self, table_name):
        self.table = DAO.dynamodb.Table(table_name)


class UserDAO(DAO):
    def __init__(self):
        super().__init__("Users")

    def get_user(self, email):
        dynamodb_response = self.table.get_item(
            Key={
                'email': email
            }
        )
        try:
            logger.info(dynamodb_response)
            item = dynamodb_response["Item"]
            # user exists
            return User(item)
        except KeyError:
            # user doesn't exist
            return None

    def get_all_users(self):
        try:
            return self.table.scan()["Items"]
        except KeyError:
            return {}

    def set_role(self, user, role):
        if self.get_user(user.email) is not None:
            # Updating existing user
            self.table.update_item(
                Key={
                    'email': user.email
                },
                UpdateExpression='SET member_role = :member_role',
                ExpressionAttributeValues={
                    ':member_role': role
                }
            )
        else:
            # Adding new user
            self.table.put_item(Item=user.to_json(role=role))

        user.role = role
        return user


class RequestDAO(DAO):
    def __init__(self):
        super().__init__("Requests")

    def send_request(self, request):
        self.table.put_item(Item=request.to_json())

    def get_all_requests(self):
        try:
            requests = []
            items = self.table.scan()["Items"]
            users = {user["email"]: user["member_name"] for user in UserDAO().get_all_users()}
            for item in items:
                item["member_name"] = users[item["email"]]
                requests.append(item)
            return requests
        except KeyError:
            return {}

    def get_user_requests(self, email):
        try:
            requests = []
            items = self.table.scan()["Items"]
            users = {user["email"]: user["member_name"] for user in UserDAO().get_all_users()}
            for item in items:
                if email == item["email"]:
                    item["member_name"] = users[item["email"]]
                    requests.append(item)
            return requests
        except KeyError:
            return {}

    def delete_request(self, uuid):
        self.table.delete_item(
            Key={
                "uuid": uuid
            }
        )


class RecordDAO(DAO):
    def __init__(self):
        super().__init__("Records")

    def get_records_for_user(self, email):
        response = self.table.query(IndexName="email-uuid-index", KeyConditionExpression=Key('email').eq(email))
        try:
            return response["Items"]
        except KeyError:
            return []

    def add_record(self, record):
        self.table.put_item(Item=record.to_json())


class EventDAO(DAO):
    def __init__(self):
        super().__init__("Events")

    def add_event(self, event):
        self.table.put_item(Item=event.to_json())


class VotingDAO(DAO):
    def __init__(self):
        super().__init__("Voting")

    def send_request(self, request):
        self.table.put_item(Item=request.to_json())


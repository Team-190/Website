import boto3
from model.user import User


class DAO:
    def __init__(self):
        self.dynamodb = boto3.resource("dynamodb")


class UserDAO(DAO):
    def __init__(self):
        super().__init__()
        self.table = self.dynamodb.Table('Users')

    def get_user(self, email):
        dynamodb_response = self.table.get_item(
            Key={
                'email': email
            }
        )
        try:
            item = dynamodb_response["Item"]
            # user exists
            return User(item)
        except KeyError:
            # user doesn't exist
            return None

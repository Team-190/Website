import logging
import boto3

from model.user import User

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class DAO:
    dynamodb = boto3.resource("dynamodb")


class UserDAO():
    def __init__(self):
        self.table = DAO.dynamodb.Table('Users')

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


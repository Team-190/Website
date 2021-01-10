from model.user import User


class APIGatewayEvent:
    def __init__(self, event):
        self.email = event["requestContext"]["authorizer"]["jwt"]["claims"]["https://first.wpi.edu/email"]
        self.picture = event["requestContext"]["authorizer"]["jwt"]["claims"]["https://first.wpi.edu/slack_avatar"]
        self.name = event["requestContext"]["authorizer"]["jwt"]["claims"]["https://first.wpi.edu/name"]

    def to_user(self):
        dict = {"email": self.email, "name": self.name, "picture": self.picture}
        return User(dict)

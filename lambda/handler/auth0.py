import requests
import logging

from model.user import User


class Auth0:
    def __init__(self):
        self.logger = logging.getLogger()
        self.logger.setLevel(logging.INFO)

    def get_user(self, token):
        token_response = requests.get("https://team190.us.auth0.com/userinfo", headers={"Authorization": token}).json()
        self.logger.info(f"auth: {token_response}")
        return User(token_response)

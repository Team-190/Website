
class User:
    def __init__(self, user_dict):
        self.email = user_dict["email"]
        self.name = user_dict["name"]
        try:
            self.picture = user_dict["https://first.wpi.edu/slack_avatar"]
        except KeyError:
            try:
                self.picture = user_dict["picture"]
            except KeyError:
                self.picture = None
        try:
            self.role = user_dict["role"]
        except KeyError:
            self.role = None

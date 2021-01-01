class User:
    def __init__(self, user_dict):
        self.email = user_dict["email"]
        try:
            self.name = user_dict["name"]
        except KeyError:
            self.name = user_dict["member_name"]
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
            try:
                self.role = user_dict["member_role"]
            except KeyError:
                self.role = None

    def to_json(self, role=None):
        self.role = self.role if role is None else role
        return {
            "email": self.email,
            "member_role": self.role,
            "member_name": self.name,
            "picture": self.picture
        }
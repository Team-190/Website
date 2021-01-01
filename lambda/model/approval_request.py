class Request:
    def __init__(self, uuid, request_type, user, date, data):
        self.uuid = uuid
        self.type = request_type
        self.user = user
        self.date = date
        self.data = data

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.user.email,
            "date": self.date,
            "request_type": self.type,
            "data": self.data
        }

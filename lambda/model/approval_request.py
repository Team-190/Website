class Request:
    def __init__(self, uuid, request_type, email, date, data, status):
        self.uuid = uuid
        self.type = request_type
        self.email = email
        self.date = date
        self.data = data
        self.status = status

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.email,
            "date": self.date,
            "request_type": self.type,
            "data": self.data,
            "status": self.status
        }

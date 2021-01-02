class Record:
    def __init__(self, uuid, record_type, user, date, data):
        self.uuid = uuid
        self.type = record_type
        self.user = user
        self.date = date
        self.data = data

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.user.email,
            "date": self.date,
            "record_type": self.type,
            "data": self.data
        }

class Record:
    def __init__(self, uuid, record_type, email, date, data):
        self.uuid = uuid
        self.type = record_type
        self.email = email
        self.date = date
        self.data = data

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.email,
            "date": self.date,
            "record_type": self.type,
            "data": self.data
        }

class Record:
    def __init__(self, record_dict):
        self.uuid = record_dict["uuid"]
        self.type = record_dict["record_type"]
        self.email = record_dict["email"]
        self.date = record_dict["date"]
        self.data = record_dict["data"]

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.email,
            "date": self.date,
            "record_type": self.type,
            "data": self.data
        }

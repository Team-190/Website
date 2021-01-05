from datetime import date

class Record:
    def __init__(self, uuid, record_type, email, mmddyyyy, data):
        self.uuid = uuid
        self.type = record_type
        self.email = email
        self.date = mmddyyyy
        self.data = data
        if self.type == "Hours":
            mmddyyyy = [int(i) for i in self.date.split("/")]
            self.date = "{\"year\": \"%s\", \"week\": %s}" % (mmddyyyy[2], date(mmddyyyy[2], mmddyyyy[0], mmddyyyy[1]).isocalendar()[1])

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.email,
            "date": self.date,
            "record_type": self.type,
            "data": self.data
        }

class MeetingRequest:
    def __init__(self, uuid, user, date, code_word):
        self.uuid = uuid
        self.user = user
        self.date = date
        self.code_word = code_word

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.user.email,
            "date": self.date,
            "request_type": "meeting",
            "data": "{code_word: %s}" % self.code_word
        }


class HoursRequest:
    def __init__(self, uuid, user, date, hours):
        self.uuid = uuid
        self.user = user
        self.date = date
        self.hours = hours

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.user.email,
            "date": self.date,
            "request_type": "hours",
            "data": "{hours: %s}" % self.hours
        }


class SupportRequest:
    def __init__(self, uuid, user, date, description):
        self.uuid = uuid
        self.user = user
        self.date = date
        self.description = description

    def to_json(self):
        return {
            "uuid": self.uuid,
            "email": self.user.email,
            "date": self.date,
            "request_type": "support",
            "data": "{description: %s}" % self.description
        }

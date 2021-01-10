class Event:
    def __init__(self, event_type, name, location, dates):
        self.event_type = event_type
        self.name = name
        self.location = location
        self.dates = dates

    def to_json(self):
        return {"event_type": self.event_type, "name": self.name, "location": self.location, "dates": self.dates}

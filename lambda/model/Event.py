class Event:
    def __init__(self, event_type, name, location, dates):
        self.event_type = event_type
        self.name = name
        self.location = location
        self.dates = dates

    def to_json(self):
        return "{event_type: %s, name: %s, location: %s, dates: %s}" % (
        self.event_type, self.name, self.location, self.dates)

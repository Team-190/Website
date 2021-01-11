class Poll:
    def __init__(self, description, choices, audience):
        self.description = description
        self.choices = choices
        self.audience = audience

    def to_json(self):
        return {
            "description": self.description,
            "choices": self.choices,
            "audience": self.audience
        }

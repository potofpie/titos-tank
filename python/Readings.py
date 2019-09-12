from MockSensors import *

class Temp:
    def __init__(self):
        reading = readTempSensor()
        self.time = reading[0]
        self.val = reading[1]

class PH:
    def __init__(self):
        reading = readPHSensor()
        self.time = reading[0]
        self.val = reading[1]

class Level:
    def __init__(self):
        reading = readLevelSensor()
        self.time = reading[0]
        self.val = reading[1]


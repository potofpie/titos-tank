import random
import datetime
import time



def readTempSensor():
    return [time.time(), random.randint(72,82)]

def readPHSensor():
    return [time.time(), random.randint(0,14)]

def readLevelSensor():
    return [time.time(), random.randint(350,375)]


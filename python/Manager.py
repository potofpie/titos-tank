from Readings import *
import time
from threading import Thread






maxLength = 15
readingList = []


def getAllReading():
    return readingList

def getLastestRead():
    return readingList[0]


def addReadings(temp,ph,level):
    if(len(readingList) == maxLength):
        readingList.remove(readingList[maxLength-1])
    dic = { "temp" : { "time": temp.time, "val": temp.val},
            "ph"    : { "time": ph.time, "val": ph.val},
            "level"    : { "time": level.time, "val": level.val},
          }
    readingList.insert(0,dic)
    # print(dic)

def readingLoop():
    while(True):
        time.sleep(.100)
        temp = Temp()
        ph = PH()
        level = Level()

        addReadings(temp,ph,level)

        # print("=================================================")
        # print("|                 Current Reading               |")
        # print("=================================================")
        # print("| Temp: %s | Time: %s |" % (temp.val,temp.time))
        # print("| PH: %s   | Time: %s |" % (ph.val,ph.time))
        # print("| Level: %s | Time: %s |" % (level.val,level.time))

def main():
    Thread(target=readingLoop).start()
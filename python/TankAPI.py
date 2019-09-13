from flask import Flask, jsonify
from Manager import *
from flask_cors import CORS
import requests
import json
import datetime


from flask import Flask
maxLength = 25
app = Flask(__name__)
readingList = []
main()


def addReadings(readingDic):
    if(len(readingList) == maxLength):
        readingList.remove(readingList[maxLength-1])
    readingList.insert(0,readingDic)

@app.route('/')
def home():
    return "<h3>FISH TANK</h3>"


@app.route('/all', methods=["GET"])
def all():
    return jsonify(readingList)

@app.route('/latest', methods=["GET"])
def latest():
    try:
        package=requests.get("http://10.0.0.241:8081/temperature")
        package.encoding = "utf-8"
        package = json.loads(package.text)
        package['temp']['time'] = datetime.datetime.fromtimestamp(package['temp']['time']).strftime("%H:%M:%S")
        package['level']['time'] = datetime.datetime.fromtimestamp(package['level']['time']).strftime("%H:%M:%S")
        package['ph']['time'] = datetime.datetime.fromtimestamp(package['ph']['time']).strftime("%H:%M:%S")
        addReadings(package)
        return jsonify(package)
    except Exception as e:
        print(e)
        dic = { "temp" : { "time": "XXX", "val": "XXX"},
                "ph"    : { "time": "XXX", "val": "XXX"},
                "level"    : { "time": "XXX", "val": "XXX"},
        }
        return jsonify(dic)
if __name__ == '__main__':
    CORS(app)
    app.run()
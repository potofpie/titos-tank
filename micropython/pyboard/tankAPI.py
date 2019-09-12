import picoweb
import ujson
import random
import time

app = picoweb.WebApp("my_app")

@app.route("/")
def index(req, resp):
    yield from picoweb.start_response(resp)
    yield from resp.awrite("<h1>Fish Tank API</h1>")

@app.route("/temperature")
def index(req, resp):
    level = random.randint(200,375)
    ph = random.randint(0,14)
    temp = random.randint(70,80)
    currtime = time.time()
    print("\n\n")
    print("==========================================")
    print("|| temp: %s || level: %s || ph: %s ||" % (temp, level, ph))
    print("==========================================")
    print("\n\n")
    temp = {"level": {"val": level, "time": currtime}, "ph": {"val": ph, "time": currtime}, "temp": {"val": temp, "time": currtime}}
    yield from picoweb.start_response(resp)
    yield from resp.awrite(ujson.dumps(temp))

@app.route("/ph")
def index(req, resp):
    ph = {"val": 7, "time":10000}
    yield from picoweb.start_response(resp)
    yield from resp.awrite(ujson.dumps(ph))

@app.route("/waterLevel")
def index(req, resp):
    waterLevel = {"val": 350, "time":10000}
    yield from picoweb.start_response(resp)
    yield from resp.awrite(ujson.dumps(waterLevel))



app.run(debug=True, host="10.0.0.241", port=8081)
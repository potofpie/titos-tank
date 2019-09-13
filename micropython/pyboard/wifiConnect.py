import network
 
def connect():
  ssid = "what are frogs"
  password =  "HappyFlute12"
 
  station = network.WLAN(network.STA_IF)
 
  if station.isconnected() == True:
      print("Already connected")
      print("ssid: " + ssid)
      print("IP: " + str(station.ifconfig()[0]))
      return
 
  station.active(True)
  print("About to connect to: " + ssid)
  station.connect(ssid, password)
 
  while station.isconnected() == False:
      pass
 
  print("Connection successful")
  print("ssid: " + ssid)
  print("IP: " + str(station.ifconfig()[0]))


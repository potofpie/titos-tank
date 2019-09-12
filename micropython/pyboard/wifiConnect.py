import network
 
def connect():
  ssid = "what are frogs"
  password =  "HappyFlute12"
 
  station = network.WLAN(network.STA_IF)
 
  if station.isconnected() == True:
      print("Already connected")
      print("IP: " + str(station.ifconfig()))
      return
 
  station.active(True)
  station.connect(ssid, password)
 
  while station.isconnected() == False:
      pass
 
  print("Connection successful")
  print(station.ifconfig())


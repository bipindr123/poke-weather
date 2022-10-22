from sanic import Sanic
from sanic.response import file
from sanic import Websocket
from sanic import response
import time
import requests
import json
import ipinfo
import datetime
import  pytz

# handler = ipinfo.getHandler(access_token)

app = Sanic("websocket_example")

async def get_weather(data, ws):
    coords = data.split("\n")
    for city in coords:
        lat,lon = city.split(",")
        x = requests.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=")
        if(x):
            try:
                res = x.json()
                sending_data = {"coords":city,"weather":res['weather'][0]['main']}
                await ws.send(json.dumps(sending_data))
                
            except:
                print("not able to send " + res)
        else:
            print(x.json())
            print(city)

@app.route('/')
async def index(request):
    return await file('websocket.html')

@app.route('/feedme.js')
async def index(request):
    return await file('feedme.js')


@app.route('/test')
async def index(request):
    return await file('test.html')

@app.route('/log',methods=("GET","POST"))
async def index(request):
    print(str(datetime.datetime.now(pytz.timezone('US/Pacific'))) + " " + str(request.body))
    with open('test.html','a') as f:
        f.write(str(datetime.datetime.now(pytz.timezone('US/Pacific'))) + " " + str(request.body)+"<br>")
    return response.json({"message":"done"},status=200,headers={"Access-Control-Allow-Origin":"*"})

@app.websocket('/feed')
async def feed(request, ws):
        data = await ws.recv()
       # ip_address = "27.7.24.120"
       # details = handler.getDetails(ip_address)
       # now = datetime.datetime.now()
       # print (now.strftime("%Y-%m-%d %H:%M:%S"), end=" ")
       # print(ip_address+" "+details.city + " " + details.region + " " + details.country + " " + details.loc)
        await get_weather(data, ws)

if __name__ == "__main__":
    # app.add_websocket_route(feed, "/feed")
    app.run(host="0.0.0.0", port=1337, workers=1, debug=False, access_log=False)

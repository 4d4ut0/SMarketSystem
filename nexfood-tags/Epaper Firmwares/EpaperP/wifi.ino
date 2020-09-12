void wificonfig()
{
  Serial.printf("Connecting to: %s\n", ssid.c_str());
  Serial.printf("Password: %s\n", password.c_str());
  Serial.println(ssid);
  Serial.println(password);
  Serial.println(domain);
  
  connectwifilocal ();
  
  Serial.println("CONECTADO");
}


void connectserver()
{
  WiFi.mode(WIFI_AP);
  String mac = WiFi.macAddress();
  display.drawPaged(printMac);
  char mac_esp[mac.length()];

  mac.toCharArray(mac_esp, mac.length());
  WiFi.softAP(mac_esp, "nexsolar");
  mac.toCharArray(mac_esp, mac.length());
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
  // Inicia a rota "/turnon" que receberá um HTTP GET request

  server.on("/", HTTP_GET, turn_on_f);

  // Seta a função de Call Back para as rotas não encontradas
  server.onNotFound(notFound);
  // Inicia o web server
  server.begin();
}


void notFound(AsyncWebServerRequest *request) {
  request->send(404, "text/plain", "Not found");
}


/* http://192.168.4.1/?ssid=leonardo&password=123456&domain=nexmakert */
void turn_on_f(AsyncWebServerRequest *request) {
  if (request->hasArg("ssid") && request->hasArg("password") && request->hasArg("domain")) {
    request->send(200, "text/plain", "Configuração total realizada!");
    ssid = request->arg("ssid");
    password = request->arg("password");
    domain = request->arg("domain");

    writeFile(SPIFFS, "/url.txt", ssid.c_str());
    appendFile(SPIFFS, "/url.txt", "\n");
    appendFile(SPIFFS, "/url.txt", password.c_str());
    appendFile(SPIFFS, "/url.txt", "\n");
    appendFile(SPIFFS, "/url.txt", domain.c_str());
    appendFile(SPIFFS, "/url.txt", "\n");
    
    con = true;
  }
  else if(request->hasArg("ssid") && request->hasArg("password")){
    request->send(200, "text/plain", "Configuração total realizada!");
    ssid = request->arg("ssid");
    password = request->arg("password");

    writeFile(SPIFFS, "/url.txt", ssid.c_str());
    appendFile(SPIFFS, "/url.txt", "\n");
    appendFile(SPIFFS, "/url.txt", password.c_str());
    appendFile(SPIFFS, "/url.txt", "\n");
    appendFile(SPIFFS, "/url.txt", domain.c_str());
    appendFile(SPIFFS, "/url.txt", "\n");
    
    con = true;
  }
  else {
    request->send(400, "text/plain", "Arg is missing");
  }
}


//Tenta conexão com a rede local configurado pelo app
void connectwifilocal ()
{
  con = false;
  WiFi.begin(ssid.c_str(), password.c_str());

  int i = 0;
  while (WiFi.status() != WL_CONNECTED and i < 30) {
    delay(500);
    Serial.print(".");
    i++;
  }
  if (WiFi.status() != WL_CONNECTED)
  {
    connectserver();
  }

  while(WiFi.status() != WL_CONNECTED)
  {
    char a[20];
    char b[20];
    strcpy(a, ssid.c_str());
    strcpy(b, password.c_str());
    
    if(con){
      Serial.print(a);
      Serial.print(b);
      WiFi.mode(WIFI_MODE_STA);
      WiFi.begin(a, b);
    }
    Serial.println("ESPERANDO UNA SENHITA SENHOR");
    delay(5000);
  }
  WiFi.softAPdisconnect (true);
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}


void getHttpAPI()
{
  HTTPClient http; //Object of class HTTPClient
  String addressSite = domain + String(WiFi.macAddress());

  http.begin(addressSite);
  // http.begin("http://nexsolar.sytes.net:3000/products/1/test");
  int httpCode = http.GET();

  if (httpCode > 0)
  {
    DynamicJsonDocument doc(1024);
    //JsonObject& root = jsonBuffer.parseObject(http.getString());
    deserializeJson(doc, http.getString());

    nameGet = doc["name"].as<String>();
    priceGet = doc["price"].as<float>();
    priceDefaultGet = doc["price_default"].as<float>();
    tributoGet = doc["taxation"].as<float>();
    barCodeGet = doc["barCode"].as<int>();
    updatedisplayflag = doc["hasChange"].as<bool>();
    sleepingTimeInMinutes = doc["sleepingTime"].as<int>();

    Serial.println(doc["name"].as<char*>());
    Serial.println(doc["price"].as<float>());
    Serial.println(doc["taxation"].as<float>());
    Serial.println(doc["barCode"][1].as<long>());
    writeFile(SPIFFS, "/server.txt", String(priceDefaultGet).c_str());
    appendFile(SPIFFS, "/server.txt", "\n");
  }

  else
  {
    readServer(SPIFFS, "/server.txt");
  }

}

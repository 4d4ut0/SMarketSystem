void wificonfig()
{
  int i = 0;
  boolean apflag = false;
  ssidm = readstringEEPROM(0);
  passwordm = readstringEEPROM(20);
  ssidm = "REDEESP";
  passwordm = "nexsolar123";

  //Tenta conectar na ultima rede gravada
  WiFi.begin(ssidm, passwordm);

  while (WiFi.status() != WL_CONNECTED and i < 60) {
    Serial.println("Tentando ultima conexão");
    i++;
    delay(1000);
  }

  if (WiFi.status() != WL_CONNECTED)
  {
    connectserver();
    apflag = true;
  }
  delay(500);

  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Esperando configuração");

    if (con == true)
    {
      connectwifilocal();
      if (WiFi.status() != WL_CONNECTED)
      {
        apflag = true;
      }
    }

    if (apflag == true)
    {
      connectserver();
      apflag = false;
    }

    delay(1000);
  }


  Serial.println("Conectado");
  WiFi.mode(WIFI_STA);


  //Grava ssid e senha da conexão atual
  if (ssid != "") {
    writestringEEPROM(0, ssid);
    writestringEEPROM(20, password);
  }

}


//Configura o Access Point e cria um servidor
void connectserver()
{
  //WiFi.disconnect();
  WiFi.mode(WIFI_AP);
  WiFi.softAP(WiFi.macAddress(), "nexsolar123");
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
  // Inicia a rota "/turnon" que receberá um HTTP GET request

  server.on("/", HTTP_GET, turn_on_f);

  // Seta a função de Call Back para as rotas não encontradas
  server.onNotFound(notFound);
  // Inicia o web server
  server.begin();

}


//Tenta conexão com a rede local configurado pelo app
void connectwifilocal ()
{
  con = false;
  //WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  int i = 0;
  while (WiFi.status() != WL_CONNECTED and i < 15) {
    delay(1000);
    Serial.print(".");
    i++;
  }

}


void notFound(AsyncWebServerRequest *request) {
  request->send(404, "text/plain", "Not found");
}


//Listener do aplicativo para configuração da rede
void turn_on_f(AsyncWebServerRequest *request) {

  AsyncWebParameter* p;

  int paramsNr = request->params();

  if (paramsNr == 3) {

    p = request->getParam(0);
    ssid = p->value();

    Serial.print("SSID: ");
    Serial.println(ssid);

    p = request->getParam(1);
    password = p->value();


    Serial.print("Password: ");
    Serial.println(password);
    con = true;
    request->send(200, "text/plain", "ACK\n");

  }

  if (paramsNr == 1) {

    if (WiFi.status() == WL_CONNECTED)
    {
      request->send(200, "text/plain", "FULL");
    }

    else {
      request->send(200, "text/plain", "N.C");
    }

  }

  else {
    request->send(200, "text/plain", "Arg is missing");
  }

}


void getHttpAPI()
{
  HTTPClient http; //Object of class HTTPClient
  String addressSite = "http://nexsolar.sytes.net:3001/tags/update/";
  addressSite=addressSite+String(WiFi.macAddress());

  
  http.begin(addressSite);
  // http.begin("http://nexsolar.sytes.net:3000/products/1/test");
  int httpCode = http.GET();

  if (httpCode > 0)
  {
    DynamicJsonDocument doc(1024);
    //JsonObject& root = jsonBuffer.parseObject(http.getString());
    deserializeJson(doc, http.getString());
  
    nameGet=doc["name"];
    priceGet=doc["price"].as<float>();
    priceDefaultGet=doc["price_default"].as<float>();
    tributoGet=doc["taxation"].as<float>();
    barCodeGet=doc["barCode"].as<int>();
    updatedisplayflag=doc["hasChange"].as<bool>();
    
    Serial.println(doc["name"].as<char*>());
    Serial.println(doc["price"].as<float>());
    Serial.println(doc["taxation"].as<float>());
    Serial.println(doc["barCode"][1].as<long>());
    writestringEEPROM(100,String(priceDefaultGet));
  }

  else
  {
  String priceGetS=readstringEEPROM(100);
  char priceGetC[10]="";
  priceGetS.toCharArray(priceGetC,10);
  priceGet=atof(priceGetC);
  }


}

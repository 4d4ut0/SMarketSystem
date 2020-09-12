/*Realiza comunicação do app de configuração de rede
 * 1-Configura a rede e mostra no display a string enviada pelo app
 * 2-Gravação da EEPROM ainda não funciona, faz o ESP reiniciar
 */
#include <SPIFFS.h>
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>
#include <EEPROM.h>
#include <ArduinoJson.h>
#include <GxEPD.h>
#include "roboto.h"

//#include <GxGDEW0213I5F/GxGDEW0213I5F.h>  // 2.13" b/w 104x212 flexible
#include <GxGDE0213B1/GxGDE0213B1.h>      // 2.13" b/w
//#include <GxGDEH0213B72/GxGDEH0213B72.h>  // 2.13" b/w new panel
//#include <GxGDEH0213B73/GxGDEH0213B73.h>  // 2.13" b/w newer panel
//#include <GxGDEW0213Z16/GxGDEW0213Z16.h>  // 2.13" b/w/r

#include GxEPD_BitmapExamples
#define FORMAT_SPIFFS_IF_FAILED true
#define MINUTES 60*1000*1000

// FreeFonts from Adafruit_GFX
#include <Fonts/FreeMonoBold9pt7b.h>
#include "nexFont9pt7b.h"
#include "nexFontRoboto15pt7b.h"
//#include <Fonts/FreeMonoBold12pt7b.h>
//#include <Fonts/FreeMonoBold18pt7b.h>
//#include <Fonts/FreeMonoBold24pt7b.h>


#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>


GxIO_Class io(SPI, /*CS=5*/ 5, /*DC=*/ 17, /*RST=*/ 16); // arbitrary selection of 17, 16
GxEPD_Class display(io, /*RST=*/ 16, /*BUSY=*/ 4); // arbitrary selection of (16), 4


AsyncWebServer server(80);
boolean con = false;  //Flag de request de login e senha pelo aplicativo

String ssid;
String password;
String domain;
String mac;
String ssidm = "";
String passwordm = "";
String nameGet="Mamão Maçã Sobá";
float priceGet;
float tributoGet;
float priceDefaultGet;
int barCodeGet;
int sleepingTimeInMinutes;
bool updatedisplayflag = false;


void setup()
{
  
  Serial.begin(115200);
  display.init(115200);
  if(!SPIFFS.begin(FORMAT_SPIFFS_IF_FAILED)){
        Serial.println("SPIFFS Mount Failed");
    }
  else {
    readFile(SPIFFS, "/url.txt");
  }
  Serial.setTimeout(2000);
  wificonfig();
  Serial.print("---------------------");
  WiFi.printDiag(Serial);
  Serial.print("---------------------");
  Serial.println(WiFi.macAddress());
  epaperfunction();
  //ESP.deepSleep(20e6);
  ESP.deepSleep(sleepingTimeInMinutes * MINUTES);
}


void loop(){}

void epaperfunction()
{
  Serial.println("Loop");
  getHttpAPI();
  //if(updatedisplayflag==true)
  //{
  display.drawPaged(printData);
  //}
  delay(200); 
}

void printData()
{
  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);

  display.setRotation(45);
  
  display.setTextSize(1);
  display.setFont(&nexRobotoSlab_Regular9pt7b);
  display.setCursor(0,15);
  display.println(nexStringConvert(nameGet));

  display.setTextSize(1);
  display.setFont(&Crafty_Girls_Regular_50);
  display.setCursor(0,70);
  display.print("R$ ");
  display.print(priceGet);
  
  display.setTextSize(1);
  display.setFont(&FreeMonoBold9pt7b);
  display.setCursor(0,100);
  display.print("Trib. Aprox R$ ");
  display.println(tributoGet);
  
  display.update();
}

void printMac(){
  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);

  display.setRotation(45);

  display.setTextSize(1);
  display.setFont(&RobotoSlab_VariableFont_wght15pt7b);
  display.setCursor(0,70);
  display.print("  ");
  display.print(WiFi.macAddress());
}

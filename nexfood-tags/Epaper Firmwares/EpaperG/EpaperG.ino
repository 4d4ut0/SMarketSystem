// mapping suggestion from Waveshare SPI e-Paper to generic ESP8266
// BUSY -> GPIO4, RST -> GPIO2, DC -> GPIO0, CS -> GPIO15, CLK -> GPIO14, DIN -> GPIO13, GND -> GND, 3.3V -> 3.3V

// mapping suggestion for ESP32, e.g. LOLIN32, see .../variants/.../pins_arduino.h for your board
// NOTE: there are variants with different pins for SPI ! CHECK SPI PINS OF YOUR BOARD
// BUSY -> 4, RST -> 16, DC -> 17, CS -> SS(5), CLK -> SCK(18), DIN -> MOSI(23), GND -> GND, 3.3V -> 3.3V

#include <GxEPD.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include "ESPAsyncWebServer.h"
#include <EEPROM.h>
#include <ArduinoJson.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMonoBold18pt7b.h>
#include <Fonts/FreeMonoBold24pt7b.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>
#include "CaliFont.h"
#include <GxGDEW075Z08/GxGDEW075Z08.h>    // 7.5" b/w/r 800x480

AsyncWebServer server(80);
String ssid;
String password;
String mac;
String ssidm = "";
String passwordm = "";

const char* nameGet;
float priceGet;
float tributoGet;
float priceDefaultGet;
int barCodeGet;

boolean con = false;
bool wifi_flag = false;
bool updatedisplayflag =false;

GxIO_Class io(SPI, /*CS=D8*/ SS, /*DC=D3*/ 0, /*RST=D4*/ 2); // arbitrary selection of D3(=0), D4(=2), selected for default of GxEPD_Class
GxEPD_Class display(io, /*RST=D4*/ 2, /*BUSY=D2*/ 4); // default selection of D4(=2), D2(=4)


void setup()
{
  EEPROM.begin(512);
  Serial.begin(115200);
  Serial.setTimeout(2000);
  display.init(115200);
  wificonfig();
  Serial.println(WiFi.macAddress());
  epaperfunction();
  ESP.deepSleep(3600e6);
}

void loop(){}

void epaperfunction()
{
  Serial.println("Loop");
  getHttpAPI();
  if(updatedisplayflag==true)
  {
  display.drawPaged(printData);
  }
  delay(200); 
}


void printData()
{
  const GFXfont* f = &FreeMonoBold24pt7b;
  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);

  display.setRotation(90);
  
  display.setTextSize(2);
  display.setFont(&FreeMonoBold18pt7b);
  display.setCursor(10, 65);
  display.println(nameGet);

  display.setTextSize(2);
  display.setFont(&Calligraffitti_Regular_100);
  display.setCursor(30, 300);
  display.print("R$ ");
  display.print(priceGet);
  
  display.setTextSize(1);
  display.setFont(f);
  display.setCursor(10, 400);
  display.print("Tributo aproximado R$ ");
  display.println(tributoGet);
  
  display.update();
}

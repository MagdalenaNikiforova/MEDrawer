#include <WiFi.h>
#include <WebServer.h>
#include <LiquidCrystal.h>
#include "time.h"
#include "esp_sntp.h"

// Define LCD pins (RS, E, D4, D5, D6, D7)
LiquidCrystal lcd(15, 4, 16, 17, 5, 18);

// Define LED pins
const int ledPins[] = {12, 13, 14, 27};  // GPIOs for the 4 LEDs

// Wi-Fi credentials
const char* ssid = "Eli";       // Replace with your Wi-Fi SSID
const char* password = "qwer1234"; // Replace with your Wi-Fi password

const char *ntpServer1 = "pool.ntp.org";
const char *ntpServer2 = "time.nist.gov";
const long gmtOffset_sec = 3600;
const int daylightOffset_sec = 3600;

const char *time_zone = "CET-1CEST,M3.5.0,M10.5.0/3";  // TimeZone rule for Europe/Rome including daylight adjustment rules (optional)


// Web server on port 80
WebServer server(80);

// Variable to store the text received from React app
String displayText;

// Initialize LEDs as output
void setupLEDs() {
  for (int i = 0; i < 4; i++) {
    pinMode(ledPins[i], OUTPUT);  // Set each LED pin as an output
    digitalWrite(ledPins[i], LOW);  // Ensure LEDs are off initially
  }
}

// Function to handle the POST request and update the LCD and LEDs
void handleDisplayText() {
  if (server.hasArg("plain")) {
    displayText = server.arg("plain");  // Get the plain text from the body of the POST request
    Serial.println("Received text: " + displayText);  // Log the received text
    
    lcd.clear();  // Clear the display
    lcd.setCursor(0, 0);  // Set cursor to the beginning of the first line
    lcd.print(displayText);  // Display the text on the LCD - the name of the medicine
    printLocalTime(); //Display the date and the time
    server.send(200, "text/plain", "Text displayed successfully");
  } else {
    server.send(400, "text/plain", "No text provided");
    Serial.println("Error: No text provided");
  }
}

void handleLEDControl() {
  if (server.hasArg("plain")) {
    String ledIndex = server.arg("plain");  // Get the LED index from the body of the POST request
    int ledNum = ledIndex.toInt();  // Convert the string to an integer

    if (ledNum >= 1 && ledNum <= 4) {
      // Turn on the selected LED and turn off others
      for (int i = 0; i < 4; i++) {
        digitalWrite(ledPins[i], LOW);  // Turn off all LEDs
      }
      digitalWrite(ledPins[ledNum - 1], HIGH);  // Turn on the selected LED

      server.send(200, "text/plain", "LED " + String(ledNum) + " is ON");
    } else {
      server.send(400, "text/plain", "Invalid LED number");
    }
  } else {
    server.send(400, "text/plain", "No LED number provided");
  }
}

void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("No time available (yet)");
    return;
  }  
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}

// Callback function (gets called when time adjusts via NTP)
void timeavailable(struct timeval *t) {
  Serial.println("Got time adjustment from NTP!");
  printLocalTime();
}

void setup() {
  // Start Serial communication
  Serial.begin(115200);
  
  // Initialize LCD
  lcd.begin(16, 2);  // Initialize 16x2 LCD
  lcd.setCursor(0, 0);
  lcd.print("Connecting to Wi-Fi...");

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);

  esp_sntp_servermode_dhcp(1);  // (optional)
  
  int attempts = 0;  // Add a counter for connection attempts

  // Try to connect to Wi-Fi
  while (WiFi.status() != WL_CONNECTED && attempts < 10) { // Retry limit of 10 attempts
    delay(500);
    Serial.println("Attempting to connect to Wi-Fi...");
    attempts++;
  }

  // Check if the ESP32 connected successfully
  if (WiFi.status() == WL_CONNECTED) {
    // Print the IP Address to Serial Monitor once connected
    Serial.println("Connected to Wi-Fi!");
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());  // This will print the ESP32's IP address
  } else {
    // If the ESP32 fails to connect after multiple attempts, print an error
    Serial.println("Failed to connect to Wi-Fi.");
    Serial.println("Please check your Wi-Fi credentials.");
  }

  sntp_set_time_sync_notification_cb(timeavailable);
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1, ntpServer2);


  // Initialize LEDs
  setupLEDs();

  // Display on the LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  if (WiFi.status() == WL_CONNECTED) {
    lcd.print("Connected!");
  } else {
    lcd.print("Wi-Fi Failed!");
  }
  delay(2000);  // Show connection status for a few seconds

  // Handle POST requests to display text
  server.on("/displayText", HTTP_POST, handleDisplayText);

  // Handle POST requests to control LEDs
  server.on("/controlLED", HTTP_POST, handleLEDControl);

  // Start the server
  server.begin();
  Serial.println("Server started");
}

void loop() {
  server.handleClient();  // Handle incoming HTTP requests
}

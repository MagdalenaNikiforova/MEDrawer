#include <WiFi.h>
#include <WebServer.h>
#include <LiquidCrystal.h>

// Define LCD pins (RS, E, D4, D5, D6, D7)
LiquidCrystal lcd(15, 4, 16, 17, 5, 18);

// Wi-Fi credentials
const char* ssid = "Eli";
const char* password = "qwer1234";

// Web server on port 80
WebServer server(80);

// Variable to store the text received from React app
String displayText;

// Function to handle the POST request and update the LCD
void handleDisplayText() {
  if (server.hasArg("plain")) {
    displayText = server.arg("plain");  // Get the plain text from the body of the POST request
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(displayText);  // Display the text on the LCD
    server.send(200, "text/plain", "Text displayed successfully");
  } else {
    server.send(400, "text/plain", "No text provided");
  }
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
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");

  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());  // This will print the ESP32's IP address
  
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected!");
  delay(2000);  // Show "Connected" message for a few seconds

  // Handle POST requests to display text
  server.on("/displayText", HTTP_POST, handleDisplayText);

  // Start the server
  server.begin();
}

void loop() {
  server.handleClient();  // Handle incoming HTTP requests
  
  // Optionally, display uptime on the second row
  //lcd.setCursor(0, 1);
  //lcd.print(millis() / 1000); // Display uptime in seconds
  delay(100);
}

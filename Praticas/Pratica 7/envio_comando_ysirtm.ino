uint8_t my_serial_bytes[5]={0xA1, 0xF1, 0x04, 0xFB, 0x12};

void setup() {
        Serial.begin(9600);     // opens serial port, sets data rate to 9600 bps
}

void loop() {
  
  
Serial.write(my_serial_bytes, sizeof(my_serial_bytes));


delay(1000);        // delay 5sec
                
        
}
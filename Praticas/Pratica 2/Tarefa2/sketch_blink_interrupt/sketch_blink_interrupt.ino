//CONNECT pinOut WITH pinInt0!  
  
int pinLed = 13;  
int pinOut = 11;  
int pinInt0 = 2;  
volatile int state = LOW;  
  
void setup(){  
     pinMode(pinOut, OUTPUT);  
     pinMode(pinLed, OUTPUT);  
     attachInterrupt(digitalPinToInterrupt(pinInt0), blink, CHANGE); 
     digitalWrite(pinLed, LOW); 
}  
void loop(){  
     digitalWrite(pinOut, state);  
     state = !state;  
     delay(500);  
}  
  
void blink(){  
     digitalWrite(pinLed,state);  
}  

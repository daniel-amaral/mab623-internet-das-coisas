//CONNECT pinOut WITH pinInt0!  

int pinOut = 3;  
int pinInt0 = 2;  
volatile int state = LOW;  
  
void setup(){  
     Serial.begin(9600);
     pinMode(pinOut, OUTPUT);
     pinMode(pinInt0, INPUT_PULLUP);
     attachInterrupt(digitalPinToInterrupt(pinInt0), blink, CHANGE);
}  
void loop(){  
     digitalWrite(pinOut, state);  
}  
  
void blink(){  
     state = !state;
}  

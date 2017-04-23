int led = 2;

uint32_t latchValue;

void setup() {            
  //230kHz  
  pinMode(led, OUTPUT);     
  
  //2.93MHz
  //pinMode(3, OUTPUT_FAST);
  //latchValue = fastGpioDigitalLatch();
  
  //477kHz e 638kHz
  //pinMode(2, OUTPUT_FAST);
}

void loop() {
  //230kHz e 477kHz
  digitalWrite(led, HIGH);
  digitalWrite(led, LOW);
  
  //638kHz
  /*
  register int x = 0;
  while(1){
    fastGpioDigitalWrite(GPIO_FAST_IO2, x);
    x =!x;
  }
  */
  
  
  //2.93MHz
  /*
  while(1){
    fastGpioDigitalWriteDestructive(latchValue);
    latchValue ^= GPIO_FAST_IO3;
  }
  */
}

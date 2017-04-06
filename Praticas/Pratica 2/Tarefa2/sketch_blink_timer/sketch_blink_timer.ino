#include <TimerOne.h>

int ledPin = 3;
int pwm = 0;
int direcao = 1;

void setup() 
{
  // Initialize the digital pin as an output.
  // Pin 13 has an LED connected on most Arduino boards
  pinMode(ledPin, OUTPUT);    

  Timer1.initialize(100000); // set a timer of length 100000 microseconds (or 0.1 sec - or 10Hz => the led will blink 5 times, 5 cycles of on-and-off, per second)
  Timer1.attachInterrupt( timerIsr , 100000); // the callback will be called on each 5th timer interrupt, i.e. every 0.5 sec
}
 
void loop()
{
  analogWrite(ledPin, pwm);
}
 
/// --------------------------
/// Custom ISR Timer Routine
/// --------------------------
void timerIsr()
{
  int fator = 20;
  
  if (direcao)
    pwm += fator;
  else
    pwm -= fator;

  pwm = (pwm > 255) ? 255 : pwm;
  pwm = (pwm < 0) ? 0 : pwm;

  if (pwm >= 255 || pwm <= 0){
    direcao = !direcao;
  }
}

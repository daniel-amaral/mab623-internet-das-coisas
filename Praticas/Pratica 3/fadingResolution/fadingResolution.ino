
#define MAX 4095

int ledPin = 3;
int pwm = 0;
int direcao = 1;

void setup() 
{
  pinMode(ledPin, OUTPUT);
  analogWriteResolution(12);
}
 
void loop()
{
  int fator = 200;
  
  if (direcao)
    pwm += fator;
  else
    pwm -= fator;

  pwm = (pwm > MAX) ? MAX : pwm;
  pwm = (pwm < 0) ? 0 : pwm;

  if (pwm >= MAX || pwm <= 0){
    direcao = !direcao;
  }
  
  analogWrite(ledPin, pwm);
  
  delay(200);
}

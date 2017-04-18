
#define MAX 4095

int ledPin = 3;

void setup() 
{  
  analogWriteResolution(12);
  analogReadResolution(12);
  pinMode(A0, INPUT);
  pinMode(ledPin, OUTPUT);
}
 
void loop()
{
  // lendo potenciometro:
  int leitura = analogRead(A0);
  Serial.print(leitura, DEC);
  
  analogWrite(ledPin, leitura);
  
  delay(200);
}

void setup(){
  analogReference(EXTERNAL);
  pinMode(A0, INPUT);
  pinMode(3, OUTPUT);
  Serial.begin(9600);
  Serial.println("Valor no potenciometro:");
  Serial.println("DEC\tHEX\tOCT\tBIN\t\tTensao");
}

void loop(){
  // lendo potenciometro:
  int leitura = analogRead(A0);

  // imprimindo valor lido:
  Serial.print(leitura, DEC);
  Serial.print("\t");
  Serial.print(leitura, HEX);
  Serial.print("\t");
  Serial.print(leitura, OCT);
  Serial.print("\t");
  Serial.print(leitura, BIN);
  Serial.print("\t");

  // calculando valor lido como tensão (em volts):
  float tensao = (3.3f*leitura)/1023.0f;
  Serial.println(tensao,1);

  // acendendo LED de acordo com valor lido, através de uma onda PWM:
  int pwm = map(leitura, 0, 1023, 0, 255);
  analogWrite(3, pwm);
  
  delay(1000);
}


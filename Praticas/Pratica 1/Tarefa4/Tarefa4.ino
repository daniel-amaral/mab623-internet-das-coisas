#define LED_PIN     3

void setup(){
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  Serial.begin(9600);
  Serial.print("Insira um valor: ");
}

void loop(){
  long valor = 0;  
  if (Serial.available() > 0){
    valor = Serial.parseInt();    
    if(valor>100)
      valor=100;
    if(valor<0)
      valor=0;
    Serial.println(valor);    
    valor = map(valor, 0, 100, 0, 255);
    analogWrite(LED_PIN, valor);
    Serial.print("Insira um valor: ");
  }
  delay(50);
}


void setup(){
  pinMode(1, INPUT);
  Serial.begin(9600);
}

void loop(){
  if (digitalRead(1) == LOW){
    Serial.println("LIGADO");
  } else {
    Serial.println("DESLIGADO");
  }
  delay(1000);
}


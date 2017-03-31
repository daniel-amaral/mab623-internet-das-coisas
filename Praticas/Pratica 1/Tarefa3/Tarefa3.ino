#define BUTTON_PIN  3
#define LED_PIN     2

enum EstadoBotao {
  LIGADO,
  DESLIGADO
};

EstadoBotao ultimoEstado = DESLIGADO;

void setup(){
  DDRD = B0100; //pinMode(BUTTON_PIN, INPUT);  pinMode(LED_PIN, OUTPUT);
  PORTD = 0; //digitalWrite(LED_PIN, LOW);
  bitWrite(PORTD, BUTTON_PIN, 1); //Ativa o pullup resistor no pino BUTTON_PIN  
  Serial.begin(9600);
}

void loop(){
  if ( /*digitalRead(BUTTON_PIN)*/ bitRead(PIND, BUTTON_PIN) == 0){
    if(ultimoEstado != LIGADO)
      Serial.println("LIGADO"); //Só imprime se o estado do botão mudar
    bitSet(PORTD, LED_PIN); //digitalWrite(LED_PIN, HIGH);     
    ultimoEstado = LIGADO;
  } else {
    if(ultimoEstado != DESLIGADO)
      Serial.println("DESLIGADO"); //Só imprime se o estado do botão mudar
    bitClear(PORTD, LED_PIN); //digitalWrite(LED_PIN, LOW);        
    ultimoEstado = DESLIGADO;
  }
  delay(50);  
}

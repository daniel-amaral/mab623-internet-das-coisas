#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define TOTAL_LEITURAS 200

const int LM35 = A0;
float temperaturaMedia=0;
int i=0;

Adafruit_SSD1306 display(0);

void setup() {
  analogReference(INTERNAL);
  
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();   //Apaga o buffer e o display
  display.setTextSize(2);  //Seta o tamanho do texto
  display.setTextColor(WHITE); //Seta a cor do texto
  display.setCursor(0,0);  //Seta a posição do cursor  
  display.setTextWrap(true); //Ativa o line wrapping
  display.display();
}
 
//Função que será executada continuamente
void loop() {
  /*If you use 1.1V as aRef, the equation changes entirely. If you divide 1.1V over 1024, 
   * each step up in the analog reading is equal to approximately 0.001074V = 1.0742 mV. 
   * If 10mV is equal to 1 degree Celcius, 10 / 1.0742 = ~9.31. So, for every change 
   * of 9.31 in the analog reading, there is one degree of temperature change.
   */
  
  float temperatura;
  temperatura = analogRead(LM35); //(float(analogRead(LM35))*1.1f/(1023.0f))/0.01f;
  temperatura = map(temperatura, 0, 1023, 0, 1100 /*1.1V = 1100mV*/);
  temperatura /= 10.0f;
  temperaturaMedia += temperatura;
  i++;

  if(i==TOTAL_LEITURAS){    
    temperaturaMedia/=TOTAL_LEITURAS;    
    i=0;    

    display.clearDisplay();
    display.setTextSize(2);   
    display.setCursor(0,0);
        
    display.print(temperaturaMedia);
    display.println(" C");
    
    temperaturaMedia = ((9.0f/5.0f)*temperaturaMedia) + 32.0f;
    display.print(temperaturaMedia);
    display.println(" F\n");
    display.setTextSize(1);
    display.print("\nGrupo 1");
    display.display();
    
    temperaturaMedia=0;
    delay(2000);
  }    
}

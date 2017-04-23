void setup() {
  Serial.begin(9600);
  //pinMode(13, OUTPUT);
  system("echo -n \"7\" > /sys/class/gpio/export");
  //Above command will create “/sys/class/gpio/gpio7″ folder.
  
  system("ls /sys/class/gpio > /dev/ttyGS0");
  
  system("echo -n \"out\" > /sys/class/gpio/gpio7/direction");
  
  system("cat /sys/class/gpio/gpio7/direction > /dev/ttyGS0");
  //Above command will set the direction of gpio7 to “out.” To set the direction to input then execute “echo -n “in” > /sys/class/gpio/gpio7/direction“.

}

void loop() {
  system("echo -n \"1\" > /sys/class/gpio/gpio7/value");
  system("cat /sys/class/gpio/gpio7/value > /dev/ttyGS0");
  
  delay(1000);
  
  system("echo -n \"0\" > /sys/class/gpio/gpio7/value");
  system("cat /sys/class/gpio/gpio7/value > /dev/ttyGS0");

  delay(1000);
}

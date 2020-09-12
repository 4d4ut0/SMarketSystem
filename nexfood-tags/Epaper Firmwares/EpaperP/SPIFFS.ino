void readFile(fs::FS &fs, const char * path){
    Serial.printf("Reading file: %s\r\n", path);

    File file = fs.open(path);
    if(!file || file.isDirectory()){
        Serial.println("- failed to open file for reading");
        return;
    }

    Serial.println("- read from file:");
    ssid = file.readStringUntil('\n');
    password = file.readStringUntil('\n');
    domain = file.readStringUntil('\n');
    
    Serial.println(ssid);
    Serial.println(password);
    Serial.println(domain);
    file.close();
}

void readServer(fs::FS &fs, const char * path){
    Serial.printf("Reading file: %s\r\n", path);
    sleepingTimeInMinutes = 1;

    File file = fs.open(path);
    if(!file || file.isDirectory()){
        Serial.println("- failed to open file for reading");
        priceGet = -1;
        return;
    }

    Serial.println("- read from file:");
    String auxS = file.readStringUntil('\n');
    char auxC[10] = "";
    auxS.toCharArray(auxC, 10);
    priceGet = atof(auxC);
    Serial.println(priceGet);
    file.close();
}

void writeFile(fs::FS &fs, const char * path, const char * message){
    Serial.printf("Writing file: %s\r\n", path);

    File file = fs.open(path, FILE_WRITE);
    if(!file){
        Serial.println("- failed to open file for writing");
        return;
    }
    if(file.print(message)){
        Serial.println("- file written");
    } else {
        Serial.println("- frite failed");
    }
}

void appendFile(fs::FS &fs, const char * path, const char * message){
    Serial.printf("Appending to file: %s\r\n", path);

    File file = fs.open(path, FILE_APPEND);
    if(!file){
        Serial.println("- failed to open file for appending");
        return;
    }
    if(file.print(message)){
        Serial.println("- message appended");
    } else {
        Serial.println("- append failed");
    }
}

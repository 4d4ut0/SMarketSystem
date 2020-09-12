String nexStringConvert(String newString){
  newString.replace("À","!");
  newString.replace("Á","\"");
  newString.replace("Â","#");
  newString.replace("È","$");
  newString.replace("%","É");
  newString.replace("&","!");
  newString.replace("'","Ì");
  newString.replace("(","Í");
  newString.replace(")","Ò");
  newString.replace("*","Ó");
  
  newString.replace("+","Ô");
  newString.replace(",","Ù");
  newString.replace("-","Ú");
  newString.replace(".","Û");
  newString.replace("/","Ü");
  newString.replace("à","0");
  newString.replace("á","1");
  newString.replace("â","2");
  newString.replace("ã","3");
  newString.replace("ç","4");
  
  newString.replace("è","5");
  newString.replace("é","6");
  newString.replace("Ã","7");
  newString.replace("À","8");
  newString.replace("ì","9");
  newString.replace("í",":");
  newString.replace("ò",";");
  newString.replace("ó","<");
  newString.replace("ô","=");
  newString.replace("õ",">");
  
  newString.replace("ù","?");
  newString.replace("ú","@");
  
  
  return newString;
}

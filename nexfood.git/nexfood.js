function price_banana(shelf_life_day, max_price, min_price){
  let x0 = 60.72314286;
  let x1 = 1.55690476*shelf_life_day;
  let x2 = 1.39150794*Math.pow(shelf_life_day,2);
  let x3 = -0.14592593*Math.pow(shelf_life_day,3);
  return ((max_price-min_price)*(x0+x1+x2+x3)/100) + min_price
}

function price_mango(shelf_life_day, max_price, min_price){
  let x0 = 97.78;
  let x1 = -8.51416361*shelf_life_day;
  let x2 = 0.46876475*Math.pow(shelf_life_day,2);
  let x3 = -0.01653032*Math.pow(shelf_life_day,3);
  return ((max_price-min_price)*(x0+x1+x2+x3)/100) + min_price
}

function price_tomato(shelf_life_day, max_price, min_price){
  let x0 = 89.175;
  let x1 = -31.52454085*shelf_life_day;
  let x2 = 16.58974630*Math.pow(shelf_life_day,2);
  let x3 = -2.39960746*Math.pow(shelf_life_day,3);
  let x4 = -0.27997871*Math.pow(shelf_life_day,4);
  let x5 = 0.10963911*Math.pow(shelf_life_day,5);
  let x6 = -0.01141512*Math.pow(shelf_life_day,6);
  let x7 = 0.00051531*Math.pow(shelf_life_day,7);
  let x8 = -0.00000870*Math.pow(shelf_life_day,8);
  return ((max_price-min_price)*(x0+x1+x2+x3+x4+x5+x6+x7+x8)/100) + min_price
}

function price_onion(shelf_life_day, max_price, min_price){
  let x0 = 89.95964945;
  let x1 = -1.12632074*shelf_life_day;
  let x2 = 1.06750940*Math.pow(shelf_life_day,2);
  let x3 = -2.09160090*Math.pow(shelf_life_day,3);
  let x4 = 0.63111903*Math.pow(shelf_life_day,4);
  let x5 = -0.08066251*Math.pow(shelf_life_day,5);
  let x6 = 0.00481741*Math.pow(shelf_life_day,6);
  let x7 = -0.00011068*Math.pow(shelf_life_day,7);
  return ((max_price-min_price)*(x0+x1+x2+x3+x4+x5+x6+x7)/100) + min_price
}

function price_strawberry(shelf_life_day, max_price, min_price){
  let x0 = 99.99999998;
  let x1 = 2731.02955505*shelf_life_day;
  let x2 = -14524.90748586*Math.pow(shelf_life_day,2);
  let x3 = 30618.32979934*Math.pow(shelf_life_day,3);
  let x4 = -34380.31714226*Math.pow(shelf_life_day,4);
  let x5 = 23035.08740218*Math.pow(shelf_life_day,5);
  let x6 = -9676.28831629*Math.pow(shelf_life_day,6);
  let x7 = 2573.69481422*Math.pow(shelf_life_day,7);
  let x8 = -421.07170361*Math.pow(shelf_life_day,8);
  let x9 = 38.66841622*Math.pow(shelf_life_day,9);
  let x10 = -1.52533898*Math.pow(shelf_life_day,10);
  return ((max_price-min_price)*(x0+x1+x2+x3+x4+x5+x6+x7+x8+x9+x10)/100) + min_price
}

function price_grape(shelf_life_day, max_price, min_price){
  let x0 = 67.77777778;
  let x1 = 1.18159012*shelf_life_day;
  let x2 = -0.00900188*Math.pow(shelf_life_day,2);
  let x3 = -0.00084827*Math.pow(shelf_life_day,3);
  return ((max_price-min_price)*(x0+x1+x2+x3)/100) + min_price
}

function price_generic(shelf_life_day, shelf_life, max_price, min_price) {
  if (typeof shelf_life === 'undefined'){
    return -1;
  } else{
    return ((max_price-min_price)*(shelf_life_day/shelf_life)) + min_price
  }
}

function price_fruit(type_fruit, shelf_life_day, max_price, min_price, shelf_life) {
  switch (type_fruit) {
    case 'banana':
      return price_banana(shelf_life_day, max_price, min_price);
    case 'manga':
      return price_mango(shelf_life_day, max_price, min_price);
    case 'tomate':
      return price_tomato(shelf_life_day, max_price, min_price);
    case 'morango':
      return price_strawberry(shelf_life_day, max_price, min_price);
    case 'cebola':
      return price_onion(shelf_life_day, max_price, min_price);
    case 'uva':
      return price_grape(shelf_life_day, max_price, min_price);
    default:
      return price_generic(shelf_life_day, max_price, min_price, shelf_life);
  }
}

//Testes
function tst_banana() {
  let error = false;
  if(Math.trunc(price_fruit('banana', 0, 100, 0)) !== Math.trunc(60.72)){
    error = true;
    alert("Erro em 0")
  }
  if(Math.trunc(price_fruit('banana', 1, 100, 0)) !== Math.trunc(63.53)){
    error = true;
    alert("Erro em 1")
  }
  if(Math.trunc(price_fruit('banana', 2, 100, 0)) !== Math.trunc(68.24)){
    error = true;
    alert("Erro em 2")
  }
  if(Math.trunc(price_fruit('banana', 3, 100, 0)) !== Math.trunc(73.98)){
    error = true;
    alert("Erro em 3")
  }
  if(Math.trunc(price_fruit('banana', 4, 100, 0)) !== Math.trunc(79.88)){
    error = true;
    alert("Erro em 4")
  }
  if(Math.trunc(price_fruit('banana', 5, 100, 0)) !== Math.trunc(85.05)){
    error = true;
    alert("Erro em 5")
  }
  if(Math.trunc(price_fruit('banana', 6, 100, 0)) !== Math.trunc(88.64)){
    error = true;
    alert("Erro em 6")
  }
  if(Math.trunc(price_fruit('banana', 7, 100, 0)) !== Math.trunc(89.75)){
    error = true;
    alert("Erro em 7")
  }
  if(Math.trunc(price_fruit('banana', 8, 100, 0)) !== Math.trunc(87.52)){
    error = true;
    alert("Erro em 8")
  }
  if(Math.trunc(price_fruit('banana', 9, 100, 0)) !== Math.trunc(81.07)){
    error = true;
    alert("Erro em 9")
  }
  if(Math.trunc(price_fruit('banana', 10, 100, 0)) !== Math.trunc(69.52)){
    error = true;
    alert("Erro em 10")
  }
  if(Math.trunc(price_fruit('banana', 11, 100, 0)) !== Math.trunc(51.99)){
    error = true;
    alert("Erro em 11")
  }
  if(Math.trunc(price_fruit('banana', 12, 100, 0)) !== Math.trunc(27.62)){
    error = true;
    alert("Erro em 12")
  }
  if(!error){
    alert("Banana Daleeeeee!")
  }
}

function tst_mango() {
  let error = false;
  if(Math.trunc(price_fruit('manga', 0, 100, 0)) !== Math.trunc(97.78)){
    error = true;
    alert("Erro em 0")
  }
  if(Math.trunc(price_fruit('manga', 1, 100, 0)) !== Math.trunc(89.72)){
    error = true;
    alert("Erro em 1")
  }
  if(Math.trunc(price_fruit('manga', 2, 100, 0)) !== Math.trunc(82.49)){
    error = true;
    alert("Erro em 2")
  }
  if(Math.trunc(price_fruit('manga', 3, 100, 0)) !== Math.trunc(76.01)){
    error = true;
    alert("Erro em 3")
  }
  if(Math.trunc(price_fruit('manga', 4, 100, 0)) !== Math.trunc(70.17)){
    error = true;
    alert("Erro em 4")
  }
  if(Math.trunc(price_fruit('manga', 5, 100, 0)) !== Math.trunc(64.86)){
    error = true;
    alert("Erro em 5")
  }
  //6
  if(Math.trunc(price_fruit('manga', 7, 100, 0)) !== Math.trunc(55.48)){
    error = true;
    alert("Erro em 7")
  }
  if(Math.trunc(price_fruit('manga', 8, 100, 0)) !== Math.trunc(51.20)){
    error = true;
    alert("Erro em 8")
  }
  if(Math.trunc(price_fruit('manga', 9, 100, 0)) !== Math.trunc(47.07)){
    error = true;
    alert("Erro em 9")
  }
  if(Math.trunc(price_fruit('manga', 10, 100, 0)) !== Math.trunc(42.98)){
    error = true;
    alert("Erro em 10")
  }
  if(Math.trunc(price_fruit('manga', 11, 100, 0)) !== Math.trunc(38.84)){
    error = true;
    alert("Erro em 11")
  }
  if(Math.trunc(price_fruit('manga', 12, 100, 0)) !== Math.trunc(34.55)){
    error = true;
    alert("Erro em 12")
  }
  //13
  if(Math.trunc(price_fruit('manga', 14, 100, 0)) !== Math.trunc(25.10)){
    error = true;
    alert("Erro em 14")
  }
  if(Math.trunc(price_fruit('manga', 15, 100, 0)) !== Math.trunc(19.75)){
    error = true;
    alert("Erro em 15")
  }
  if(Math.trunc(price_fruit('manga', 16, 100, 0)) !== Math.trunc(13.85)){
    error = true;
    alert("Erro em 16")
  }
  if(Math.trunc(price_fruit('manga', 17, 100, 0)) !== Math.trunc(7.30)){
    error = true;
    alert("Erro em 17")
  }
  //18
  if(!error){
    alert("Manga Daleeeeee!")
  }
}

function tst_tomato() {
  let error = false;
  if(Math.trunc(price_fruit('tomate', 0, 100, 0)) !== Math.trunc(89.18)){
    error = true;
    alert("Erro em 0")
  }
  if(Math.trunc(price_fruit('tomate', 1, 100, 0)) !== Math.trunc(71.66)){
    error = true;
    alert("Erro em 1")
  }
  if(Math.trunc(price_fruit('tomate', 2, 100, 0)) !== Math.trunc(71.65)){
    error = true;
    alert("Erro em 2")
  }
  if(Math.trunc(price_fruit('tomate', 3, 100, 0)) !== Math.trunc(75.83)){
    error = true;
    alert("Erro em 3")
  }
  if(Math.trunc(price_fruit('tomate', 4, 100, 0)) !== Math.trunc(76.65)){
    error = true;
    alert("Erro em 4")
  }
  if(Math.trunc(price_fruit('tomate', 5, 100, 0)) !== Math.trunc(72.48)){
    error = true;
    alert("Erro em 5")
  }
  if(Math.trunc(price_fruit('tomate', 6, 100, 0)) !== Math.trunc(65.70)){
    error = true;
    alert("Erro em 6")
  }
  if(Math.trunc(price_fruit('tomate', 7, 100, 0)) !== Math.trunc(60.05)){
    error = true;
    alert("Erro em 7")
  }
  if(Math.trunc(price_fruit('tomate', 8, 100, 0)) !== Math.trunc(58.27)){
    error = true;
    alert("Erro em 8")
  }
  if(Math.trunc(price_fruit('tomate', 9, 100, 0)) !== Math.trunc(60.73)){
    error = true;
    alert("Erro em 9")
  }
  if(Math.trunc(price_fruit('tomate', 10, 100, 0)) !== Math.trunc(65.25)){
    error = true;
    alert("Erro em 10")
  }
  if(Math.trunc(price_fruit('tomate', 11, 100, 0)) !== Math.trunc(68.33)){
    error = true;
    alert("Erro em 11")
  }
  if(Math.trunc(price_fruit('tomate', 12, 100, 0)) !== Math.trunc(67.03)){
    error = true;
    alert("Erro em 12")
  }
  //13
  //14
  //15
  //16
  //17
  //18
  if(!error){
    alert("Tomate Daleeeeee!")
  }
}

function tst_onion() {
  let error = false;
  //0
  if(Math.trunc(price_fruit('cebola', 1, 100, 0)) !== Math.trunc(88.36)){
    error = true;
    alert("Erro em 1")
  }
  //2
  //3
  //4
  //5
  //6
  //7
  //8
  if(Math.trunc(price_fruit('cebola', 9, 100, 0)) !== Math.trunc(50.00)){
    error = true;
    alert("Erro em 9")
  }
  //10
  if(Math.trunc(price_fruit('cebola', 11, 100, 0)) !== Math.trunc(49.73)){
    error = true;
    alert("Erro em 11")
  }
  if(Math.trunc(price_fruit('cebola', 12, 100, 0)) !== Math.trunc(50.00)){
    error = true;
    alert("Erro em 12")
  }
  if(Math.trunc(price_fruit('cebola', 13, 100, 0)) !== Math.trunc(44.09)){
    error = true;
    alert("Erro em 13")
  }
  if(Math.trunc(price_fruit('cebola', 14, 100, 0)) !== Math.trunc(12.50)){
    error = true;
    alert("Erro em 14")
  }
  if(!error){
    alert("Cebola Daleeeeee!")
  }
}

function tst_strawberry() {
  let error = false;
  //0
  //0.5
  if(Math.trunc(price_fruit('morango', 1, 100, 0)) !== Math.trunc(92.7)){
    error = true;
    alert("Erro em 1")
  }
  if(Math.trunc(price_fruit('morango', 1.5, 100, 0)) !== Math.trunc(86.7)){
    error = true;
    alert("Erro em 1.5")
  }
  if(Math.trunc(price_fruit('morango', 2, 100, 0)) !== Math.trunc(39.2)){
    error = true;
    alert("Erro em 2")
  }
  if(Math.trunc(price_fruit('morango', 2.5, 100, 0)) !== Math.trunc(38.1)){
    error = true;
    alert("Erro em 2.5")
  }
  //3
  //3.5
  if(Math.trunc(price_fruit('morango', 4, 100, 0)) !== Math.trunc(10.2)){
    error = true;
    alert("Erro em 4")
  }
  if(Math.trunc(price_fruit('morango', 4.5, 100, 0)) !== Math.trunc(6.65)){
    error = true;
    alert("Erro em 4.5")
  }
  if(Math.trunc(price_fruit('morango', 5, 100, 0)) !== Math.trunc(3.78)){
    error = true;
    alert("Erro em 5")
  }
  if(!error){
    alert("Morango Daleeeeee!")
  }
}

function tst_grape() {
  let error = false;
  if(Math.trunc(price_fruit('uva', 0, 100, 0)) !== Math.trunc(67.78)){
    error = true;
    alert("Erro em 0")
  }
  if(Math.trunc(price_fruit('uva', 1, 100, 0)) !== Math.trunc(68.90)){
    error = true;
    alert("Erro em 1")
  }
  //2
  //3
  //4
  //5
  //6
  //7
  //8
  //9
  //10
  //11
  //12
  //13
  //14
  if(!error){
    alert("Uva Daleeeeee!")
  }
}

function tst_generic() {
  let error = false;
  if(Math.trunc(price_fruit('ujbef', 0, 100, 0, 10)) !== Math.trunc(0)){
    error = true;
    alert(price_fruit('ujbef', 0, 100, 0, 10))
    alert("Erro em 0")
  }
  if(Math.trunc(price_fruit('ujbef', 5, 100, 0, 10)) !== Math.trunc(5)){
    error = true;
    alert("Erro em 5")
  }
  if(Math.trunc(price_fruit('ujbef', 10, 100, 0, 10)) !== Math.trunc(10)){
    error = true;
    alert("Erro em 10")
  }
  if(!error){
    alert("Banana Daleeeeee!")
  }
}

function teste() {
  tst_banana();
  tst_mango();
  tst_tomato();
  tst_onion();
  tst_strawberry();
  tst_grape();
  tst_generic()
}










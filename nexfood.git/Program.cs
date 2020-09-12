using System;

namespace Nexsolar
{
    class Program
    {
       
       private static double price_banana(double shelf_life_day, double max_price, double min_price)
        {
            double x0 = 60.72314286;
            double x1 = 1.55690476 * shelf_life_day;
            double x2 = 1.39150794 * Math.Pow(shelf_life_day, 2);
            double x3 = -0.14592593 * Math.Pow(shelf_life_day, 3);
            return ((max_price - min_price) * (x0 + x1 + x2 + x3) / 100) + min_price;
}

       private static double price_mango(double shelf_life_day, double max_price, double min_price)
        {
            double x0 = 97.78;
            double x1 = -8.51416361 * shelf_life_day;
            double x2 = 0.46876475 * Math.Pow(shelf_life_day, 2);
            double x3 = -0.01653032 * Math.Pow(shelf_life_day, 3);
            return ((max_price - min_price) * (x0 + x1 + x2 + x3) / 100) + min_price;
        }

       private static double price_tomato(double shelf_life_day, double max_price, double min_price)
        {
            double x0 = 89.175;
            double x1 = -31.52454085 * shelf_life_day;
            double x2 = 16.58974630 * Math.Pow(shelf_life_day, 2);
            double x3 = -2.39960746 * Math.Pow(shelf_life_day, 3);
            double x4 = -0.27997871 * Math.Pow(shelf_life_day, 4);
            double x5 = 0.10963911 * Math.Pow(shelf_life_day, 5);
            double x6 = -0.01141512 * Math.Pow(shelf_life_day, 6);
            double x7 = 0.00051531 * Math.Pow(shelf_life_day, 7);
            double x8 = -0.00000870 * Math.Pow(shelf_life_day, 8);
            return ((max_price - min_price) * (x0 + x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8) / 100) + min_price;
        }

       private static double price_onion(double shelf_life_day, double max_price, double min_price)
        {
            double x0 = 89.95964945;
            double x1 = -1.12632074 * shelf_life_day;
            double x2 = 1.06750940 * Math.Pow(shelf_life_day, 2);
            double x3 = -2.09160090 * Math.Pow(shelf_life_day, 3);
            double x4 = 0.63111903 * Math.Pow(shelf_life_day, 4);
            double x5 = -0.08066251 * Math.Pow(shelf_life_day, 5);
            double x6 = 0.00481741 * Math.Pow(shelf_life_day, 6);
            double x7 = -0.00011068 * Math.Pow(shelf_life_day, 7);
            return ((max_price - min_price) * (x0 + x1 + x2 + x3 + x4 + x5 + x6 + x7) / 100) + min_price;
        }

       private static double price_strawberry(double shelf_life_day, double max_price, double min_price)
        {
            double x0 = 99.99999998;
            double x1 = 2731.02955505 * shelf_life_day;
            double x2 = -14524.90748586 * Math.Pow(shelf_life_day, 2);
            double x3 = 30618.32979934 * Math.Pow(shelf_life_day, 3);
            double x4 = -34380.31714226 * Math.Pow(shelf_life_day, 4);
            double x5 = 23035.08740218 * Math.Pow(shelf_life_day, 5);
            double x6 = -9676.28831629 * Math.Pow(shelf_life_day, 6);
            double x7 = 2573.69481422 * Math.Pow(shelf_life_day, 7);
            double x8 = -421.07170361 * Math.Pow(shelf_life_day, 8);
            double x9 = 38.66841622 * Math.Pow(shelf_life_day, 9);
            double x10 = -1.52533898 * Math.Pow(shelf_life_day, 10);
            return ((max_price - min_price) * (x0 + x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8 + x9 + x10) / 100) + min_price;
        }

       private static double price_grape(double shelf_life_day, double max_price, double min_price)
        {
            double x0 = 67.77777778;
            double x1 = 1.18159012 * shelf_life_day;
            double x2 = -0.00900188 * Math.Pow(shelf_life_day, 2);
            double x3 = -0.00084827 * Math.Pow(shelf_life_day, 3);
            return ((max_price - min_price) * (x0 + x1 + x2 + x3) / 100) + min_price;
        }

       private static double price_generic(double shelf_life_day, int shelf_life, double max_price, double min_price)
        {
            if (shelf_life == -1)
            {
                return -1;
            }
            else
            {
                return ((max_price - min_price) * (shelf_life_day / shelf_life)) + min_price;
          }
        }

       private static double price_fruit(String type_fruit, double shelf_life_day, double max_price, double min_price, int shelf_life)
        {
            switch (type_fruit)
            {
                case "banana":
                    return price_banana(shelf_life_day, max_price, min_price);
                case "manga":
                    return price_mango(shelf_life_day, max_price, min_price);
                case "tomate":
                    return price_tomato(shelf_life_day, max_price, min_price);
                case "morango":
                    return price_strawberry(shelf_life_day, max_price, min_price);
                case "cebola":
                    return price_onion(shelf_life_day, max_price, min_price);
                case "uva":
                    return price_grape(shelf_life_day, max_price, min_price);
                default:
                    return price_generic(shelf_life_day, shelf_life, max_price, min_price);
            }
        }

        //Testes
        private static void tst_banana()
        {
            bool error = false;
            if (Math.Round(price_fruit("banana", 0, 100, 0, 0)) != Math.Round(60.72))
            {
                error = true;
                Console.WriteLine("Erro em 0");
            }
            if (Math.Round(price_fruit("banana", 1, 100, 0, 0)) != Math.Round(63.53))
            {
                error = true;
                Console.WriteLine("Erro em 1");
            }
            if (Math.Round(price_fruit("banana", 2, 100, 0, 0)) != Math.Round(68.24))
            {
                error = true;
                Console.WriteLine("Erro em 2");
            }
            if (Math.Round(price_fruit("banana", 3, 100, 0, 0)) != Math.Round(73.98))
            {
                error = true;
                Console.WriteLine("Erro em 3");
            }
            if (Math.Round(price_fruit("banana", 4, 100, 0, 0)) != Math.Round(79.88))
            {
                error = true;
                Console.WriteLine("Erro em 4");
            }
            if (Math.Round(price_fruit("banana", 5, 100, 0, 0)) != Math.Round(85.05))
            {
                error = true;
                Console.WriteLine("Erro em 5");
            }
            if (Math.Round(price_fruit("banana", 6, 100, 0, 0)) != Math.Round(88.64))
            {
                error = true;
                Console.WriteLine("Erro em 6");
            }
            if (Math.Round(price_fruit("banana", 7, 100, 0, 0)) != Math.Round(89.75))
            {
                error = true;
                Console.WriteLine("Erro em 7");
            }
            if (Math.Round(price_fruit("banana", 8, 100, 0, 0)) != Math.Round(87.52))
            {
                error = true;
                Console.WriteLine("Erro em 8");
            }
            if (Math.Round(price_fruit("banana", 9, 100, 0, 0)) != Math.Round(81.07))
            {
                error = true;
                Console.WriteLine("Erro em 9");
            }
            if (Math.Round(price_fruit("banana", 10, 100, 0, 0)) != Math.Round(69.52))
            {
                error = true;
                Console.WriteLine("Erro em 10");
            }
            if (Math.Round(price_fruit("banana", 11, 100, 0, 0)) != Math.Round(51.99))
            {
                error = true;
                Console.WriteLine("Erro em 11");
            }
            if (Math.Round(price_fruit("banana", 12, 100, 0, 0)) != Math.Round(27.62))
            {
                error = true;
                Console.WriteLine("Erro em 12");
            }
            if (!error)
            {
                Console.WriteLine("Banana Daleeeeee!");
            }
        }

        private static void tst_mango()
        {
            bool error = false;
            if (Math.Round(price_fruit("manga", 0, 100, 0, 0)) != Math.Round(97.78))
            {
                error = true;
                Console.WriteLine("Erro em 0");
            }
            if (Math.Round(price_fruit("manga", 1, 100, 0, 0)) != Math.Round(89.72))
            {
                error = true;
                Console.WriteLine("Erro em 1");
            }
            if (Math.Round(price_fruit("manga", 2, 100, 0, 0)) != Math.Round(82.49))
            {
                error = true;
                Console.WriteLine("Erro em 2");
            }
            if (Math.Round(price_fruit("manga", 3, 100, 0, 0)) != Math.Round(76.01))
            {
                error = true;
                Console.WriteLine("Erro em 3");
            }
            if (Math.Round(price_fruit("manga", 4, 100, 0, 0)) != Math.Round(70.17))
            {
                error = true;
                Console.WriteLine("Erro em 4");
            }
            if (Math.Round(price_fruit("manga", 5, 100, 0, 0)) != Math.Round(64.86))
            {
                error = true;
                Console.WriteLine("Erro em 5");
            }
            //6
            if (Math.Round(price_fruit("manga", 7, 100, 0, 0)) != Math.Round(55.48))
            {
                error = true;
                Console.WriteLine("Erro em 7");
            }
            if (Math.Round(price_fruit("manga", 8, 100, 0, 0)) != Math.Round(51.20))
            {
                error = true;
                Console.WriteLine("Erro em 8");
            }
            if (Math.Round(price_fruit("manga", 9, 100, 0, 0)) != Math.Round(47.07))
            {
                error = true;
                Console.WriteLine("Erro em 9");
            }
            if (Math.Round(price_fruit("manga", 10, 100, 0, 0)) != Math.Round(42.98))
            {
                error = true;
                Console.WriteLine("Erro em 10");
            }
            if (Math.Round(price_fruit("manga", 11, 100, 0, 0)) != Math.Round(38.84))
            {
                error = true;
                Console.WriteLine("Erro em 11");
            }
            if (Math.Round(price_fruit("manga", 12, 100, 0, 0)) != Math.Round(34.55))
            {
                error = true;
                Console.WriteLine("Erro em 12");
            }
            //13
            if (Math.Round(price_fruit("manga", 14, 100, 0, 0)) != Math.Round(25.10))
            {
                error = true;
                Console.WriteLine("Erro em 14");
            }
            if (Math.Round(price_fruit("manga", 15, 100, 0, 0)) != Math.Round(19.75))
            {
                error = true;
                Console.WriteLine("Erro em 15");
            }
            if (Math.Round(price_fruit("manga", 16, 100, 0, 0)) != Math.Round(13.85))
            {
                error = true;
                Console.WriteLine("Erro em 16");
            }
            if (Math.Round(price_fruit("manga", 17, 100, 0, 0)) != Math.Round(7.30))
            {
                error = true;
                Console.WriteLine("Erro em 17");
            }
            //18
            if (!error)
            {
                Console.WriteLine("Manga Daleeeeee!");
            }
        }

        private static void tst_tomato()
        {
            bool error = false;
            if (Math.Round(price_fruit("tomate", 0, 100, 0, 0)) != Math.Round(89.18))
            {
                error = true;
                Console.WriteLine("Erro em 0");
            }
            if (Math.Round(price_fruit("tomate", 1, 100, 0, 0)) != Math.Round(71.66))
            {
                error = true;
                Console.WriteLine("Erro em 1");
            }
            if (Math.Round(price_fruit("tomate", 2, 100, 0, 0)) != Math.Round(71.65))
            {
                error = true;
                Console.WriteLine("Erro em 2");
            }
            if (Math.Round(price_fruit("tomate", 3, 100, 0, 0)) != Math.Round(75.83))
            {
                error = true;
                Console.WriteLine("Erro em 3");
            }
            if (Math.Round(price_fruit("tomate", 4, 100, 0, 0)) != Math.Round(76.65))
            {
                error = true;
                Console.WriteLine("Erro em 4");
            }
            if (Math.Round(price_fruit("tomate", 5, 100, 0, 0)) != Math.Round(72.48))
            {
                error = true;
                Console.WriteLine("Erro em 5");
            }
            if (Math.Round(price_fruit("tomate", 6, 100, 0, 0)) != Math.Round(65.70))
            {
                error = true;
                Console.WriteLine("Erro em 6");
            }
            if (Math.Round(price_fruit("tomate", 7, 100, 0, 0)) != Math.Round(60.05))
            {
                error = true;
                Console.WriteLine("Erro em 7");
            }
            if (Math.Round(price_fruit("tomate", 8, 100, 0, 0)) != Math.Round(58.27))
            {
                error = true;
                Console.WriteLine("Erro em 8");
            }
            if (Math.Round(price_fruit("tomate", 9, 100, 0, 0)) != Math.Round(60.73))
            {
                error = true;
                Console.WriteLine("Erro em 9");
            }
            if (Math.Round(price_fruit("tomate", 10, 100, 0, 0)) != Math.Round(65.25))
            {
                error = true;
                Console.WriteLine("Erro em 10");
            }
            if (Math.Round(price_fruit("tomate", 11, 100, 0, 0)) != Math.Round(68.33))
            {
                error = true;
                Console.WriteLine("Erro em 11");
            }
            if (Math.Round(price_fruit("tomate", 12, 100, 0, 0)) != Math.Round(67.03))
            {
                error = true;
                Console.WriteLine("Erro em 12");
            }
            //13
            //14
            //15
            //16
            //17
            //18
            if (!error)
            {
                Console.WriteLine("Tomate Daleeeeee!");
            }
        }

        private static void tst_onion()
        {
            bool error = false;
            //0
            if (Math.Round(price_fruit("cebola", 1, 100, 0, 0)) != Math.Round(88.36))
            {
                error = true;
                Console.WriteLine("Erro em 1");
            }
            //2
            //3
            //4
            //5
            //6
            //7
            //8
            if (Math.Round(price_fruit("cebola", 9, 100, 0, 0)) != Math.Round(50.00))
            {
                error = true;
                Console.WriteLine("Erro em 9");
            }
            //10
            if (Math.Round(price_fruit("cebola", 11, 100, 0, 0)) != Math.Round(49.73))
            {
                error = true;
                Console.WriteLine("Erro em 11");
            }
            if (Math.Round(price_fruit("cebola", 12, 100, 0, 0)) != Math.Round(50.00))
            {
                error = true;
                Console.WriteLine("Erro em 12");
            }
            if (Math.Round(price_fruit("cebola", 13, 100, 0, 0)) != Math.Round(44.09))
            {
                error = true;
                Console.WriteLine("Erro em 13");
            }
            if (Math.Round(price_fruit("cebola", 14, 100, 0, 0)) != Math.Round(12.50))
            {
                error = true;
                Console.WriteLine("Erro em 14");
            }
            if (!error)
            {
                Console.WriteLine("Cebola Daleeeeee!");
            }
        }

        private static void tst_strawberry()
        {
            bool error = false;
            //0
            //0.5
            if (Math.Round(price_fruit("morango", 1, 100, 0, 0)) != Math.Round(92.7))
            {
                error = true;
                Console.WriteLine("Erro em 1");
            }
            if (Math.Round(price_fruit("morango", 1.5, 100, 0, 0)) != Math.Round(86.7))
            {
                error = true;
                Console.WriteLine("Erro em 1.5");
            }
            if (Math.Round(price_fruit("morango", 2, 100, 0, 0)) != Math.Round(39.2))
            {
                error = true;
                Console.WriteLine("Erro em 2");
            }
            if (Math.Round(price_fruit("morango", 2.5, 100, 0, 0)) != Math.Round(38.1))
            {
                error = true;
                Console.WriteLine("Erro em 2.5");
            }
            //3
            //3.5
            if (Math.Round(price_fruit("morango", 4, 100, 0, 0)) != Math.Round(10.2))
            {
                error = true;
                Console.WriteLine("Erro em 4");
            }
            if (Math.Round(price_fruit("morango", 4.5, 100, 0, 0)) != Math.Round(6.65))
            {
                error = true;
                Console.WriteLine("Erro em 4.5");
            }
            if (Math.Round(price_fruit("morango", 5, 100, 0, 0)) != Math.Round(3.78))
            {
                error = true;
                Console.WriteLine("Erro em 5");
            }
            if (!error)
            {
                Console.WriteLine("Morango Daleeeeee!");
            }
        }

        private static void tst_grape()
        {
            bool error = false;
            if (Math.Round(price_fruit("uva", 0, 100, 0, 0)) != Math.Round(67.78))
            {
                error = true;
                Console.WriteLine("Erro em 0");
            }
            if (Math.Round(price_fruit("uva", 1, 100, 0, 0)) != Math.Round(68.90))
            {
                error = true;
                Console.WriteLine("Erro em 1");
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
            if (!error)
            {
                Console.WriteLine("Uva Daleeeeee!");
            }
        }

        private static void tst_generic()
        {
            bool error = false;
            if (Math.Round(price_fruit("ujbef", 0, 100, 0, 10)) != Math.Round(0.0))
            {
                error = true;
                Console.WriteLine(price_fruit("ujbef", 0, 100, 0, 10));
                Console.WriteLine("Erro em 0");
            }
            if (Math.Round(price_fruit("ujbef", 5, 100, 0, 10)) != Math.Round(5.0))
            {
                error = true;
                Console.WriteLine("Erro em 5");
            }
            if (Math.Round(price_fruit("ujbef", 10, 100, 0, 10)) != Math.Round(10.0))
            {
                error = true;
                Console.WriteLine("Erro em 10");
            }
            if (!error)
            {
                Console.WriteLine("Banana Daleeeeee!");
            }
        }

        private static void teste()
        {
            tst_banana();
            tst_mango();
            tst_tomato();
            tst_onion();
            tst_strawberry();
            tst_grape();
            tst_generic();
        }

        static void Main(string[] args)
        {
            teste();
        }

    }
}

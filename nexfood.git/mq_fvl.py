import numpy as np

""" Dados de Entrada """
'''
#tomates
x = np.array([0, 2, 4, 7, 9, 11, 14, 16, 18])
x1 = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
y = np.array([89.175, 71.65, 76.65, 60.05, 60.725, 68.325, 54.475, 60.85, 23.375])
'''
'''
#banana
x = np.array([0, 3, 6, 9, 12])
x1 = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
y = np.array([60.9, 73.27, 89.7, 80.36, 27.8])
'''
'''
#cebola
x = np.array([0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14])
x1 = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
y = np.array([90, 82.5, 75, 68.75, 50, 62.5, 50, 50, 50, 50, 50, 12.5])
'''
'''
#manga
x = np.array([0, 6, 13, 18])
x1 = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])
y = np.array([97.78, 60, 30, 0])
'''
'''
#morango
x = np.array([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
x1 = np.array(np.arange(0, 5.25, 0.25))
y = np.array([100,100,92.7,86.7,39.2,38.1,30,30,10.2,6.65,3.78])
'''
'''
#uva
x = np.array([0, 7, 14])
x1 = np.array(np.arange(0, 15, 1))
y = np.array([67.77777778, 68.61111111, 17.77777778])
'''

""" Ajuste da curva a um polinômio """
#p1 = np.polyfit(x,y,1)
p = np.polyfit(x,y,4)
for i in p:
    print(i)
print("--------------------")

for i in np.polyval(p,x1):
    print(i)
print("--------------------")


""" Plotagem dos gráficos """
import matplotlib.pyplot as plt
plt.plot(x,y,'o')
plt.plot(x,np.polyval(p,x),'g*')
plt.plot(x1,np.polyval(p,x1),'b*')
plt.xlabel("x")
plt.ylabel("y")
plt.show()

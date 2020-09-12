import socket
import cv2
import matplotlib.pyplot as plt

port = 8000
host = '127.0.0.1'
img_len = 3*4170337
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((host, port))
s.listen(5)

while True:
    conn, addr = s.accept()
    print('Conectado a {}'.format(addr))
    print("Recebendo Dados...\n")
    with open('recebido.png', 'wb') as f:
        print('file opened')
        print('Recebendo dados...')
        data = conn.recv(img_len)
        f.write(data)
        f.close()

    im = cv2.imread('recebido.png')
    im_resized = cv2.resize(im, (224, 224), interpolation=cv2.INTER_LINEAR)

    plt.imshow(cv2.cvtColor(im_resized, cv2.COLOR_BGR2RGB))
    plt.show()

''''''''''
    with open('input/1_A.jpg', 'rb') as f:
        conn.send(f.read())
        l = f.read()
        f.close()
    
print('Arquivo enviado')
'''
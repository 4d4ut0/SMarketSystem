import socket

host = '127.0.0.1'
port = 8000
img_len = 3*4170337
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))

with open('input/2_A.jpg', 'rb') as f:
    s.send(f.read())
    f.close()
    a = s.recv(4000)
    print(a)


'''
print("Recebendo Dados...\n")
with open('recebido.png', 'wb') as f:
    print('file opened')
    print('Recebendo dados...')
    data = s.recv(img_len)
    f.write(data)
    print("ENVIADO")
    f.close()

im = cv2.imread('recebido.png')
im_resized = cv2.resize(im, (224, 224), interpolation=cv2.INTER_LINEAR)

plt.imshow(cv2.cvtColor(im_resized, cv2.COLOR_BGR2RGB))
plt.show()

print('Transferência completa!!!')
s.close()
print('Conexão encerrada.')
'''
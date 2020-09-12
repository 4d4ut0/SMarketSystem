import numpy as np
import socket
import os
from threading import Thread
import cv2
import tensorflow as tf
import efficientnet.tfkeras as efn
from tensorflow.keras.models import Sequential

#classification
TargetSize = (112, 112)
num_classes = 3
input_shape = (112, 112, 3)
labels = ['MADURA', 'VERDE', 'COM MACHUCADOS']
prices = [8, 6, 4.5]
#server
port = 80
host = '192.168.0.14'
img_len = 3*4170337


def start_server():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((host, port))
    s.listen(5)
    os.system('cls') or None
    print('Servidor inicializado')
    return s


def start_connection(conn, addr, name_file, model):
    print('Conectado a {}'.format(addr))
    print("Recebendo Dados...\n")
    with open(name_file, 'wb') as f:
        print('file opened')
        data = conn.recv(img_len)
        f.write(data)
        f.close()
    print("Dados Recebidos, iniciando classificação...\n")
    category, share = classification(model, name_file)

    price = establish_a_price(category, share)
    print("Price: R$%s" % price)
    conn.send(price.encode())


def prepare_image(filepath):
    img = cv2.imread(filepath)
    print(img.shape)
    img_resized = cv2.resize(img, TargetSize, interpolation=cv2.INTER_CUBIC)
    img_result = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    return img_result


def prepare_model_efficient_net():
    model = Sequential()
    # Build Model
    enet = efn.EfficientNetB7(input_shape=input_shape, weights='imagenet', include_top=False)
    enet.trainable = True

    model = tf.keras.Sequential([
            enet,
            tf.keras.layers.GlobalMaxPooling2D(name="Layer1"),
            tf.keras.layers.Dense(num_classes, activation='softmax')
        ])

    # Compile Model
    model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model


def classification(model_enet, path_image):
    test_data = prepare_image(path_image).reshape(1, 112, 112, 3)  # duvidoso
    test_data = test_data / 255.0
    predictions = model_enet.predict(test_data)
    max_index = int(np.argmax(predictions[0]))
    print('Predicted: %s, Probability = %f' % (labels[max_index], predictions[0][max_index]))
    return max_index, predictions[0][max_index]


def establish_a_price(classified_type, price_share):
    return "{0:.2f}".format(round(prices[classified_type]*price_share, 2))


def main():
    model = prepare_model_efficient_net()
    model.load_weights("input/mango_efficientnet.h5")
    server = start_server()
    i = 0
    while True:
        i += 1
        name_file = 'recv/_' + str(i) + '_recebido.png'
        conn, addr = server.accept()
        Thread(target=start_connection, args=[conn, addr, name_file, model]).start()


if __name__ == "__main__":
    ''' 
        Predicted: VERDE, Probability = 0.999176
        Price 1_A: R$6.00
        Predicted: VERDE, Probability = 0.999869
        Price 1_B: R$6.00
        Predicted: VERDE, Probability = 0.966006
        Price 2_A: R$5.80
        Predicted: COM MACHUCADOS, Probability = 0.983288
        Price 2_B: R$4.42
    '''
    main()

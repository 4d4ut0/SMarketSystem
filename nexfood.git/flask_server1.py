import flask
import werkzeug
import numpy as np
import socket
import os
from threading import Thread
import base64
import json
import cv2
import time
import tensorflow as tf
from waitress import serve
import efficientnet.tfkeras as efn
from tensorflow.keras.models import Sequential


TargetSize = (112, 112)
num_classes = 3
input_shape = (112, 112, 3)
labels = ['MADURA', 'VERDE', 'COM MACHUCADOS']
prices = [8, 6, 4.5]
#server
port = 80
host = '10.0.0.5'
img_len = 3*4170337
app = flask.Flask(__name__)


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


def prepare_image(filepath):
    img = cv2.imread(filepath)
    print(img.shape)
    img_resized = cv2.resize(img, TargetSize, interpolation=cv2.INTER_CUBIC)
    img_result = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    return img_result


def classification(model_enet, path_image):
    test_data = prepare_image(path_image).reshape(1, 112, 112, 3)  # duvidoso
    test_data = test_data / 255.0
    predictions = model_enet.predict(test_data)
    max_index = int(np.argmax(predictions[0]))
    print('Predicted: %s, Probability = %f' % (labels[max_index], predictions[0][max_index]))
    return max_index, predictions[0][max_index]


def establish_a_price(classified_type, price_share):
    return "{0:.2f}".format(round(prices[classified_type]*price_share, 2))


model = prepare_model_efficient_net()
model.load_weights("input/mango_efficientnet.h5")

@app.route('/', methods=['GET', 'POST'])
def handle_request():
    files_ids = list(flask.request.files)
    print("\nNumber of Received Images : ", len(files_ids))
    image_num = 1
    for file_id in files_ids:
        print("\nSaving Image ", str(image_num), "/", len(files_ids))
        imagefile = flask.request.files[file_id]
        filename = werkzeug.utils.secure_filename(imagefile.filename)
        print("Image Filename : " + imagefile.filename)
        timestr = time.strftime("%Y%m%d-%H%M%S")
        name = timestr + '_' + filename
        imagefile.save(timestr + '_' + filename)
        image_num = image_num + 1

        category, share = classification(model, name)

        price = establish_a_price(category, share)
        print("Price: R$%s" % price)
        return "Categoria: {0}\nPreço: R${1}".format(labels[category], price)
    return 'Não calculado'


#app.run(host=host, port=port, debug=True)
serve(app, host=host, port=port)

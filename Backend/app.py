import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)
model = load_model("tumor_model.keras")
class_names = ['Glioma', 'Meningioma', 'no tumor', 'Pituitary']


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        image = Image.open(file)
        image = image.resize((256, 256))
        image = np.array(image)
        image = image / 255.0

        prediction = model.predict(image[np.newaxis, ...])
        predicted_class = class_names[np.argmax(prediction)]

        
        return jsonify({"prediction": predicted_class})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    try:
        temperature = random.uniform(20, 30)  # Simulate temperature between 20-30°C
        pressure = random.uniform(1, 2)       # Simulate pressure between 1-2 atm
        return jsonify({'temperature': temperature, 'pressure': pressure})
    except Exception as e:
        app.logger.error(f"Error getting data: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

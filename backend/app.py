from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/market-data', methods=['GET'])
def get_market_data():
    # Simulation du scraper pour Maroc Telecom (IAM) et BTC
    return jsonify({
        "iam_price": round(random.uniform(94.5, 96.0), 2),
        "btc_price": random.randint(64000, 65000),
        "status": "success"
    })

@app.route('/api/challenge-status', methods=['GET'])
def challenge_status():
    return jsonify({
        "balance": 5000,
        "status": "active",
        "equity_limit": 4500
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
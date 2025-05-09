from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
import numpy as np
import os

app = Flask(__name__)

# ✅ Route kiểm tra hoạt động đơn giản
@app.route('/')
def home():
    return '🚀 Flask Fuel Price API is running! Try /api/fuel-prices or /predict'

# ✅ API: Lấy giá xăng dầu hiện tại từ web
@app.route('/api/fuel-prices', methods=['GET'])
def get_prices():
    try:
        url = 'https://giaxanghomnay.com'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        table = soup.find('table')
        rows = table.find_all('tr')

        data = []
        for row in rows[1:]:
            cols = row.find_all('td')
            if len(cols) >= 4:
                item = {
                    "ten": cols[0].get_text(strip=True),
                    "tang_giam": cols[1].get_text(strip=True),
                    "gia_vung1": cols[2].get_text(strip=True),
                    "gia_vung2": cols[3].get_text(strip=True),
                }
                data.append(item)

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ API: Dự đoán giá xăng
@app.route('/predict', methods=['GET'])
def predict_multiple_fuels():
    predict_type = request.args.get('type', 'day')  # day, week, month

    # Đường dẫn tới file Excel
    excel_path = 'fuel_prices_formatted.xlsx'
    if not os.path.exists(excel_path):
        return jsonify({'error': f'Không tìm thấy file {excel_path}'}), 404

    try:
        df = pd.read_excel(excel_path)
        df = df.dropna()
        df['Ngày'] = pd.to_datetime(df['Ngày'], dayfirst=True)
        df = df.sort_values(by='Ngày')
        df['Date_Ordinal'] = df['Ngày'].map(datetime.toordinal)
        X = df[['Date_Ordinal']]

        fuel_types = [
            'DO 0,001S-V',
            'DO 0,05S-II',
            'Dầu hỏa 2-K',
            'Xăng E5 RON 92-II',
            'Xăng RON 95-III',
            'Xăng RON 95-V'
        ]

        today = datetime.today()
        if predict_type == 'day':
            predict_date = today + timedelta(days=1)
        elif predict_type == 'week':
            predict_date = today + timedelta(weeks=1)
        elif predict_type == 'month':
            predict_date = today + timedelta(days=30)
        else:
            return jsonify({'error': 'Tham số "type" không hợp lệ. Dùng: day, week hoặc month'}), 400

        predict_day_ordinal = predict_date.toordinal()

        results = {}
        for fuel in fuel_types:
            if fuel in df.columns:
                y = df[fuel]
                model = LinearRegression()
                model.fit(X, y)
                predicted_price = model.predict(np.array([[predict_day_ordinal]]))[0]
                formatted_price = f"{predicted_price:,.3f}".replace(",", "X").replace(".", ",").replace("X", ".")
                results[fuel] = formatted_price
            else:
                results[fuel] = 'Không tìm thấy dữ liệu'

        return jsonify({'predictions': results})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ✅ Cấu hình Flask chạy đúng cổng Render yêu cầu
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)

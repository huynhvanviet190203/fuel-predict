# from flask import Flask, jsonify
# import requests
# from bs4 import BeautifulSoup
# import pandas as pd
# from sklearn.linear_model import LinearRegression
# from datetime import datetime
# import numpy as np

# app = Flask(__name__)

# # API cho giá xăng dầu
# @app.route('/api/fuel-prices', methods=['GET'])
# def get_prices():
#     url = 'https://giaxanghomnay.com'
#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, 'html.parser')

#     table = soup.find('table')
#     rows = table.find_all('tr')

#     data = []
#     for row in rows[1:]:
#         cols = row.find_all('td')
#         if len(cols) >= 4:
#             item = {
#                 "ten": cols[0].get_text(strip=True),
#                 "tang_giam": cols[1].get_text(strip=True),
#                 "gia_vung1": cols[2].get_text(strip=True),
#                 "gia_vung2": cols[3].get_text(strip=True),
#             }
#             data.append(item)

#     return jsonify(data)

# # API cho dự đoán giá xăng dầu
# @app.route('/predict', methods=['GET'])
# def predict_multiple_fuels():
#     # Load dữ liệu
#     df = pd.read_excel('fuel_prices_formatted.xlsx')
#     df = df.dropna() 
#     df['Ngày'] = pd.to_datetime(df['Ngày'], dayfirst=True)
#     df = df.sort_values(by='Ngày')

#     # Chuyển ngày thành số để train model
#     df['Date_Ordinal'] = df['Ngày'].map(datetime.toordinal)
#     X = df[['Date_Ordinal']]

#     # Danh sách các loại nhiên liệu cần dự đoán
#     fuel_types = [
#         'DO 0,001S-V',
#         'DO 0,05S-II',
#         'Dầu hỏa 2-K',
#         'Xăng E5 RON 92-II',
#         'Xăng RON 95-III',
#         'Xăng RON 95-V'
#     ]

#     results = {}
#     today = datetime.today().toordinal()

#     for fuel in fuel_types:
#         if fuel in df.columns:
#             y = df[fuel]
#             model = LinearRegression()
#             model.fit(X, y)
#             predicted_price = model.predict(np.array([[today]]))[0]
#             results[fuel] = round(predicted_price, 2)
#         else:  
#             results[fuel] = 'Không tìm thấy dữ liệu'

#     return jsonify({'predictions': results})

# if __name__ == '__main__':
#     # Chạy Flask server với 2 cổng khác nhau
#     from threading import Thread

#     def run_app1():
#         app.run(host='0.0.0.0', port=5000)

#     def run_app2():
#         app.run(host='0.0.0.0', port=5555)

#     thread1 = Thread(target=run_app1)
#     thread2 = Thread(target=run_app2)

#     thread1.start()
#     thread2.start()

#     thread1.join()
#     thread2.join()

from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
import numpy as np

app = Flask(__name__)

# API: Lấy giá xăng dầu hiện tại từ web
@app.route('/api/fuel-prices', methods=['GET'])
def get_prices():
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

# API: Dự đoán giá xăng
@app.route('/predict', methods=['GET'])
def predict_multiple_fuels():
    predict_type = request.args.get('type', 'day')  # 'day', 'week', 'month'

    # Load dữ liệu từ file Excel
    df = pd.read_excel('fuel_prices_formatted.xlsx')
    df = df.dropna()
    df['Ngày'] = pd.to_datetime(df['Ngày'], dayfirst=True)
    df = df.sort_values(by='Ngày')
    df['Date_Ordinal'] = df['Ngày'].map(datetime.toordinal)
    X = df[['Date_Ordinal']]

    # Loại nhiên liệu cần dự đoán
    fuel_types = [
        'DO 0,001S-V',
        'DO 0,05S-II',
        'Dầu hỏa 2-K',
        'Xăng E5 RON 92-II',
        'Xăng RON 95-III',
        'Xăng RON 95-V'
    ]

    # Ngày cần dự đoán
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

# ✅ Chạy 1 cổng duy nhất đúng chuẩn Render
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)

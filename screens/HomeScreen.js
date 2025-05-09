import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>⛽📈</Text>
      <Text style={styles.title}>Ứng dụng Dự báo Giá Xăng Dầu</Text>
      <Text style={styles.subtitle}>
        🚀 Giúp bạn theo dõi và dự đoán xu hướng giá xăng dầu mỗi ngày, từ đó đưa ra quyết định mua bán tiết kiệm và hợp lý hơn.
        Ứng dụng sử dụng dữ liệu lịch sử kết hợp với thuật toán dự báo để mang lại thông tin chính xác và kịp thời.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardEmoji}>📊</Text>
        <Text style={styles.cardTitle}>Hiển thị giá xăng hôm nay</Text>
        <Text style={styles.cardDesc}>
          Xem thông tin giá xăng dầu được cập nhật mới nhất từ nguồn dữ liệu đáng tin cậy.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="🔍 Xem giá xăng hôm nay"
            onPress={() => navigation.navigate('Fuel')}
            color="#2e86de"
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardEmoji}>📅</Text>
        <Text style={styles.cardTitle}>Thực hiện dự báo</Text>
        <Text style={styles.cardDesc}>
          Dự đoán giá xăng dầu của ngày mai bằng mô hình hồi quy tuyến tính. Lên kế hoạch chi tiêu hiệu quả hơn!
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="📈 Dự báo giá xăng"
            onPress={() => navigation.navigate('Predict')}
            color="#27ae60"
          />
        </View>
      </View>

      <Text style={styles.footerNote}>🔥 Dữ liệu được cập nhật liên tục - Mô hình dự báo tối ưu - Trực quan & dễ sử dụng.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#eaf2f8',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 38,
    marginBottom: 10
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1b2631',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
    marginVertical: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 6,
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 4
  },
  cardDesc: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 14,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  footerNote: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  }
});

export default HomeScreen;

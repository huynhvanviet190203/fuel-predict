// screens/FuelScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const FuelScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState('');

  const API_URL = 'http://192.168.42.233:10000/api/fuel-prices'; // thay bằng IP thật

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi fetch dữ liệu:', error);
        setLoading(false);
      });

    const now = new Date();
    const formattedDate = now.toLocaleString('vi-VN', { hour12: false });
    setCurrentDateTime(formattedDate);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.ten}</Text>
      <View style={styles.separator} />
      <Text style={styles.changeText}>Thay đổi: {item.tang_giam}</Text>
      <View style={styles.priceRow}>
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Giá vùng 1:</Text>
          <Text style={styles.priceValue}>{item.gia_vung1}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Giá vùng 2:</Text>
          <Text style={styles.priceValue}>{item.gia_vung2}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🛢️ Giá Xăng Dầu Hôm Nay</Text>
        <Text style={styles.dateTime}>{currentDateTime}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#eaf2f8',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: { 
    fontSize: 28,  // Tăng font size của header
    fontWeight: 'bold', 
    color: '#0E7490', 
  },
  dateTime: { 
    fontSize: 16,  // Tăng font size của ngày giờ
    color: '#6B7280', 
    marginTop: 5,
  },
  item: {
    backgroundColor: '#FFFFFF', 
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', 
    marginVertical: 10, 
  },
  title: { 
    fontSize: 20,  // Tăng font size của tên xăng dầu
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 8,
    textAlign: 'center', 
  },
  changeText: { 
    fontSize: 17,  // Tăng font size của "Thay đổi"
    color: '#EF4444', 
    fontWeight: 'bold',  // In đậm
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 16,  // Tăng font size của "Giá vùng"
    color: '#6B7280',
    fontWeight: 'bold',  // In đậm
    marginRight: 4,
  },
  priceValue: {
    fontSize: 17,  // Tăng font size của giá vùng
    fontWeight: 'bold',  // In đậm
    color: '#111827',
  },
});


export default FuelScreen;

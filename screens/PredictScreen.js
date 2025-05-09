// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   StatusBar,
// } from 'react-native';

// const PredictScreen = () => {
//   const [predictions, setPredictions] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('day'); // mặc định là theo ngày

//   // Tính ngày mai
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const formattedDate = `${String(tomorrow.getDate()).padStart(2, '0')}/${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${tomorrow.getFullYear()}`;

//   const handlePredict = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://192.168.1.214:5555/predict');
//       const data = await response.json();
//       setPredictions(data.predictions);
//     } catch (error) {
//       console.error('Lỗi khi gọi API:', error);
//       setPredictions({ error: 'Lỗi khi gọi API!' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#0066cc" />
//       <Text style={styles.title}>⛽ Dự báo giá xăng dầu</Text>
//       <Text style={styles.subtitle}>
//   Dự báo cho ngày: <Text style={styles.date}>{formattedDate}</Text>
//       </Text>


//       {/* Tuỳ chọn dự báo */}
//       <View style={styles.optionsRow}>
//         <TouchableOpacity
//           style={[
//             styles.optionButton,
//             selectedOption === 'day' && styles.optionButtonSelected,
//           ]}
//           onPress={() => setSelectedOption('day')}
//         >
//           <Text style={selectedOption === 'day' ? styles.optionTextSelected : styles.optionText}>📅 Theo ngày</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.optionButton,
//             selectedOption === 'week' && styles.optionButtonSelected,
//           ]}
//           onPress={() => setSelectedOption('week')}
//         >
//           <Text style={selectedOption === 'week' ? styles.optionTextSelected : styles.optionText}>🗓️ Theo tuần</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.optionButton,
//             selectedOption === 'month' && styles.optionButtonSelected,
//           ]}
//           onPress={() => setSelectedOption('month')}
//         >
//           <Text style={selectedOption === 'month' ? styles.optionTextSelected : styles.optionText}>📆 Theo tháng</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handlePredict}>
//         <Text style={styles.buttonText}>🔍 Thực hiện dự báo</Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

//       {predictions && (
//         <ScrollView style={styles.resultBox}>
//           {predictions.error ? (
//             <Text style={styles.error}>{predictions.error}</Text>
//           ) : (
//             Object.entries(predictions).map(([fuelType, price]) => (
//               <View key={fuelType} style={styles.card}>
//                 <Text style={styles.fuelType}>⛽ {fuelType}</Text>
//                 <Text style={styles.price}>{price} VNĐ</Text>
//               </View>
//             ))
//           )}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#e6f0ff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginTop: 40,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   date: {
//     fontWeight: 'bold',
//     color: '#007bff',
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 15,
//     width: '100%',
//   },
//   optionButton: {
//     flex: 1,
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     backgroundColor: '#d0e3ff',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   optionButtonSelected: {
//     backgroundColor: '#007bff',
//   },
//   optionText: {
//     color: '#333',
//     fontWeight: '500',
//   },
//   optionTextSelected: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//     marginTop: 10,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//   },
//   resultBox: {
//     marginTop: 25,
//     width: '100%',
//     maxHeight: 350,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 10,
//     marginHorizontal: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   fuelType: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#003366',
//   },
//   price: {
//     fontSize: 16,
//     color: '#28a745',
//     marginTop: 5,
//   },
//   error: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default PredictScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';

const PredictScreen = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('day'); // mặc định là theo ngày
  const [predictDate, setPredictDate] = useState('');

  // Cập nhật ngày dự đoán dựa trên tùy chọn người dùng
  const updatePredictDate = (type) => {
    const date = new Date();
    if (type === 'day') date.setDate(date.getDate() + 1);
    else if (type === 'week') date.setDate(date.getDate() + 7);
    else if (type === 'month') date.setDate(date.getDate() + 30);

    const formatted = `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${date.getFullYear()}`;
    setPredictDate(formatted);
  };

  useEffect(() => {
    updatePredictDate(selectedOption);
  }, [selectedOption]);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.42.233:10000/predict?type=${selectedOption}`
      );
      const data = await response.json();
      setPredictions(data.predictions);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setPredictions({ error: 'Lỗi khi gọi API!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066cc" />
      <Text style={styles.title}>⛽ Dự báo giá xăng dầu</Text>
      <Text style={styles.subtitle}>
        Dự báo cho ngày: <Text style={styles.date}>{predictDate}</Text>
      </Text>

      {/* Tuỳ chọn dự báo */}
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'day' && styles.optionButtonSelected,
          ]}
          onPress={() => setSelectedOption('day')}
        >
          <Text
            style={
              selectedOption === 'day'
                ? styles.optionTextSelected
                : styles.optionText
            }
          >
            📅 Theo ngày
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'week' && styles.optionButtonSelected,
          ]}
          onPress={() => setSelectedOption('week')}
        >
          <Text
            style={
              selectedOption === 'week'
                ? styles.optionTextSelected
                : styles.optionText
            }
          >
            🗓️ Theo tuần
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === 'month' && styles.optionButtonSelected,
          ]}
          onPress={() => setSelectedOption('month')}
        >
          <Text
            style={
              selectedOption === 'month'
                ? styles.optionTextSelected
                : styles.optionText
            }
          >
            📆 Theo tháng
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePredict}>
        <Text style={styles.buttonText}>🔍 Thực hiện dự báo</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      )}

      {predictions && (
        <ScrollView style={styles.resultBox}>
          {predictions.error ? (
            <Text style={styles.error}>{predictions.error}</Text>
          ) : (
            Object.entries(predictions).map(([fuelType, price]) => (
              <View key={fuelType} style={styles.card}>
                <Text style={styles.fuelType}>⛽ {fuelType}</Text>
                <Text style={styles.price}>{price} VNĐ</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    width: '100%',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#d0e3ff',
    borderRadius: 10,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#007bff',
  },
  optionText: {
    color: '#333',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 25,
    width: '100%',
    maxHeight: 350,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  fuelType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PredictScreen;

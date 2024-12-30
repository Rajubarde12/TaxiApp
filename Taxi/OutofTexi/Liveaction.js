import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const Liveaction = () => {
  const liveAuctions = [
    {
      id: '1',
      time: '11:00 AM - 12:00 PM',
      title: 'TIME BAZAR MOR',
      result: '148-3*-***',
      status: 'Bet Closed for Today',
    },
    {
      id: '2',
      time: '1:05 PM - 2:05 PM',
      title: 'TIME BAZAR',
      result: '***-***-***',
      status: 'Bet Closed for Today',
    },
    {
      id: '3',
      time: '9:20 AM - 10:20 AM',
      title: 'SRIDEVI MORNING',
      result: '700-75-348',
      status: 'Bet Closed for Today',
    },
    {
      id: '4',
      time: '10:05 AM - 11:05 AM',
      title: 'MILAN MORNING',
      result: '145-07-359',
      status: 'Bet Closed for Today',
    },
  ];

  const renderAuction = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.result}>{item.result}</Text>
      <Text style={styles.status}>{item.status}</Text>
      <TouchableOpacity style={styles.button}>
        {/* <Icon name="game-controller" size={20} color="#fff" /> */}
        <Text style={styles.buttonText}> Play Game</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={liveAuctions}
        keyExtractor={item => item.id}
        renderItem={renderAuction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FF5722',
  },
  titleHeader: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
  },
  auctionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  time: {
    fontSize: 14,
    color: '#777',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 16,
    color: 'green',
    marginVertical: 5,
  },
  status: {
    color: 'red',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default Liveaction;

import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import {
  WalleCashPaid,
  Wallet,
  WalletTabActive,
} from '../../../constants/svgIcons';
import Button from '../../../components/Button';

const WalletScreen = () => {
  const transactions = [
    {
      date: "2024-09-24",
      time: "07:30 AM",
      type: "credit",
      amount: 500.0,
      description: "Money Added to Wallet",
      balance: 12000.0,
    },
    {
      date: "2024-09-23",
      time: "05:30 AM",
      type: "debit",
      amount: 500.0,
      description: "Booking No #34234",
      balance: 11250.0,
    },
    {
      date: "2024-09-22",
      time: "07:30 AM",
      type: "credit",
      amount: 500.0,
      description: "Refund for Booking #34234",
      balance: 12000.0,
    },
    {
      date: "2024-09-23",
      time: "07:30 AM",
      type: "debit",
      amount: 500.0,
      description: "Booking #34234",
      balance: 11250.0,
    },
  ];

  const TransactionItem = ({ item }) => (
    <View style={[styles.item,]}>
      <View style={styles.row}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={[styles.amount,{color:item.type === "credit"?'green':'red'}]}>{item.type === "credit" ? `+ $${item.amount}` : `- $${item.amount}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{item.date} | {item.time}</Text>
        <Text style={styles.balance}>Balance: ${item.balance}</Text>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <Header map={true} title={'Wallet'} />
      <View style={{flex: 1, paddingHorizontal: moderateScale(30)}}>
        <View
          style={{
            padding: moderateScale(5),
            marginTop: moderateScale(5),
            width: '100%',
            paddingHorizontal:moderateScale(20)
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View>
              <CustomText>Wallet Balance</CustomText>
              <CustomText>$ 12000.00</CustomText>
            </View>
            <Wallet />
          </View>
          <Button style={{
            height:moderateScale(40),
            marginTop:moderateScale(20),
            width:'100%'
          }} title={"Add Money"}/>
        </View>
        <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TransactionItem item={item} />}
      />
    </View>
      </View>
     
    </View>
  );
};
export default WalletScreen;
const data=[{
  day:'Today',
  title:'Money Added to Wallet',
  amount:"+ $500.00"
}]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  item: {
    paddingVertical: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  balance: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  credit: {
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
  },
  debit: {
    borderLeftWidth: 5,
    borderLeftColor: "#FF5722",
  },
});


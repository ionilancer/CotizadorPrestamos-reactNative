import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ResultCalculation(props) {
  const {capital, interes, months, total, errorMessage} = props;
  console.log(props);
  return (
    <View style={styles.content}>
      {total && (
        <View style={styles.boxResult}>
          <Text style={styles.title}>RESUMEN</Text>
          <DataResult title="Cantidad Solicitada:" value={`${capital} €`} />
          <DataResult title="Interes:" value={`${interes} %`} />
          <DataResult title="Plazos:" value={`${months} meses`} />
          <DataResult title="Pago mensual:" value={`${total.monthleFee} €`} />
          <DataResult
            title=" Total a pagar:"
            value={`${total.totalPayable} €`}
          />
        </View>
      )}
      <View>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    </View>
  );
}

function DataResult(props) {
  const {title, value} = props;
  return (
    <View style={styles.value}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxResult: {
    padding: 30,
  },
  content: {
    marginHorizontal: 40,
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    fontWeight: 'bold',
  },
});

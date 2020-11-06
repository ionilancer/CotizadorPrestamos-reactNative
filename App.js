import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  YellowBox,
  Button,
} from 'react-native';
import Form from './src/components/Form';
import Footer from './src/components/Foooter';
import ResultCalculation from './src/components/ResultCalculation';
import colors from './src/utils/colors';

YellowBox.ignoreWarnings(['Picker has been extracted']);

export default function App() {
  const [capital, setCapital] = useState(null);
  const [interes, setInteres] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (capital && interes && months) {
      calculate();
    } else {
      reset();
    }
  }, [capital, interes, months]);

  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage('Añade la cantidad que quieres solicitar');
    } else if (!interes) {
      setErrorMessage('Añade interes del prestamo');
    } else if (!months) {
      setErrorMessage('Selecciona los meses a pagar');
    } else {
      const i = interes / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);

      setTotal({
        monthleFee: fee.toFixed(2).replace('.', ','),
        totalPayable: (fee * months).toFixed(2).replace('.', ','),
      });
    }
  };
  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background}></View>
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInteres={setInteres}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <ResultCalculation
        errorMessage={errorMessage}
        interes={interes}
        months={months}
        capital={capital}
        total={total}
      />
      <Footer calculate={calculate} />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,

    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1,
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
});

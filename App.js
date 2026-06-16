import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert, ScrollView } from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';

export default function App() {
  
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [gastos, setGastos] = useState([]);

  // Funcion para manejar la validacion 
  const handlePresupuesto = () => {
      const numero = Number(presupuesto);

      if (isNaN(numero) || numero <= 0) {
          Alert.alert('Error', 'Presupuesto invalido');
          return;
      }
      setIsValidPresupuesto(true);
      console.log("Es un presupuesto valido");
  };

  const handleGasto = (gasto) => {
      setGastos([...gastos, gasto]);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Header />
          
          {isValidPresupuesto ? (
            <>
              <ControlPresupuesto 
                presupuesto={presupuesto}
                gastos={gastos}
              />
              
              <FormularioGasto 
                handleGasto={handleGasto}
              />
            </>
          ) : (
            <NuevoPresupuesto 
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handlePresupuesto={handlePresupuesto}
            />
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  header: {
    backgroundColor: '#3b82f6', 
    paddingTop: 50, 
    paddingBottom: 40,
    alignItems: 'center',
  },
});
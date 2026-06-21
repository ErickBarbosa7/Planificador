import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert, ScrollView, Pressable, Modal, Platform } from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Filtro from './src/components/Filtro';
import ListadoGastos from './src/components/ListadoGastos';

export default function App() {
  
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [gastoEditar, setGastoEditar] = useState({});

  const handlePresupuesto = () => {
      const numero = Number(presupuesto);
      if (isNaN(numero) || numero <= 0) {
          Alert.alert('Error', 'Presupuesto no debe ser menor a 0');
          return;
      }
      setIsValidPresupuesto(true);
  };

  const handleGasto = (gasto) => {
      if (gasto.id) {
          const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
          setGastos(gastosActualizados);
      } else {
          gasto.id = Date.now();
          setGastos([...gastos, gasto]);
      }
      setModal(false);
      setGastoEditar({}); 
  };

  const eliminarGasto = (id) => {
      if (Platform.OS === 'web') {
          const confirmar = window.confirm('¿Deseas eliminar este gasto?\nUn gasto eliminado no se puede recuperar');
          if (confirmar) {
              const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id);
              setGastos(gastosActualizados);
              setModal(false);
              setGastoEditar({});
          }
      } else {
          Alert.alert(
              '¿Deseas eliminar este gasto?',
              'Un gasto eliminado no se puede recuperar',
              [
                  { text: 'No', style: 'cancel'},
                  { text: 'Sí, Eliminar', onPress: () => {
                      const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id);
                      setGastos(gastosActualizados);
                      setModal(false);
                      setGastoEditar({});
                  }}
              ]
          );
      }
  }

  const handleResetApp = () => {
      if (Platform.OS === 'web') {
          const confirmar = window.confirm('Reiniciar App\n¿Estás seguro de que quieres eliminar todos los gastos y volver a empezar?');
          if (confirmar) {
              setPresupuesto('');
              setIsValidPresupuesto(false);
              setGastos([]);
              setFiltro('');
              setModal(false);
          }
      } else {
          Alert.alert(
              'Reiniciar App',
              '¿Estás seguro de que quieres eliminar todos los gastos y volver a empezar?',
              [
                  { text: 'Cancelar', style: 'cancel' },
                  { 
                      text: 'Sí, reiniciar', 
                      onPress: () => {
                          setPresupuesto('');
                          setIsValidPresupuesto(false);
                          setGastos([]);
                          setFiltro('');
                          setModal(false);
                      }
                  }
              ]
          );
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isValidPresupuesto ? (
          <>
            <View style={styles.header}>
              <Header />
              <ControlPresupuesto 
                presupuesto={presupuesto}
                gastos={gastos}
                handleResetApp={handleResetApp}
              />
            </View>
           <View style={styles.zonaGris}>
              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos} 
                filtro={filtro} 
                setModal={setModal}
                setGastoEditar={setGastoEditar}
              />
            </View>
          </>
        ) : (
          <View style={styles.header}>
            <Header />
            <NuevoPresupuesto 
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handlePresupuesto={handlePresupuesto}
            />
          </View>
        )}
      </ScrollView>

      {isValidPresupuesto && (
        <Pressable 
            style={styles.btnAgregar}
            onPress={() => {
                setModal(true);
                setGastoEditar({});
            }}
        >
            <Text style={styles.textoBtnAgregar}>+</Text>
        </Pressable>
      )}

      <Modal
        visible={modal}
        animationType="slide"
        onRequestClose={() => {
            setModal(false);
            setGastoEditar({});
        }} 
      >
        <SafeAreaView style={styles.contenedorModal}>
          <FormularioGasto 
            handleGasto={handleGasto}
            setModal={setModal}
            presupuesto={presupuesto}
            gastos={gastos}
            gastoEditar={gastoEditar} 
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
        </SafeAreaView>
      </Modal>

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
  zonaGris: {
    width: '100%',
  },
  contenedorModal: {
    flex: 1,
    backgroundColor: '#3b82f6', 
  },
  btnAgregar: {
      position: 'absolute', 
      bottom: 40,
      right: 30,
      backgroundColor: '#3b82f6', 
      width: 60,
      height: 60,
      borderRadius: 30, 
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
  },
  textoBtnAgregar: {
      color: '#FFF',
      fontSize: 35, 
      fontWeight: 'bold',
      marginTop: -4, 
  }
});
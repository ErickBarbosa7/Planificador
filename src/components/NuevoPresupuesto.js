import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

function NuevoPresupuesto({presupuesto, setPresupuesto, handlePresupuesto}) {

  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Agregar Presupuesto</Text>
        
        <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='Agregar tu presupuesto: Ej. 5000'
            placeholderTextColor='#bababa'
            value={presupuesto}
            onChangeText={setPresupuesto}
        />    

        <Pressable 
            style={styles.boton}
            onPress={handlePresupuesto}
        >
            <Text style={styles.btnTexto}>Agregar Presupuesto</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    paddingVertical: 40,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  label: {
    textAlign: 'center',
    fontSize: 40,
    color: '#3b82f6',
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 30
  },
  boton:{
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10
  },
  btnTexto:{
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});

export default NuevoPresupuesto;
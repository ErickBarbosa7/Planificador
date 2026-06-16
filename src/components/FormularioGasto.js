import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

export default function FormularioGasto({handleGasto}) {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');

    const agregarGasto =  () => {
        if([nombre, cantidad].includes('')){
            Alert.alert('Error, ambos campos son obligatorios');
            return;
        }

        const cantidadNumero = Number(cantidad);

        if (isNaN(cantidadNumero) || cantidadNumero <= 0){
            Alert.alert('Error, la cantidad tiene que se mayor a 0');
            return;
        }
        handleGasto({ 
            nombre, 
            cantidad: cantidadNumero, 
            id: Date.now() 
        });

        setNombre('');
        setCantidad('');
    }
  return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Añadir Gasto</Text>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre del Gasto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Comida, Transporte, Ropa"
                    placeholderTextColor="#bababa"
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad Gasto</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Ej. 300"
                    placeholderTextColor="#bababa"
                    value={cantidad}
                    onChangeText={setCantidad}
                />
            </View>

            <Pressable 
                style={styles.boton}
                onPress={agregarGasto}
            >
                <Text style={styles.btnTexto}>Agregar Gasto</Text>
            </Pressable>
        </View>
    );
    
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: 20,
        width: '90%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3b82f6',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    campo: {
        marginBottom: 15,
    },
    label: {
        color: '#64748b',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
    },
    boton: {
        marginTop: 15,
        backgroundColor: '#1048A4',
        padding: 12,
        borderRadius: 10,
    },
    btnTexto: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

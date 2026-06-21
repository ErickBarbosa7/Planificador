import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Filtro({ filtro, setFiltro }) {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Filtrar Gastos</Text>
            
            <Picker
                selectedValue={filtro}
                onValueChange={(valor) => setFiltro(valor)}
                style={styles.pickerStyle}
            >
                <Picker.Item label="-- Todas las categorías --" value="" />
                <Picker.Item label="Ahorro" value="ahorro" />
                <Picker.Item label="Comida" value="comida" />
                <Picker.Item label="Casa" value="casa" />
                <Picker.Item label="Gastos Varios" value="gastos" />
                <Picker.Item label="Ocio" value="ocio" />
                <Picker.Item label="Salud" value="salud" />
                <Picker.Item label="Suscripciones" value="suscripciones" />
            </Picker>
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
        alignSelf: 'center', 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#64748B',
        textAlign: 'left',
        marginBottom: 20,
    },
    pickerStyle: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        borderWidth: 0,
        color: '#64748b',
    },
});
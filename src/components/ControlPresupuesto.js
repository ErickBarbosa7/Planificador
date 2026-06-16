import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ControlPresupuesto = ({ presupuesto, gastos }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);        
        const totalDisponible = Number(presupuesto) - totalGastado;

        // Actualizar estados
        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos, presupuesto]);

    return (
        <View style={styles.contenedor}>
            <View style={styles.textoContainer}>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Presupuesto: </Text>
                    ${presupuesto}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible: </Text>
                    ${disponible}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado: </Text>
                    ${gastado}
                </Text>
            </View>
        </View>
    );
};

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
        marginTop: 20,
        width: '90%', 
        borderRadius: 10
    },
    textoContainer: {
        alignItems: 'center',
    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        color: '#000'
    },
    label: {
        fontWeight: 'bold',
        color: '#3b82f6'
    }
});

export default ControlPresupuesto;
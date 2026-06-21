import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlPresupuesto = ({ presupuesto, gastos, handleResetApp }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);        
        const totalDisponible = Number(presupuesto) - totalGastado;
        const nuevoPorcentaje = ((totalGastado / Number(presupuesto)) * 100);

        setPorcentaje(Math.round(nuevoPorcentaje));
        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos, presupuesto]);

    return (
        <View style={styles.contenedor}>
            
            <View style={styles.centrarGrafica}>
                <CircularProgress 
                    value={porcentaje}
                    radius={110} 
                    showProgressValue={false}
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={20}
                    activeStrokeColor='#3b82f6'
                    activeStrokeWidth={20}
                />

                <View style={styles.contenidoGrafica}>
                    <Text style={styles.porcentajeTexto}>{porcentaje}%</Text>
                    <Text style={styles.gastadoTexto}>Gastado</Text>
                </View>
            </View>

            <View style={styles.contenedorBoton}>
                <Pressable 
                    style={styles.botonReset}
                    onPress={handleResetApp}
                >
                    <Text style={styles.textoBotonReset}>Reiniciar App</Text>
                </Pressable>
            </View>

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
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 20,
        width: '90%', 
        borderRadius: 10,
        alignSelf: 'center',
    },
    centrarGrafica: {
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 40, 
    },
    contenidoGrafica: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    porcentajeTexto: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#3b82f6',
    },
    gastadoTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#64748B',
    },
    contenedorBoton: {
        width: '100%',
    },
    botonReset: {
        backgroundColor: '#C71465',
        paddingVertical: 12,
        borderRadius: 5, 
        marginBottom: 35, 
        alignItems: 'center',
    },
    textoBotonReset: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1, 
    },
    textoContainer: {
        alignItems: 'center',
    },
    valor: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        color: '#333'
    },
    label: {
        fontWeight: 'bold',
        color: '#3b82f6'
    }
});

export default ControlPresupuesto;
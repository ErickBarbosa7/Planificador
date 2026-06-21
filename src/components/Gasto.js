import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const diccionarioIconos = {
    ahorro: require('../../assets/img/icono_ahorro.png'),
    comida: require('../../assets/img/icono_comida.png'),
    casa: require('../../assets/img/icono_casa.png'),
    gastos: require('../../assets/img/icono_gastos.png'),
    ocio: require('../../assets/img/icono_ocio.png'),
    salud: require('../../assets/img/icono_salud.png'),
    suscripciones: require('../../assets/img/icono_suscripciones.png'),
};

const Gasto = ({ gasto, setModal, setGastoEditar }) => {
    
    const icono = diccionarioIconos[gasto.categoria?.toLowerCase()] || require('../../assets/img/nuevo-gasto.png');

    return (
        <Pressable
            onPress={() => {
                setModal(true);
                setGastoEditar(gasto);
            }}
        >
            <View style={styles.contenedor}>
                <View style={styles.contenido}>
                    
                    <Image 
                        style={styles.icono}
                        source={icono}
                    />

                    <View style={styles.contenedorTexto}>
                        <Text style={styles.categoria}>{gasto.categoria}</Text>
                        <Text style={styles.nombre}>{gasto.nombre}</Text>
                        <Text style={styles.fecha}>
                            24 de diciembre de 2026
                        </Text>
                    </View>
                </View>
                
                <Text style={styles.cantidad}>${gasto.cantidad}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    contenido: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icono: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    contenedorTexto: {
        flex: 1,
    },
    categoria: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    nombre: {
        fontSize: 20,
        color: '#334155',
        marginBottom: 2,
    },
    fecha: {
        fontSize: 12,
        color: '#DB2777', 
        fontWeight: 'bold',
    },
    cantidad: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    }
});

export default Gasto;
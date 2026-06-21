import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gasto from './Gasto';

const ListadoGastos = ({ gastos, filtro, setModal, setGastoEditar }) => {
    const gastosFiltrados = filtro
        ? gastos.filter(gasto => gasto.categoria === filtro)
        : gastos;

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>
                {gastosFiltrados.length === 0 ? 'No hay gastos aún' : 'Gastos'}
            </Text>

            {gastosFiltrados.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setModal={setModal}
                    setGastoEditar={setGastoEditar}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 30,
        marginBottom: 100,
        paddingHorizontal: 20,
    },
    titulo: {
        color: '#64748B',
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

export default ListadoGastos;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, SafeAreaView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

const FormularioGasto = ({ handleGasto, setModal, presupuesto, gastos, gastoEditar, setGastoEditar, eliminarGasto }) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState(''); 

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad.toString());
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
        } else {
            setNombre('');
            setCantidad('');
            setCategoria('');
            setId('');
        }
    }, [gastoEditar]);

    const agregarGasto = () => {
        if ([nombre, cantidad, categoria].includes('')) {
            Platform.OS === 'web' 
                ? window.alert('Todos los campos son obligatorios')
                : Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        const cantidadNumero = Number(cantidad);
        if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
            Platform.OS === 'web'
                ? window.alert('La cantidad no es válida')
                : Alert.alert('Error', 'La cantidad no es válida');
            return;
        }

        const gastosFiltrados = id ? gastos.filter(g => g.id !== id) : gastos;
        
        const totalGastado = Array.isArray(gastosFiltrados) 
            ? gastosFiltrados.reduce((total, gasto) => total + gasto.cantidad, 0) 
            : 0;
            
        const totalConNuevoGasto = totalGastado + cantidadNumero;

        if (totalConNuevoGasto > Number(presupuesto)) {
            const restante = Number(presupuesto) - totalGastado;
            Platform.OS === 'web'
                ? window.alert(`Error: No te alcanza el presupuesto. Te quedan $${restante}`)
                : Alert.alert('Error', `No te alcanza el presupuesto. Te quedan $${restante}`);
            return;
        }

        handleGasto({ 
            nombre, 
            cantidad: cantidadNumero, 
            categoria, 
            id 
        });
    };

    return (
        <SafeAreaView style={styles.contenedorPrincipal}>
            <View style={styles.contenedorResponsivo}>
                
                <View style={styles.contenedorBotonesSuperiores}>
                    <Pressable 
                        style={[styles.btn, styles.btnCancelar, id ? styles.btnMitad : styles.btnCompleto]}
                        onPress={() => {
                            setModal(false);
                            setGastoEditar({});
                        }}
                    >
                        <Text style={styles.btnTextoSuperior}>CANCELAR</Text>
                    </Pressable>

                    {id ? (
                        <Pressable 
                            style={[styles.btn, styles.btnEliminar, styles.btnMitad]}
                            onPress={() => eliminarGasto(id)}
                        >
                            <Text style={styles.btnTextoSuperior}>ELIMINAR</Text>
                        </Pressable>
                    ) : null}
                </View>

                <View style={styles.formulario}>
                    <Text style={styles.titulo}>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>

                    <View style={styles.campo}>
                        <Text style={styles.label}>NOMBRE GASTO</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Gasto ej. Comida"
                            placeholderTextColor="#bababa"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>CANTIDAD GASTO</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Cantidad del gasto. ej. 300"
                            placeholderTextColor="#bababa"
                            value={cantidad}
                            onChangeText={setCantidad}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>CATEGORÍA GASTO</Text>
                        <View style={styles.pickerContenedor}>
                            <Picker
                                selectedValue={categoria}
                                onValueChange={(valor) => setCategoria(valor)}
                                style={styles.pickerStyle}
                            >
                                <Picker.Item label="-- Seleccione --" value="" />
                                <Picker.Item label="Ahorro" value="ahorro" />
                                <Picker.Item label="Comida" value="comida" />
                                <Picker.Item label="Casa" value="casa" />
                                <Picker.Item label="Gastos Varios" value="gastos" />
                                <Picker.Item label="Ocio" value="ocio" />
                                <Picker.Item label="Salud" value="salud" />
                                <Picker.Item label="Suscripciones" value="suscripciones" />
                            </Picker>
                        </View>
                    </View>

                    <Pressable 
                        style={styles.botonGuardar}
                        onPress={agregarGasto}
                    >
                        <Text style={styles.btnTextoGuardar}>
                            {gastoEditar.nombre ? 'GUARDAR CAMBIOS GASTO' : 'AGREGAR GASTO'}
                        </Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        backgroundColor: '#3b82f6',
    },
    contenedorResponsivo: {
        width: '100%',
        maxWidth: 450,
        alignSelf: 'center',
        flex: 1,
    },
    contenedorBotonesSuperiores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    btn: {
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnCancelar: {
        backgroundColor: '#C71465',
    },
    btnEliminar: {
        backgroundColor: '#DC2626', // Rojo de alerta
    },
    btnMitad: {
        width: '48%', // Deja un pequeño margen entre ellos
    },
    btnCompleto: {
        width: '100%',
    },
    btnTextoSuperior: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 14,
    },
    // -------------------------------------
    formulario: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        color: '#64748b',
        fontWeight: 'normal',
        marginBottom: 30,
    },
    campo: {
        marginBottom: 15,
    },
    label: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        color: '#000'
    },
    pickerContenedor: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        overflow: 'hidden',
    },
    pickerStyle: {
        height: 50,
        width: '100%',
        borderWidth: 0,
        color: '#000',
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
    },
    botonGuardar: {
        marginTop: 20,
        backgroundColor: '#3b82f6',
        padding: 15,
        borderRadius: 5,
    },
    btnTextoGuardar: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

export default FormularioGasto;
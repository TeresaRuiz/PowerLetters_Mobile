import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Buttons from '../components/Buttons/Button';

const HistorialPedidos = ({ navigation }) => {
    const [historialPedidos, setHistorialPedidos] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            obtenerHistorialPedidos();
        }, [])
    );
    const borrarHistorialPedidos = async () => {
        try {
            await AsyncStorage.removeItem('historialPedidos');
            setHistorialPedidos([]);
            console.log('Historial de pedidos borrado');
        } catch (error) {
            console.error('Error al borrar el historial de pedidos:', error);
        }
    };

    const obtenerHistorialPedidos = async () => {
        try {
            const historial = await AsyncStorage.getItem('historialPedidos');
            if (historial !== null) {
                const pedidos = JSON.parse(historial).map(pedido =>
                    pedido.map(detalle => ({
                        ...detalle,
                        cantidad: detalle.cantidad_producto || 0, // Asegurarse de que cantidad esté presente
                        precio: detalle.precio_producto || 0 // Asegurarse de que precio esté presente
                    }))
                );
                console.log('Historial recuperado:', pedidos);
                setHistorialPedidos(pedidos);
            }
        } catch (error) {
            console.error('Error al obtener el historial de pedidos:', error);
        }
    };

    const renderItem = ({ item, index }) => {
        const total = item.reduce((sum, pedido) => {
            const subtotal = (pedido.precio || 0) * (pedido.cantidad || 0);
            return sum + subtotal;
        }, 0);

        return (
            <View style={styles.item}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemText}>Pedido #{index + 1}</Text>
                    <Text style={styles.itemText}>Total: ${total.toFixed(2)}</Text>
                </View>
                {item.map((detalle, i) => (
                    <View key={i} style={styles.itemDetails}>
                        <Text style={styles.itemText}>Libro: {detalle.nombre_producto}</Text>
                        <Text style={styles.itemText}>Cantidad: {detalle.cantidad}</Text>
                        <Text style={styles.itemText}>Precio: ${detalle.precio}</Text>
                    </View>
                ))}
            </View>

        );
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Pedidos</Text>
            <FlatList
                data={historialPedidos}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No hay pedidos finalizados en el historial.</Text>
                )}
            />
           <Buttons
          textoBoton='Borrar historial'
          accionBoton={borrarHistorialPedidos}
          color='#5064d4'
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0ecfc',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E',
    },
    item: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    itemText: {
        fontSize: 18,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
   
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8, // Espacio entre encabezado y detalles
    },
    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4, // Espacio vertical entre detalles
    },
    itemText: {
        fontSize: 16,
        marginHorizontal: 8, // Espacio horizontal entre elementos
    },
});
     

export default HistorialPedidos;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Planificador</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  texto:{
    textAlign:'center',
    fontSize:20,
    color:'#FFF',
    textTransform:'uppercase',
    fontWeight:'bold',
    paddingTop: 20
  }
});

export default Header;
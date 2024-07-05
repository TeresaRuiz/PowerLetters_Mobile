import { StyleSheet, Platform, TextInput} from 'react-native';

export default function InputMultiline({placeHolder, setValor, contra, valor}) {

  return (

    <TextInput
    style={[styles.Input, { backgroundColor: '#ffffff', color: '#000000' }]}
    placeholder="Dirección"
    value={valor}
    onChangeText={setValor}
    placeholderTextColor={'#808080'}
    secureTextEntry={contra} 
    multiline={true}
    numberOfLines={4}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    fontWeight:'800',
    width:'100%',
    borderRadius:10,
    padding: Platform.OS === 'ios' ? 15 : 10, 
    marginVertical:10
  },
});

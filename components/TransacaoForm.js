import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const TransacaoForm = ({ onSave, onCancel }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('Receita');
  const [moeda, setMoeda] = useState('BRL');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    const newTransacao = {
      descricao,
      valor: parseFloat(valor),
      categoria,
      tipo,
      moeda,
      data: data.toISOString().split('T')[0], 
      hora: hora.toTimeString().split(' ')[0], 
    };
    onSave(newTransacao);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
        >
          <Picker.Item label="Receita" value="Receita" />
          <Picker.Item label="Despesa" value="Despesa" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
  <Picker
    selectedValue={moeda}
    onValueChange={itemValue => setMoeda(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="BRL - Real Brasileiro" value="BRL" />
    <Picker.Item label="USD - Dólar Americano" value="USD" />
    <Picker.Item label="EUR - Euro" value="EUR" />
    <Picker.Item label="GBP - Libra Esterlina" value="GBP" />
    <Picker.Item label="JPY - Iene Japonês" value="JPY" />
  </Picker>
</View>


      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          Data: {data.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>
          Hora: {hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setHora(selectedTime);
          }}
        />
      )}

      <Button title="Salvar" onPress={handleSave} />
      {onCancel && <Button title="Cancelar" onPress={onCancel} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'blue',
  },
});

export default TransacaoForm;

import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import TransacaoItemList from '../components/TransacaoItemList';

const TransacaoListScreen = ({ navigation, transacoes }) => {
  const [filteredTransacoes, setFilteredTransacoes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const [filterMoeda, setFilterMoeda] = useState(''); 

  const [sortBy, setSortBy] = useState('data'); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    let filtered = [...transacoes];

    if (filterMoeda && filterMoeda !== '') {
      filtered = filtered.filter((transacao) =>
        transacao.moeda.toLowerCase().includes(filterMoeda.toLowerCase())
      );
    }

    const sorted = filtered.sort((a, b) => {
      const compareValue = sortBy === 'data' ? new Date(a.data) - new Date(b.data) : a.valor - b.valor;
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    setFilteredTransacoes(sorted);
  }, [transacoes, filterMoeda, sortBy, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterMoeda}
          onValueChange={(itemValue) => {
            setFilterMoeda(itemValue);
          }}
        >
          <Picker.Item label="Selecione a moeda" value="" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="JPY" value="JPY" />
        </Picker>
      </View>

      <View style={styles.sortContainer}>
        <Button title={`Ordenar por ${sortBy}`} onPress={handleSort} />
      </View>

      <FlatList
        data={filteredTransacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TransacaoItemList
            descricao={item.descricao}
            valor={item.valorConvertido || item.valor} 
            data={item.data}
            hora={item.hora}
            categoria={item.categoria}
            tipo={item.tipo}
            moeda={item.moeda}
            cotacao={item.cotacao}
          />
        )}
      />

      <View style={styles.newTransacaoButtonContainer}>
        <Button title="Nova Transação" onPress={() => navigation.navigate('TransacaoForm')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  sortContainer: {
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  newTransacaoButtonContainer: {
    marginTop: 20,
  },
});

export default TransacaoListScreen;

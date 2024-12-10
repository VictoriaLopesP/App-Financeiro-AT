import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import TransacaoListScreen from './screens/TransacaoListScreen';
import TransacaoFormScreen from './screens/TransacaoFormScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TransacaoStack = () => {
  const [transacoes, setTransacoes] = useState([]); 

  const adicionarTransacao = (novaTransacao) => {
    setTransacoes((prev) => [...prev, novaTransacao]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransacaoList"
        options={{ headerShown: false }}
      >
        {(props) => (
          <TransacaoListScreen {...props} transacoes={transacoes} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="TransacaoForm"
        options={{ headerShown: false }}
      >
        {(props) => (
          <TransacaoFormScreen {...props} onSave={adicionarTransacao} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth">
            {(props) => <AuthScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Transações" component={TransacaoStack} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

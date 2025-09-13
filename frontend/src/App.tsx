// Δ14 Pre-filled Phase I MVP - React Native Mobile App
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Δ14 Navigation setup
import HomeScreen from './screens/Home';
import PoolSelectionScreen from './screens/PoolSelection';
import FlashLoanConfigScreen from './screens/FlashLoanConfig';
import SimulationScreen from './screens/Simulation';
import TransactionScreen from './screens/Transaction';
import HistoryScreen from './screens/History';
import SettingsScreen from './screens/Settings';

// Δ14 Wallet services
import { TONWalletService } from './services/wallet/tonWallet';
import { EOSWalletService } from './services/wallet/eosWallet';
import { SUIWalletService } from './services/wallet/suiWallet';

const Stack = createStackNavigator();

// Δ14 Main App component with delta tracking
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [walletsConnected, setWalletsConnected] = useState({
    ton: false,
    eos: false,
    sui: false
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    console.log('Δ14 Initializing Flash Loan DApp...');
    
    try {
      // Initialize wallet services
      await initializeWallets();
      
      // Set up monitoring
      setupMonitoring();
      
      console.log('Δ14 App initialization complete');
      setIsLoading(false);
    } catch (error) {
      console.error('Δ14 App initialization failed:', error);
    }
  };

  const initializeWallets = async () => {
    // Initialize TON wallet
    try {
      const tonService = TONWalletService.getInstance();
      await tonService.init();
      setWalletsConnected(prev => ({ ...prev, ton: true }));
      console.log('Δ14 TON wallet initialized');
    } catch (error) {
      console.error('Δ14 TON wallet initialization failed:', error);
    }

    // Initialize EOS wallet
    try {
      const eosService = EOSWalletService.getInstance();
      await eosService.init();
      setWalletsConnected(prev => ({ ...prev, eos: true }));
      console.log('Δ14 EOS wallet initialized');
    } catch (error) {
      console.error('Δ14 EOS wallet initialization failed:', error);
    }

    // Initialize SUI wallet
    try {
      const suiService = SUIWalletService.getInstance();
      await suiService.init();
      setWalletsConnected(prev => ({ ...prev, sui: true }));
      console.log('Δ14 SUI wallet initialized');
    } catch (error) {
      console.error('Δ14 SUI wallet initialization failed:', error);
    }
  };

  const setupMonitoring = () => {
    // Set up delta progress monitoring
    console.log('Δ14 Setting up monitoring...');
    
    // Monitor wallet connections
    const interval = setInterval(() => {
      console.log('Δ14 Wallet connection status:', walletsConnected);
    }, 5000);

    return () => clearInterval(interval);
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Δ14 Loading Flash Loan DApp...</Text>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.deltaText}>Delta-14 Phase I MVP Loading</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#007AFF',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Δ14 Flash Loan DApp' }}
            />
            <Stack.Screen 
              name="PoolSelection" 
              component={PoolSelectionScreen}
              options={{ title: 'Select Pools - Δ14' }}
            />
            <Stack.Screen 
              name="FlashLoanConfig" 
              component={FlashLoanConfigScreen}
              options={{ title: 'Configure Loan - Δ14' }}
            />
            <Stack.Screen 
              name="Simulation" 
              component={SimulationScreen}
              options={{ title: 'Simulation - Δ14' }}
            />
            <Stack.Screen 
              name="Transaction" 
              component={TransactionScreen}
              options={{ title: 'Execute - Δ14' }}
            />
            <Stack.Screen 
              name="History" 
              component={HistoryScreen}
              options={{ title: 'History - Δ14' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ title: 'Settings - Δ14' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

// Δ14 Styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deltaText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});

// Δ14 Export for testing
export { TONWalletService, EOSWalletService, SUIWalletService };
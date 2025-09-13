// Δ14 Home Screen - Mobile-First Design
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Δ14 Wallet connection status
import { TONWalletService } from '../services/wallet/tonWallet';
import { EOSWalletService } from '../services/wallet/eosWallet';
import { SUIWalletService } from '../services/wallet/suiWallet';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [walletStatus, setWalletStatus] = useState({
    ton: { connected: false, balance: 0 },
    eos: { connected: false, balance: 0 },
    sui: { connected: false, balance: 0 }
  });

  useEffect(() => {
    checkWalletConnections();
  }, []);

  const checkWalletConnections = async () => {
    try {
      // Check TON wallet
      const tonService = TONWalletService.getInstance();
      const tonConnected = await tonService.isConnected();
      const tonBalance = tonConnected ? await tonService.getBalance() : 0;

      // Check EOS wallet
      const eosService = EOSWalletService.getInstance();
      const eosConnected = await eosService.isConnected();
      const eosBalance = eosConnected ? await eosService.getBalance() : 0;

      // Check SUI wallet
      const suiService = SUIWalletService.getInstance();
      const suiConnected = await suiService.isConnected();
      const suiBalance = suiConnected ? await suiService.getBalance() : 0;

      setWalletStatus({
        ton: { connected: tonConnected, balance: tonBalance },
        eos: { connected: eosConnected, balance: eosBalance },
        sui: { connected: suiConnected, balance: suiBalance }
      });

      console.log('Δ14 Wallet status updated:', {
        ton: tonConnected,
        eos: eosConnected,
        sui: suiConnected
      });
    } catch (error) {
      console.error('Δ14 Error checking wallet connections:', error);
    }
  };

  const handleFlashLoanStart = () => {
    if (!walletStatus.ton.connected && !walletStatus.eos.connected && !walletStatus.sui.connected) {
      Alert.alert(
        'Δ14 Wallet Connection Required',
        'Please connect at least one wallet to continue.',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('PoolSelection');
  };

  const handleQuickSimulation = async () => {
    try {
      // Mock simulation - replace with real API call
      const simulation = {
        amount: 100,
        expectedProfit: 15.5,
        gasCosts: 2.3,
        chains: ['TON', 'EOS', 'SUI']
      };

      navigation.navigate('Simulation', { simulation });
    } catch (error) {
      console.error('Δ14 Simulation error:', error);
      Alert.alert('Error', 'Failed to run simulation. Please try again.');
    }
  };

  const renderWalletCard = (chain: string, status: any) => (
    <View key={chain} style={styles.walletCard}>
      <Text style={styles.chainName}>{chain}</Text>
      <View style={[styles.statusIndicator, { 
        backgroundColor: status.connected ? '#4CAF50' : '#F44336' 
      }]} />
      <Text style={styles.balance}>
        {status.connected ? `${status.balance} ${chain}` : 'Not Connected'}
      </Text>
      <TouchableOpacity 
        style={[styles.connectButton, { 
          backgroundColor: status.connected ? '#4CAF50' : '#007AFF' 
        }]}
        onPress={() => handleWalletConnect(chain)}
      >
        <Text style={styles.connectButtonText}>
          {status.connected ? 'Connected' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleWalletConnect = async (chain: string) => {
    try {
      let service;
      
      switch (chain) {
        case 'TON':
          service = TONWalletService.getInstance();
          break;
        case 'EOS':
          service = EOSWalletService.getInstance();
          break;
        case 'SUI':
          service = SUIWalletService.getInstance();
          break;
      }

      if (service) {
        await service.connect();
        checkWalletConnections();
      }
    } catch (error) {
      console.error(`Δ14 ${chain} connection error:`, error);
      Alert.alert('Connection Error', `Failed to connect ${chain} wallet`);
    }
  };

  return (
    <LinearGradient
      colors={['#007AFF', '#5856D6']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Δ14 Flash Loan DApp</Text>
          <Text style={styles.subtitle}>Multi-Chain Arbitrage</Text>
        </View>

        <View style={styles.walletsSection}>
          <Text style={styles.sectionTitle}>Connected Wallets</Text>
          {renderWalletCard('TON', walletStatus.ton)}
          {renderWalletCard('EOS', walletStatus.eos)}
          {renderWalletCard('SUI', walletStatus.sui)}
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleFlashLoanStart}
          >
            <Text style={styles.buttonText}>Start Flash Loan - Δ14</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleQuickSimulation}
          >
            <Text style={styles.buttonText}>Quick Simulation - Δ14</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tertiaryButton}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.buttonText}>View History - Δ14</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Δ14 Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Successful Loans</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>$15.2K</Text>
              <Text style={styles.statLabel}>Total Profit</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// Δ14 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  walletsSection: {
    marginBottom: 30,
  },
  walletCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chainName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  balance: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  connectButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionsSection: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  tertiaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsSection: {
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
});
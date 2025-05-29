import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#ffffff' : '#333333';
  const bgColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>Welcome to</Text>
        <Text style={[styles.appName, { color: textColor }]}>My Todo App</Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Organize your tasks efficiently
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme === 'dark' ? '#4a90e2' : '#007AFF' }]}
        onPress={onStart}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 
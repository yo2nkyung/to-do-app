import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface AddTodoInputProps {
  onAdd: (text: string) => void;
}

export const AddTodoInput = ({ onAdd }: AddTodoInputProps) => {
  const [text, setText] = useState("");
  const { theme } = useTheme();

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  const bgColor = theme === 'dark' ? '#2d2d2d' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#333333';
  const placeholderColor = theme === 'dark' ? '#888888' : '#999999';

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: bgColor,
            color: textColor,
          }
        ]}
        value={text}
        onChangeText={setText}
        placeholder="Add a new todo..."
        placeholderTextColor={placeholderColor}
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity 
        style={[
          styles.addButton,
          { backgroundColor: text.trim() ? '#4CAF50' : '#cccccc' }
        ]}
        onPress={handleAdd}
        disabled={!text.trim()}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

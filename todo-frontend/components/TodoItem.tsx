// TodoItem is a child component that displays a single todo item
// It receives a todo object and a toggle function as props
// It will be used by the TodoList component to render each todo item
// The component shows the todo text and a toggle button to mark it as complete/incomplete
// Component hierarchy: TodoList (parent) -> TodoItem (child) -> Text and TouchableOpacity (children)

import React, { useState } from "react";
import { Todo } from "../types"; // we need to import the Todo type from the types folder to use it in the component
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"; // we need to import these components from the react-native library to use it in the component

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  textColor: string;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete, textColor }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => onToggle(todo.id)}
      >
        <View style={[
          styles.checkbox,
          todo.completed && styles.checkboxCompleted
        ]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            value={editText}
            onChangeText={setEditText}
            autoFocus
          />
          <View style={styles.editButtons}>
            <TouchableOpacity 
              style={[styles.editButton, styles.saveButton]} 
              onPress={handleEdit}
            >
              <Text style={styles.editButtonText}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.editButton, styles.cancelButton]} 
              onPress={handleCancel}
            >
              <Text style={styles.editButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={[
            styles.text,
            { color: textColor },
            todo.completed && styles.completedText
          ]}>
            {todo.text}
          </Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  toggleButton: {
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 24,
    color: '#ff4444',
    fontWeight: 'bold',
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  editButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editButton: {
    padding: 5,
    marginHorizontal: 2,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editIcon: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
});
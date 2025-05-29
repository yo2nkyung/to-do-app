import React from "react";
import { SafeAreaView, FlatList, Button, View, Text, StyleSheet } from "react-native";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from './TodoItem';
import { useTheme } from "../contexts/ThemeContext";
import { AddTodoInput } from "./AddTodoInput";

export const TodoScreen = () => {
  const { todos, toggleTodo, addTodo, deleteTodo, editTodo } = useTodos();
  const { theme, toggleTheme } = useTheme();

  const bgColor = theme === 'dark' ? '#1a1a1a' : '#f5f5f5';
  const textColor = theme === 'dark' ? '#ffffff' : '#333333';
  const cardBgColor = theme === 'dark' ? '#2d2d2d' : '#ffffff';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>My Todo List</Text>
        <Button 
          title={`${theme === 'dark' ? '☀️' : '🌙'} Mode`} 
          onPress={toggleTheme}
          color={theme === 'dark' ? '#f0f0f0' : '#333333'}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <AddTodoInput onAdd={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.todoCard, { backgroundColor: cardBgColor }]}>
            <TodoItem 
              todo={item} 
              onToggle={toggleTodo} 
              onEdit={editTodo}
              onDelete={deleteTodo} 
              textColor={textColor} 
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listContainer: {
    padding: 20,
  },
  todoCard: {
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
}); 
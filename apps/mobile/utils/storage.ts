import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async <T>(key: string, data: T): Promise<boolean> => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    console.error(`Error saving data to ${key}:`, error);
    return false;
  }
};

export const loadData = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData === null) {
      return defaultValue;
    }
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading data from ${key}:`, error);
    return defaultValue;
  }
};

export const clearData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error clearing data from ${key}:`, error);
    return false;
  }
};

export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return [...keys]; // Convert readonly array to mutable array
  } catch (error) {
    console.error('Error getting all storage keys:', error);
    return [];
  }
};

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};
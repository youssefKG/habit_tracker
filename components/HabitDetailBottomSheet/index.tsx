import { FC, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet from "../common/BottomSheet";
import HabitStats from "../HabitStats";

interface Habit {
  id: number;
  name: string;
  description?: string;
  color: string;
  goal: number;
  frequency: "daily" | "weekly" | "monthly";
  reminder_time?: string;
  icon?: string;
  priority: boolean;
  archived: boolean;
  last_completed?: string;
  streak_count: number;
  category?: string;
  created_at?: string;
}

interface HabitDetailProps {
  isVisible: boolean;
  onClose: () => void;
  habitId?: number;
}

// Dummy data
const dummyHabits: Habit[] = [
  {
    id: 1,
    name: "Morning Reading",
    description: "Read 30 minutes every morning",
    color: "#d90429",
    goal: 1,
    frequency: "daily",
    icon: "book",
    priority: true,
    archived: false,
    streak_count: 7,
    last_completed: new Date().toISOString().split('T')[0],
    category: "Learning"
  },
  {
    id: 2,
    name: "Evening Run",
    description: "Go for a 5km run",
    color: "#16db65",
    goal: 1,
    frequency: "daily",
    icon: "directions-run",
    priority: false,
    archived: false,
    streak_count: 3,
    last_completed: null,
    category: "Fitness"
  },
  {
    id: 3,
    name: "Meditation",
    description: "Practice mindfulness for 15 minutes",
    color: "#7209b7",
    goal: 1,
    frequency: "daily",
    icon: "self-improvement",
    priority: true,
    archived: false,
    streak_count: 12,
    last_completed: new Date().toISOString().split('T')[0],
    category: "Wellness"
  },
  {
    id: 4,
    name: "Drink Water",
    description: "Drink 8 glasses of water",
    color: "#00b4d8",
    goal: 8,
    frequency: "daily",
    icon: "local-drink",
    priority: false,
    archived: false,
    streak_count: 5,
    last_completed: null,
    category: "Health"
  },
  {
    id: 5,
    name: "Code Practice",
    description: "Work on coding projects for 1 hour",
    color: "#f8961e",
    goal: 1,
    frequency: "daily",
    icon: "code",
    priority: true,
    archived: false,
    streak_count: 2,
    last_completed: new Date().toISOString().split('T')[0],
    category: "Learning"
  }
];

const HabitDetail: FC<HabitDetailProps> = ({ isVisible, onClose, habitId }) => {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible && habitId) {
      loadHabit();
    }
  }, [isVisible, habitId]);

  const loadHabit = async () => {
    if (!habitId) return;
    
    setLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const habitData = dummyHabits.find(h => h.id === habitId) || null;
      setHabit(habitData);
    } catch (error) {
      console.error("Failed to load habit:", error);
      Alert.alert("Error", "Failed to load habit details");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompletion = async () => {
    if (!habit || !habitId) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const isCompletedToday = habit.last_completed === today;
      
      setHabit(prev => prev ? {
        ...prev,
        last_completed: isCompletedToday ? null : today,
        streak_count: isCompletedToday ? Math.max(0, prev.streak_count - 1) : prev.streak_count + 1
      } : null);
    } catch (error) {
      console.error("Failed to toggle completion:", error);
      Alert.alert("Error", "Failed to update habit");
    }
  };

  const handleDeleteHabit = () => {
    if (!habitId) return;
    
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onClose();
          },
        },
      ]
    );
  };

  if (!habit && !loading) {
    return null;
  }

  return (
    <BottomSheet
      backgroundColor="#495057"
      isVisible={isVisible}
      onClose={onClose}
      height={0.9}
      borderRadius={12}
    >
      <ScrollView className="flex-1 px-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">Loading...</Text>
          </View>
        ) : habit ? (
          <>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center flex-1">
                <View
                  style={{ backgroundColor: habit.color }}
                  className="w-12 h-12 rounded-lg items-center justify-center mr-3"
                >
                  <MaterialIcons 
                    name={habit.icon as any || "fitness-center"} 
                    size={24} 
                    color="white" 
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-xl font-bold">{habit.name}</Text>
                  {habit.description && (
                    <Text className="text-gray-300 text-sm mt-1">{habit.description}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={handleDeleteHabit}
                className="p-2 rounded-full bg-red-500"
              >
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View className="bg-[#343a40] rounded-lg p-4 mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-lg font-semibold">Today's Progress</Text>
                <View className="flex-row items-center">
                  <Text className="text-gray-300 text-sm mr-2">Goal: {habit.goal}</Text>
                  <Text className="text-gray-300 text-sm">Frequency: {habit.frequency}</Text>
                </View>
              </View>
              
              <TouchableOpacity
                onPress={handleToggleCompletion}
                style={{
                  backgroundColor: habit.last_completed === new Date().toISOString().split('T')[0] 
                    ? habit.color 
                    : "#6c757d"
                }}
                className="flex-row items-center justify-center py-3 rounded-lg"
              >
                <MaterialIcons 
                  name={habit.last_completed === new Date().toISOString().split('T')[0] ? "check-circle" : "radio-button-unchecked"} 
                  size={24} 
                  color="white" 
                />
                <Text className="text-white text-lg font-semibold ml-2">
                  {habit.last_completed === new Date().toISOString().split('T')[0] 
                    ? "Completed Today" 
                    : "Mark as Complete"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Stats Overview */}
            <View className="bg-[#343a40] rounded-lg p-4 mb-6">
              <Text className="text-white text-lg font-semibold mb-4">Quick Stats</Text>
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">{habit.streak_count}</Text>
                  <Text className="text-gray-300 text-sm">Current Streak</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">{habit.priority ? "High" : "Normal"}</Text>
                  <Text className="text-gray-300 text-sm">Priority</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">{habit.category || "None"}</Text>
                  <Text className="text-gray-300 text-sm">Category</Text>
                </View>
              </View>
            </View>

            {/* GitHub-style Stats */}
            {habitId && <HabitStats habitId={habitId} />}
          </>
        ) : null}
      </ScrollView>
    </BottomSheet>
  );
};

export default HabitDetail;

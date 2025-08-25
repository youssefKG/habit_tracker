import { FC, useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";

interface HabitStatsProps {
  habitId: number;
}

interface StatsData {
  totalCompletions: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: { [key: string]: number };
}

// Dummy stats data
const getDummyStats = (habitId: number): StatsData => {
  const baseStats = {
    1: { totalCompletions: 45, completionRate: 85.2, currentStreak: 7, longestStreak: 12 },
    2: { totalCompletions: 23, completionRate: 67.8, currentStreak: 3, longestStreak: 8 },
    3: { totalCompletions: 89, completionRate: 92.1, currentStreak: 12, longestStreak: 15 },
    4: { totalCompletions: 34, completionRate: 78.5, currentStreak: 5, longestStreak: 9 },
    5: { totalCompletions: 67, completionRate: 88.3, currentStreak: 2, longestStreak: 11 }
  };

  const stats = baseStats[habitId as keyof typeof baseStats] || baseStats[1];
  
  return {
    ...stats,
    weeklyProgress: {
      "2024-W1": Math.floor(Math.random() * 7) + 1,
      "2024-W2": Math.floor(Math.random() * 7) + 1,
      "2024-W3": Math.floor(Math.random() * 7) + 1,
      "2024-W4": Math.floor(Math.random() * 7) + 1,
    }
  };
};

const HabitStats: FC<HabitStatsProps> = ({ habitId }) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [habitId]);

  const loadStats = async () => {
    setLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const statsData = getDummyStats(habitId);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="bg-[#343a40] rounded-lg p-4">
        <Text className="text-white text-lg font-semibold mb-4">Statistics</Text>
        <Text className="text-gray-300">Loading stats...</Text>
      </View>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <View className="space-y-4">
      {/* GitHub-style Stats Cards */}
      <View className="bg-[#343a40] rounded-lg p-4">
        <Text className="text-white text-lg font-semibold mb-4">📊 Activity Overview</Text>
        
        <View className="flex-row justify-between mb-4">
          <View className="bg-[#495057] rounded-lg p-3 flex-1 mr-2">
            <Text className="text-white text-2xl font-bold text-center">{stats.totalCompletions}</Text>
            <Text className="text-gray-300 text-sm text-center">Total Completions</Text>
          </View>
          <View className="bg-[#495057] rounded-lg p-3 flex-1 ml-2">
            <Text className="text-white text-2xl font-bold text-center">{stats.completionRate.toFixed(1)}%</Text>
            <Text className="text-gray-300 text-sm text-center">Success Rate</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between">
          <View className="bg-[#495057] rounded-lg p-3 flex-1 mr-2">
            <Text className="text-white text-2xl font-bold text-center">{stats.currentStreak}</Text>
            <Text className="text-gray-300 text-sm text-center">Current Streak</Text>
          </View>
          <View className="bg-[#495057] rounded-lg p-3 flex-1 ml-2">
            <Text className="text-white text-2xl font-bold text-center">{stats.longestStreak}</Text>
            <Text className="text-gray-300 text-sm text-center">Longest Streak</Text>
          </View>
        </View>
      </View>

      {/* Daily Activity Heatmap */}
      <View className="bg-[#343a40] rounded-lg p-4">
        <Text className="text-white text-lg font-semibold mb-4">🔥 Daily Activity</Text>
        <View className="flex-row flex-wrap justify-center">
          {Array.from({ length: 30 }, (_, i) => {
            const hasActivity = Math.random() > 0.5; // Random activity for demo
            
            return (
              <View
                key={i}
                style={{
                  backgroundColor: hasActivity ? "#28a745" : "#495057",
                  opacity: hasActivity ? 0.8 : 0.3
                }}
                className="w-3 h-3 m-px rounded-sm"
              />
            );
          })}
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-300 text-xs">Less</Text>
          <View className="flex-row items-center">
            {[0, 0.25, 0.5, 0.75, 1].map((opacity, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: "#28a745",
                  opacity: opacity
                }}
                className="w-3 h-3 mx-px rounded-sm"
              />
            ))}
          </View>
          <Text className="text-gray-300 text-xs">More</Text>
        </View>
      </View>

      {/* Achievement Badges */}
      <View className="bg-[#343a40] rounded-lg p-4">
        <Text className="text-white text-lg font-semibold mb-4"> Achievements</Text>
        <View className="flex-row flex-wrap">
          {stats.currentStreak >= 7 && (
            <View className="bg-yellow-500 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-white text-xs font-semibold"> 7-Day Streak</Text>
            </View>
          )}
          {stats.currentStreak >= 30 && (
            <View className="bg-orange-500 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-white text-xs font-semibold">⚡ 30-Day Streak</Text>
            </View>
          )}
          {stats.completionRate >= 80 && (
            <View className="bg-green-500 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-white text-xs font-semibold"> Consistent</Text>
            </View>
          )}
          {stats.totalCompletions >= 100 && (
            <View className="bg-purple-500 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-white text-xs font-semibold">💎 Centurion</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HabitStats;

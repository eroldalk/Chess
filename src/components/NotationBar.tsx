import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

interface NotationBarProps {
  lastMoveText?: string;
  onPressHistory?: () => void;
}

export const NotationBar: React.FC<NotationBarProps> = ({
  lastMoveText = 'Henüz hamle yapılmadı',
  onPressHistory,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressHistory}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <View style={styles.dot} />
        <Text style={styles.label}>SON HAMLE: </Text>
        <Text numberOfLines={1} style={styles.moveText}>
          {lastMoveText}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.historyBtnText}>Notasyon Defteri</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    marginRight: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.outline,
    letterSpacing: 0.5,
  },
  moveText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  historyBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  chevron: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '800',
  },
});

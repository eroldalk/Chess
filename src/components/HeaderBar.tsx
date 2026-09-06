import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

interface HeaderBarProps {
  title?: string;
  onHomePress?: () => void;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title = 'Aktif Oyun Arenası',
  onHomePress,
  onProfilePress,
  onSettingsPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftSection}
        onPress={onHomePress}
        activeOpacity={0.7}
      >
        <View style={styles.emblemBadge}>
          <Text style={styles.emblemIcon}>♟️</Text>
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>

      <View style={styles.rightSection}>
        {/* Offline / Online Engine Status Indicator */}
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>AI Aktif</Text>
        </View>

        {onSettingsPress && (
          <TouchableOpacity
            style={styles.settingsIconButton}
            onPress={onSettingsPress}
            activeOpacity={0.7}
          >
            <Text style={styles.iconButtonText}>⚙️</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 20, 26, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emblemBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.3)',
  },
  emblemIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: 0.2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.tertiary,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.tertiary,
  },
  settingsIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconButtonText: {
    fontSize: 14,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  profileIcon: {
    fontSize: 16,
  },
});

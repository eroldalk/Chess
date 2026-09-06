import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface TacticalAlertProps {
  message: string;
  subBadge?: string;
  isWarning?: boolean;
}

export const TacticalAlert: React.FC<TacticalAlertProps> = ({
  message,
  subBadge,
  isWarning = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        isWarning && styles.warningContainer,
      ]}
    >
      <View style={styles.contentLeft}>
        <Text style={styles.icon}>{isWarning ? '⚠️' : '🎯'}</Text>
        <Text numberOfLines={1} style={[styles.text, isWarning && styles.warningText]}>
          {message}
        </Text>
      </View>

      {subBadge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{subBadge}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 6,
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
  },
  warningText: {
    color: Colors.error,
  },
  badge: {
    backgroundColor: 'rgba(242, 202, 80, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
});

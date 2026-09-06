import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';
import { PieceColor } from '../types/chess';

interface PlayerHUDProps {
  name: string;
  rating: number;
  playerColor: PieceColor;
  isTurn: boolean;
  timeFormatted: string;
  hapticEnabled?: boolean;
}

export const PlayerHUD: React.FC<PlayerHUDProps> = ({
  name = 'Usta Adayı',
  rating = 1450,
  playerColor,
  isTurn,
  timeFormatted,
  hapticEnabled = true,
}) => {
  const colorLabel = playerColor === 'w' ? 'Beyaz' : 'Siyah';

  return (
    <View style={[styles.container, isTurn && styles.activeContainer]}>
      <View style={styles.leftSection}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👑</Text>
          </View>
          <View style={[styles.statusDot, isTurn && styles.activeStatusDot]} />
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text numberOfLines={1} style={styles.nameText}>
              {name}
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text
              style={[
                styles.turnLabel,
                { color: isTurn ? Colors.primary : Colors.onSurfaceVariant },
              ]}
            >
              {isTurn ? `Senin Sıran! (${colorLabel})` : `Yapay Zeka Düşünüyor...`}
            </Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.hapticText}>
              {hapticEnabled ? '📳 Titreşim Açık' : 'Titreşim Kapalı'}
            </Text>
          </View>
        </View>
      </View>

      {/* Digital Chronometer */}
      <View style={[styles.timerBox, isTurn && styles.activeTimerBox]}>
        <Text style={styles.timerIcon}>⏱️</Text>
        <Text style={[styles.timerText, isTurn && styles.activeTimerText]}>
          {timeFormatted}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeContainer: {
    borderColor: 'rgba(242, 202, 80, 0.35)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(242, 202, 80, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.3)',
  },
  avatarText: {
    fontSize: 20,
  },
  statusDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.outline,
    borderWidth: 1.5,
    borderColor: Colors.surfaceContainerLowest,
  },
  activeStatusDot: {
    backgroundColor: Colors.primary,
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginRight: 6,
  },
  ratingBadge: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  turnLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.outline,
    marginHorizontal: 4,
  },
  hapticText: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    opacity: 0.7,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  activeTimerBox: {
    backgroundColor: 'rgba(242, 202, 80, 0.15)',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  timerIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontVariant: ['tabular-nums'],
  },
  activeTimerText: {
    color: Colors.primary,
  },
});

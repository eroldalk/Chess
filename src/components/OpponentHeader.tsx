import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';
import { PieceType } from '../types/chess';

interface OpponentHeaderProps {
  name: string;
  rating: number;
  avatarIcon?: string;
  isTurn: boolean;
  capturedPieces: PieceType[];
  timeFormatted: string;
}

const PIECE_UNICODE: Record<PieceType, string> = {
  p: '♙',
  n: '♘',
  b: '♗',
  r: '♖',
  q: '♕',
  k: '♔',
};

export const OpponentHeader: React.FC<OpponentHeaderProps> = ({
  name,
  rating,
  avatarIcon = '🤖',
  isTurn,
  capturedPieces,
  timeFormatted,
}) => {
  return (
    <View style={[styles.container, isTurn && styles.activeContainer]}>
      <View style={styles.leftSection}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarIcon}</Text>
          </View>
          {isTurn && <View style={styles.thinkingDot} />}
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

          {/* Captured Pieces by Opponent */}
          <View style={styles.capturedRow}>
            <Text style={styles.capturedLabel}>Alınanlar: </Text>
            <View style={styles.pieceSymbols}>
              {capturedPieces.slice(0, 7).map((p, idx) => (
                <Text key={idx} style={styles.pieceSymbol}>
                  {PIECE_UNICODE[p]}
                </Text>
              ))}
              {capturedPieces.length > 7 && (
                <Text style={styles.morePieces}>+{capturedPieces.length - 7}</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Opponent Chronometer */}
      <View style={[styles.timerBox, isTurn && styles.activeTimerBox]}>
        <Text style={styles.timerIcon}>⏳</Text>
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
    borderColor: 'rgba(255, 185, 95, 0.3)',
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
    backgroundColor: Colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  thinkingDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
    borderWidth: 1.5,
    borderColor: Colors.surfaceContainerLowest,
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
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.secondary,
  },
  capturedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  capturedLabel: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    opacity: 0.7,
  },
  pieceSymbols: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieceSymbol: {
    fontSize: 12,
    color: Colors.primary,
    marginRight: 2,
  },
  morePieces: {
    fontSize: 10,
    color: Colors.tertiary,
    fontWeight: '700',
    marginLeft: 2,
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
    backgroundColor: 'rgba(255, 185, 95, 0.15)',
    borderWidth: 1,
    borderColor: Colors.secondary,
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
    color: Colors.secondary,
  },
});

import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { GameStatus, PieceColor } from '../types/chess';

interface GameOverModalProps {
  visible: boolean;
  status: GameStatus;
  winner: PieceColor | null;
  playerColor: PieceColor;
  moveCount: number;
  onRestart: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  visible,
  status,
  winner,
  playerColor,
  moveCount,
  onRestart,
  onClose,
}) => {
  if (!visible) return null;

  const isPlayerWinner = winner === playerColor;
  const isDraw =
    status === 'stalemate' ||
    status === 'draw_50_moves' ||
    status === 'draw_insufficient_material' ||
    status === 'draw_repetition';

  let emoji = '🏆';
  let title = 'ZAFER!';
  let subtitle = 'Muazzam bir taktik hamleyle şah mat yaptın!';
  let eloChange = '+24 ELO';
  let eloColor = Colors.primary;

  if (isDraw) {
    emoji = '🤝';
    title = 'BERABERLİK';
    subtitle = status === 'stalemate' ? 'Oyun pat ile sonuçlandı.' : 'Beraberlik sağlandı.';
    eloChange = '+0 ELO';
    eloColor = Colors.onSurfaceVariant;
  } else if (!isPlayerWinner) {
    emoji = '🛡️';
    title = 'MAĞLUBİYET';
    subtitle = status === 'resigned' ? 'Oyundan çekildin.' : 'Yapay zeka şah mat yaptı.';
    eloChange = '-16 ELO';
    eloColor = Colors.error;
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Trophy / Status Icon */}
          <View style={[styles.iconCircle, { borderColor: eloColor }]}>
            <Text style={styles.iconText}>{emoji}</Text>
          </View>

          <Text style={[styles.title, { color: eloColor }]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Rating & Stats Card */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Derece Değişimi</Text>
              <Text style={[styles.statValue, { color: eloColor }]}>{eloChange}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Toplam Hamle</Text>
              <Text style={styles.statValue}>{moveCount}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.primaryBtn]}
              onPress={onRestart}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryBtnText}>Yeniden Oyna</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.secondaryBtn]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryBtnText}>Tahtayı İncele</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 22,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 16,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 14,
  },
  iconText: {
    fontSize: 38,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 18,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.onPrimary,
  },
  secondaryBtn: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
});

import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { PieceColor, PieceType } from '../types/chess';
import { ChessPiece } from './ChessPiece';

interface PromotionModalProps {
  visible: boolean;
  color: PieceColor;
  onSelect: (piece: PieceType) => void;
}

const PROMOTION_PIECES: { type: PieceType; name: string }[] = [
  { type: 'q', name: 'Vezir' },
  { type: 'r', name: 'Kale' },
  { type: 'b', name: 'Fil' },
  { type: 'n', name: 'At' },
];

export const PromotionModal: React.FC<PromotionModalProps> = ({
  visible,
  color,
  onSelect,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Piyon Terfisi</Text>
          <Text style={styles.subtitle}>Dönüşecek taşı seçin:</Text>

          <View style={styles.piecesRow}>
            {PROMOTION_PIECES.map((item) => (
              <TouchableOpacity
                key={item.type}
                style={styles.pieceButton}
                onPress={() => onSelect(item.type)}
                activeOpacity={0.7}
              >
                <ChessPiece type={item.type} color={color} size={48} />
                <Text style={styles.pieceName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 18,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primaryContainer,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: 20,
  },
  piecesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  pieceButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pieceName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 6,
  },
});

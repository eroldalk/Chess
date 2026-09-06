import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

interface HistoryModalProps {
  visible: boolean;
  history: string[];
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  visible,
  history,
  onClose,
}) => {
  // Pair moves into [White, Black] turns
  const pairedMoves: { moveNum: number; white: string; black?: string }[] = [];
  for (let i = 0; i < history.length; i += 2) {
    pairedMoves.push({
      moveNum: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1],
    });
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.header}>
            <Text style={styles.title}>Notasyon Defteri (PGN)</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            {pairedMoves.length === 0 ? (
              <Text style={styles.emptyText}>Henüz hamle oynanmadı.</Text>
            ) : (
              pairedMoves.map((turn) => (
                <View key={turn.moveNum} style={styles.moveRow}>
                  <Text style={styles.moveNumber}>{turn.moveNum}.</Text>
                  <View style={styles.moveBox}>
                    <Text style={styles.whiteMove}>{turn.white}</Text>
                  </View>
                  <View style={styles.moveBox}>
                    <Text style={styles.blackMove}>{turn.black || '-'}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <TouchableOpacity style={styles.closeFullBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeFullBtnText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 360,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  list: {
    maxHeight: 300,
  },
  listContent: {
    paddingVertical: 6,
  },
  emptyText: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginVertical: 20,
  },
  moveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  moveNumber: {
    width: 36,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.outline,
  },
  moveBox: {
    flex: 1,
    paddingHorizontal: 8,
  },
  whiteMove: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  blackMove: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  closeFullBtn: {
    backgroundColor: Colors.surfaceContainerHighest,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  closeFullBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
});

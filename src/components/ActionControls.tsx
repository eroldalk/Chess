import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

interface ActionControlsProps {
  onUndo: () => void;
  onHint: () => void;
  onSettings: () => void;
  onResign: () => void;
  onNewGame: () => void;
  undoCount: number;
  maxUndo?: number;
  hintActive: boolean;
  disabled?: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  onUndo,
  onHint,
  onSettings,
  onResign,
  onNewGame,
  undoCount,
  maxUndo = 3,
  hintActive,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Geri Al */}
      <TouchableOpacity
        style={[styles.btn, styles.normalBtn, disabled && styles.disabledBtn]}
        onPress={onUndo}
        disabled={disabled || undoCount >= maxUndo}
        activeOpacity={0.7}
      >
        <Text style={styles.btnIcon}>↩️</Text>
        <Text style={styles.btnLabel}>Geri Al</Text>
        <Text style={styles.btnSubLabel}>
          {maxUndo - undoCount}/{maxUndo} Hak
        </Text>
      </TouchableOpacity>

      {/* İpucu */}
      <TouchableOpacity
        style={[
          styles.btn,
          hintActive ? styles.activeHintBtn : styles.hintBtn,
          disabled && styles.disabledBtn,
        ]}
        onPress={onHint}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={styles.btnIcon}>💡</Text>
        <Text style={[styles.btnLabel, styles.hintLabel]}>İpucu</Text>
        <Text style={[styles.btnSubLabel, styles.hintSubLabel]}>
          {hintActive ? 'Aktif' : 'Taktik'}
        </Text>
      </TouchableOpacity>

      {/* Ayarlar */}
      <TouchableOpacity
        style={[styles.btn, styles.normalBtn]}
        onPress={onSettings}
        activeOpacity={0.7}
      >
        <Text style={styles.btnIcon}>⚙️</Text>
        <Text style={styles.btnLabel}>Ayarlar</Text>
        <Text style={styles.btnSubLabel}>Seviye</Text>
      </TouchableOpacity>

      {/* Yeni Oyun */}
      <TouchableOpacity
        style={[styles.btn, styles.normalBtn]}
        onPress={onNewGame}
        activeOpacity={0.7}
      >
        <Text style={styles.btnIcon}>🔄</Text>
        <Text style={styles.btnLabel}>Yeni Oyun</Text>
        <Text style={styles.btnSubLabel}>Sıfırla</Text>
      </TouchableOpacity>

      {/* Pes Et */}
      <TouchableOpacity
        style={[styles.btn, styles.resignBtn]}
        onPress={onResign}
        activeOpacity={0.7}
      >
        <Text style={styles.btnIcon}>🏳️</Text>
        <Text style={[styles.btnLabel, styles.resignLabel]}>Pes Et</Text>
        <Text style={styles.btnSubLabel}>Çekil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 6,
    gap: 6,
  },
  btn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  normalBtn: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
  hintBtn: {
    backgroundColor: Colors.primaryContainer,
    borderColor: Colors.primary,
  },
  activeHintBtn: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  resignBtn: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  btnIcon: {
    fontSize: 16,
  },
  btnLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 2,
  },
  hintLabel: {
    color: Colors.onPrimary,
  },
  resignLabel: {
    color: Colors.error,
  },
  btnSubLabel: {
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    opacity: 0.75,
    marginTop: 1,
  },
  hintSubLabel: {
    color: Colors.onPrimaryContainer,
    fontWeight: '600',
  },
});

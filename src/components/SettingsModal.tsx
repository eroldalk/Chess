import React from 'react';
import { Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';
import { AIDifficulty, GameSettings, PieceColor } from '../types/chess';

interface SettingsModalProps {
  visible: boolean;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onClose: () => void;
}

const DIFFICULTIES: { id: AIDifficulty; name: string; elo: string; icon: string }[] = [
  { id: 'easy', name: 'Acemi', elo: '800 Elo', icon: '🌱' },
  { id: 'medium', name: 'Kulüp', elo: '1400 Elo', icon: '⚡' },
  { id: 'master', name: 'Büyük Usta', elo: '1850+ Elo', icon: '👑' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Oyun Ayarları</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIconBtn}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* AI Difficulty Section */}
          <Text style={styles.sectionTitle}>Yapay Zeka Seviyesi</Text>
          <View style={styles.difficultyGrid}>
            {DIFFICULTIES.map((d) => {
              const isSelected = settings.difficulty === d.id;
              return (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.diffCard, isSelected && styles.selectedDiffCard]}
                  onPress={() => onUpdateSettings({ difficulty: d.id })}
                  activeOpacity={0.7}
                >
                  <Text style={styles.diffIcon}>{d.icon}</Text>
                  <Text
                    style={[styles.diffName, isSelected && { color: Colors.primary }]}
                  >
                    {d.name}
                  </Text>
                  <Text style={styles.diffElo}>{d.elo}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Time Control Selection */}
          <Text style={styles.sectionTitle}>Süre Kontrolü (Saat)</Text>
          <View style={styles.timeRow}>
            {(
              [
                { id: '3m', label: '3 Dk', sub: 'Yıldırım' },
                { id: '5m', label: '5 Dk', sub: 'Yıldırım' },
                { id: '10m', label: '10 Dk', sub: 'Hızlı' },
                { id: '15m', label: '15 Dk', sub: 'Klasik' },
                { id: 'unlimited', label: 'Süresiz', sub: 'Serbest' },
              ] as const
            ).map((t) => {
              const isSelected = settings.timeControl === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.timeBtn, isSelected && styles.selectedTimeBtn]}
                  onPress={() => onUpdateSettings({ timeControl: t.id })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.timeBtnLabel, isSelected && { color: Colors.primary }]}>
                    {t.label}
                  </Text>
                  <Text style={styles.timeBtnSub}>{t.sub}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Player Color Selection */}
          <Text style={styles.sectionTitle}>Oynayacağınız Renk</Text>
          <View style={styles.colorRow}>
            <TouchableOpacity
              style={[
                styles.colorBtn,
                settings.playerColor === 'w' && styles.selectedColorBtn,
              ]}
              onPress={() => onUpdateSettings({ playerColor: 'w' })}
              activeOpacity={0.7}
            >
              <Text style={styles.colorIcon}>♔</Text>
              <Text
                style={[
                  styles.colorText,
                  settings.playerColor === 'w' && { color: Colors.primary },
                ]}
              >
                Beyaz
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.colorBtn,
                settings.playerColor === 'b' && styles.selectedColorBtn,
              ]}
              onPress={() => onUpdateSettings({ playerColor: 'b' })}
              activeOpacity={0.7}
            >
              <Text style={styles.colorIcon}>♚</Text>
              <Text
                style={[
                  styles.colorText,
                  settings.playerColor === 'b' && { color: Colors.primary },
                ]}
              >
                Siyah
              </Text>
            </TouchableOpacity>
          </View>

          {/* Preferences Toggles */}
          <Text style={styles.sectionTitle}>Tercihler</Text>
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Titreşim & Dokunsal Geribildirim</Text>
              <Text style={styles.toggleSub}>Hamlelerde haptic titreşim</Text>
            </View>
            <Switch
              value={settings.hapticEnabled}
              onValueChange={(val) => onUpdateSettings({ hapticEnabled: val })}
              trackColor={{ false: Colors.surfaceContainerHighest, true: Colors.primaryContainer }}
              thumbColor={settings.hapticEnabled ? Colors.primary : Colors.outline}
            />
          </View>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Yasal Hamleleri Göster</Text>
              <Text style={styles.toggleSub}>Karelerde hedef noktaları</Text>
            </View>
            <Switch
              value={settings.showLegalMoves}
              onValueChange={(val) => onUpdateSettings({ showLegalMoves: val })}
              trackColor={{ false: Colors.surfaceContainerHighest, true: Colors.primaryContainer }}
              thumbColor={settings.showLegalMoves ? Colors.primary : Colors.outline}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Kaydet ve Kapat</Text>
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
    padding: 22,
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  closeIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 8,
  },
  difficultyGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  timeBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedTimeBtn: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(242, 202, 80, 0.08)',
  },
  timeBtnLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  timeBtnSub: {
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    marginTop: 1,
  },
  diffCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedDiffCard: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(242, 202, 80, 0.08)',
  },
  diffIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  diffName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  diffElo: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  colorBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 8,
  },
  selectedColorBtn: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(242, 202, 80, 0.08)',
  },
  colorIcon: {
    fontSize: 20,
    color: Colors.primary,
  },
  colorText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  toggleSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.onPrimary,
  },
});

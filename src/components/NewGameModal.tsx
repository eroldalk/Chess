import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';
import { AIDifficulty, PieceColor, TimeControl } from '../types/chess';

interface NewGameModalProps {
  visible: boolean;
  currentDifficulty: AIDifficulty;
  currentColor: PieceColor;
  currentTimeControl: TimeControl;
  onStartGame: (config: {
    color: PieceColor;
    timeControl: TimeControl;
    difficulty: AIDifficulty;
  }) => void;
  onClose: () => void;
}

type ColorChoice = 'w' | 'b' | 'random';

const TIME_OPTIONS: { id: TimeControl; label: string; sub: string; icon: string }[] = [
  { id: '3m', label: '3 Dk', sub: 'Yıldırım', icon: '⚡' },
  { id: '5m', label: '5 Dk', sub: 'Yıldırım', icon: '⚡' },
  { id: '10m', label: '10 Dk', sub: 'Hızlı', icon: '⏱️' },
  { id: '15m', label: '15 Dk', sub: 'Klasik', icon: '⏳' },
  { id: 'unlimited', label: 'Süresiz', sub: 'Limitsiz', icon: '♾️' },
];

const DIFFICULTY_OPTIONS: { id: AIDifficulty; name: string; elo: string; icon: string }[] = [
  { id: 'easy', name: 'Acemi', elo: '800', icon: '🌱' },
  { id: 'medium', name: 'Kulüp', elo: '1400', icon: '⚡' },
  { id: 'master', name: 'Büyük Usta', elo: '1850+', icon: '👑' },
];

export const NewGameModal: React.FC<NewGameModalProps> = ({
  visible,
  currentDifficulty,
  currentColor,
  currentTimeControl,
  onStartGame,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorChoice>(currentColor);
  const [selectedTime, setSelectedTime] = useState<TimeControl>(currentTimeControl);
  const [selectedDifficulty, setSelectedDifficulty] = useState<AIDifficulty>(currentDifficulty);

  const handleConfirm = () => {
    let resolvedColor: PieceColor = selectedColor === 'random'
      ? (Math.random() > 0.5 ? 'w' : 'b')
      : selectedColor;

    onStartGame({
      color: resolvedColor,
      timeControl: selectedTime,
      difficulty: selectedDifficulty,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Yeni Satranç Maçı</Text>
              <Text style={styles.subtitle}>Renk ve süre kurallarını belirleyin</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 1. RENK SEÇİMİ (BEYAZ / SİYAH / RASTGELE) */}
          <Text style={styles.sectionLabel}>Oynanacak Renk</Text>
          <View style={styles.colorRow}>
            {/* Beyaz */}
            <TouchableOpacity
              style={[
                styles.colorCard,
                selectedColor === 'w' && styles.selectedColorCard,
              ]}
              onPress={() => setSelectedColor('w')}
              activeOpacity={0.7}
            >
              <Text style={styles.pieceIcon}>♔</Text>
              <Text style={[styles.colorTitle, selectedColor === 'w' && styles.activeColorTitle]}>
                Beyaz
              </Text>
              <Text style={styles.colorSub}>İlk Hamle</Text>
            </TouchableOpacity>

            {/* Rastgele */}
            <TouchableOpacity
              style={[
                styles.colorCard,
                selectedColor === 'random' && styles.selectedColorCard,
              ]}
              onPress={() => setSelectedColor('random')}
              activeOpacity={0.7}
            >
              <Text style={styles.pieceIcon}>🎲</Text>
              <Text style={[styles.colorTitle, selectedColor === 'random' && styles.activeColorTitle]}>
                Rastgele
              </Text>
              <Text style={styles.colorSub}>%50 Kura</Text>
            </TouchableOpacity>

            {/* Siyah */}
            <TouchableOpacity
              style={[
                styles.colorCard,
                selectedColor === 'b' && styles.selectedColorCard,
              ]}
              onPress={() => setSelectedColor('b')}
              activeOpacity={0.7}
            >
              <Text style={[styles.pieceIcon, { color: Colors.outline }]}>♚</Text>
              <Text style={[styles.colorTitle, selectedColor === 'b' && styles.activeColorTitle]}>
                Siyah
              </Text>
              <Text style={styles.colorSub}>AI Başlar</Text>
            </TouchableOpacity>
          </View>

          {/* 2. SÜRE MODU SEÇİMİ */}
          <Text style={styles.sectionLabel}>Süre Kontrolü (Saat)</Text>
          <View style={styles.timeRow}>
            {TIME_OPTIONS.map((t) => {
              const isSelected = selectedTime === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.timeCard, isSelected && styles.selectedTimeCard]}
                  onPress={() => setSelectedTime(t.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.timeIcon}>{t.icon}</Text>
                  <Text style={[styles.timeLabel, isSelected && styles.activeTimeLabel]}>
                    {t.label}
                  </Text>
                  <Text style={styles.timeSub}>{t.sub}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 3. YAPAY ZEKA SEVİYESİ */}
          <Text style={styles.sectionLabel}>Yapay Zeka Zorluğu</Text>
          <View style={styles.diffRow}>
            {DIFFICULTY_OPTIONS.map((d) => {
              const isSelected = selectedDifficulty === d.id;
              return (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.diffCard, isSelected && styles.selectedDiffCard]}
                  onPress={() => setSelectedDifficulty(d.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.diffIcon}>{d.icon}</Text>
                  <Text style={[styles.diffName, isSelected && styles.activeDiffName]}>
                    {d.name}
                  </Text>
                  <Text style={styles.diffElo}>{d.elo} Elo</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Start Game Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Text style={styles.startButtonText}>Oyunu Başlat ➔</Text>
          </TouchableOpacity>
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
    padding: 16,
  },
  modalBox: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontWeight: '700',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  colorCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedColorCard: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(242, 202, 80, 0.1)',
  },
  pieceIcon: {
    fontSize: 26,
    color: Colors.primary,
    marginBottom: 2,
  },
  colorTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  activeColorTitle: {
    color: Colors.primary,
  },
  colorSub: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  timeCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedTimeCard: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(242, 202, 80, 0.1)',
  },
  timeIcon: {
    fontSize: 14,
    marginBottom: 2,
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  activeTimeLabel: {
    color: Colors.primary,
  },
  timeSub: {
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    marginTop: 1,
  },
  diffRow: {
    flexDirection: 'row',
    gap: 8,
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
    backgroundColor: 'rgba(242, 202, 80, 0.1)',
  },
  diffIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  diffName: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  activeDiffName: {
    color: Colors.primary,
  },
  diffElo: {
    fontSize: 9,
    color: Colors.onSurfaceVariant,
    marginTop: 1,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.onPrimary,
  },
});

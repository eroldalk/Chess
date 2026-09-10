import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';

interface CareerScreenProps {
  onStartMatch: () => void;
}

export const CareerScreen: React.FC<CareerScreenProps> = ({ onStartMatch }) => {
  const stages = [
    { id: 1, title: 'Temel Açılışlar', stars: 3, status: 'completed', badge: 'Aşama 1' },
    { id: 2, title: 'Merkez Kontrolü', stars: 3, status: 'completed', badge: 'Aşama 2' },
    { id: 3, title: 'At ve Fil Kombinasyonları', stars: 3, status: 'completed', badge: 'Aşama 3' },
    { id: 4, title: 'Kale Bataryaları', stars: 3, status: 'completed', badge: 'Aşama 4' },
    { id: 5, title: 'Piyon Yapıları & Geçer Piyon', stars: 2, status: 'completed', badge: 'Aşama 5' },
    { id: 6, title: 'Çatal ve Şiş Taktikleri', stars: 2, status: 'completed', badge: 'Aşama 6' },
    { id: 7, title: 'Vezir Fedaları', stars: 1, status: 'completed', badge: 'Aşama 7' },
    { id: 8, title: 'Büyük Usta Düellosu', stars: 0, status: 'current', badge: 'Aşama 8' },
    { id: 9, title: 'Efsanevi Şampiyona', stars: 0, status: 'locked', badge: 'Aşama 9' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Play Games Sync & Energy Bar */}
      <View style={styles.statusBar}>
        <View style={styles.syncPill}>
          <Text style={styles.syncIcon}>☁️</Text>
          <Text style={styles.syncText}>Google Play Games: Bulut Eşitlendi ✓</Text>
        </View>
        <View style={styles.energyPill}>
          <Text style={styles.energyIcon}>⚡</Text>
          <Text style={styles.energyText}>5/5 Enerji</Text>
        </View>
      </View>

      {/* Game Mode Selector */}
      <View style={styles.modeRow}>
        <TouchableOpacity style={[styles.modeChip, styles.modeChipActive]} activeOpacity={0.8}>
          <Text style={styles.modeIcon}>♟️</Text>
          <Text style={[styles.modeChipText, styles.modeChipTextActive]}>Klasik Satranç</Text>
        </TouchableOpacity>
      </View>

      {/* Chapter Overview Card */}
      <View style={styles.chapterCard}>
        <View style={styles.chapterHeader}>
          <View style={styles.chapterBadge}>
            <Text style={styles.chapterBadgeIcon}>🎖️</Text>
          </View>
          <View style={styles.chapterTexts}>
            <Text style={styles.chapterTitle}>Usta Yolu: Anadolu Ocağı</Text>
            <Text style={styles.chapterSubtitle}>Bölüm 2 / 4 • 17 / 24 Yıldız Toplandı</Text>
          </View>
          <View style={styles.starPill}>
            <Text style={styles.starPillIcon}>⭐</Text>
            <Text style={styles.starPillCount}>17</Text>
          </View>
        </View>
      </View>

      {/* Current Active Mission Card */}
      <View style={styles.activeMissionCard}>
        <View style={styles.activeMissionHeader}>
          <View>
            <View style={styles.tagRow}>
              <View style={styles.stageTag}>
                <Text style={styles.stageTagText}>AŞAMA 08</Text>
              </View>
              <Text style={styles.categoryTag}>Büyük Usta Düellosu</Text>
            </View>
            <Text style={styles.missionTitle}>Magnus Seviyesi Taktik Düellosu</Text>
          </View>
          <View style={styles.timerBadge}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.timerText}>10:00</Text>
          </View>
        </View>

        <View style={styles.goalBox}>
          <Text style={styles.goalTitle}>GÖREV AMACI</Text>
          <Text style={styles.goalDescription}>
            Yapay zeka ustasına karşı Beyaz taşlarla galibiyet elde et. Hatalı hamle yapmaktan kaçın, şah kanadını güvene al.
          </Text>
        </View>

        <View style={styles.rewardsList}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardStar}>⭐</Text>
            <Text style={styles.rewardLabel}>Maçı Galibiyetle Bitir</Text>
            <Text style={styles.rewardXp}>+100 XP</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardStar}>⭐</Text>
            <Text style={styles.rewardLabel}>Geri Al (Undo) Kullanmadan Kazan</Text>
            <Text style={styles.rewardXp}>+150 XP</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardStar}>⭐</Text>
            <Text style={styles.rewardLabel}>Rakibi 30 Hamleden Önce Mat Et</Text>
            <Text style={styles.rewardXp}>+200 XP</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={onStartMatch}
          activeOpacity={0.85}
        >
          <Text style={styles.startButtonText}>Hemen Başla (Arena)</Text>
          <Text style={styles.startButtonArrow}>➔</Text>
        </TouchableOpacity>
      </View>

      {/* Roadmap Stages List */}
      <Text style={styles.roadmapHeading}>Kariyer Yol Haritası</Text>
      <View style={styles.stagesList}>
        {stages.map((stage) => {
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          return (
            <TouchableOpacity
              key={stage.id}
              style={[
                styles.stageRow,
                isCurrent && styles.stageRowCurrent,
                stage.status === 'locked' && styles.stageRowLocked,
              ]}
              onPress={isCurrent ? onStartMatch : undefined}
              activeOpacity={isCurrent ? 0.7 : 1}
            >
              <View
                style={[
                  styles.stageCircle,
                  isCompleted && styles.stageCircleCompleted,
                  isCurrent && styles.stageCircleCurrent,
                ]}
              >
                <Text style={styles.stageNumber}>
                  {isCompleted ? '✓' : stage.status === 'locked' ? '🔒' : stage.id}
                </Text>
              </View>

              <View style={styles.stageInfo}>
                <View style={styles.stageBadgeRow}>
                  <Text style={styles.stageBadgeText}>{stage.badge}</Text>
                  {isCurrent && <Text style={styles.liveTag}>ŞU ANKİ</Text>}
                </View>
                <Text style={styles.stageTitleText}>{stage.title}</Text>
              </View>

              <View style={styles.stageStars}>
                {[1, 2, 3].map((s) => (
                  <Text
                    key={s}
                    style={[
                      styles.smallStar,
                      s <= stage.stars ? styles.smallStarFilled : styles.smallStarEmpty,
                    ]}
                  >
                    ★
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  syncText: {
    fontSize: 11,
    color: Colors.tertiary,
    fontWeight: '600',
  },
  energyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  energyIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  energyText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
  },
  modeChipActive: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  modeChipDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    opacity: 0.5,
  },
  modeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  modeChipText: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
  modeChipTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  modeChipTextDisabled: {
    fontSize: 12,
    color: Colors.outline,
  },
  chapterCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chapterBadgeIcon: {
    fontSize: 20,
  },
  chapterTexts: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  chapterSubtitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  starPillIcon: {
    fontSize: 14,
  },
  starPillCount: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  activeMissionCard: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.35)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  activeMissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  stageTag: {
    backgroundColor: 'rgba(242, 202, 80, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stageTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  categoryTag: {
    fontSize: 11,
    color: Colors.tertiary,
    fontWeight: '600',
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  timerIcon: {
    fontSize: 12,
  },
  timerText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
  },
  goalBox: {
    backgroundColor: 'rgba(10, 14, 20, 0.65)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.outline,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 13,
    color: Colors.onSurface,
    lineHeight: 18,
  },
  rewardsList: {
    gap: 6,
    marginBottom: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  rewardStar: {
    fontSize: 12,
    marginRight: 8,
  },
  rewardLabel: {
    flex: 1,
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  rewardXp: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  startButton: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.onPrimary,
  },
  startButtonArrow: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.onPrimary,
  },
  roadmapHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.onSurface,
    marginBottom: 12,
  },
  stagesList: {
    gap: 8,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  stageRowCurrent: {
    borderColor: 'rgba(242, 202, 80, 0.4)',
    backgroundColor: Colors.surfaceContainerHigh,
  },
  stageRowLocked: {
    opacity: 0.45,
  },
  stageCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stageCircleCompleted: {
    backgroundColor: 'rgba(82, 196, 26, 0.2)',
  },
  stageCircleCurrent: {
    backgroundColor: Colors.primary,
  },
  stageNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  stageInfo: {
    flex: 1,
  },
  stageBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stageBadgeText: {
    fontSize: 10,
    color: Colors.outline,
    fontWeight: '700',
  },
  liveTag: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
    backgroundColor: 'rgba(242, 202, 80, 0.15)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  stageTitleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
    marginTop: 2,
  },
  stageStars: {
    flexDirection: 'row',
    gap: 2,
  },
  smallStar: {
    fontSize: 13,
  },
  smallStarFilled: {
    color: Colors.primary,
  },
  smallStarEmpty: {
    color: 'rgba(255, 255, 255, 0.15)',
  },
});

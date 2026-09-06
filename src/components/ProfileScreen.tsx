import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';

interface ProfileScreenProps {
  onOpenSettings: () => void;
  onPlayNow: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenSettings,
  onPlayNow,
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Player Dossier Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>👑</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>LV 18</Text>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.playerName}>Büyük Usta</Text>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
            <Text style={styles.playerTitle}>Usta Adayı • Taktisyen V</Text>

            <View style={styles.syncRow}>
              <View style={styles.syncPill}>
                <Text style={styles.syncPillText}>☁️ Play Games: Eşitlendi ✓</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tactical Metrics Tri-Strip */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>1,842</Text>
            <Text style={styles.metricLabel}>KUPA PUANI</Text>
          </View>
          <View style={[styles.metricItem, styles.metricBorder]}>
            <Text style={[styles.metricValue, { color: Colors.primary }]}>2,480</Text>
            <Text style={styles.metricLabel}>ELO PUANI</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: Colors.secondary }]}>52</Text>
            <Text style={styles.metricLabel}>TOPLAM YILDIZ</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons: Play Now & Settings */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={onPlayNow}
          activeOpacity={0.85}
        >
          <Text style={styles.playButtonText}>♟️ Hemen Maça Gir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings}
          activeOpacity={0.85}
        >
          <Text style={styles.settingsButtonText}>⚙️ Ayarlar</Text>
        </TouchableOpacity>
      </View>

      {/* Career Statistics */}
      <Text style={styles.sectionHeader}>Oyun İstatistikleri</Text>
      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Toplam Maç</Text>
          <Text style={styles.statVal}>195</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Galibiyet</Text>
          <Text style={[styles.statVal, { color: Colors.success }]}>142 (%72.8)</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Beraberlik</Text>
          <Text style={styles.statVal}>18</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Yenilgi</Text>
          <Text style={[styles.statVal, { color: Colors.error }]}>35</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>En Hızlı Mat</Text>
          <Text style={[styles.statVal, { color: Colors.primary }]}>11 Hamle</Text>
        </View>
      </View>

      {/* Badges / Achievements */}
      <Text style={styles.sectionHeader}>Başarımlar & Rozetler</Text>
      <View style={styles.badgeGrid}>
        <View style={styles.badgeCard}>
          <Text style={styles.badgeIcon}>⚡</Text>
          <Text style={styles.badgeTitle}>Yıldırım Şahı</Text>
          <Text style={styles.badgeSub}>5 dk altında galibiyet</Text>
        </View>
        <View style={styles.badgeCard}>
          <Text style={styles.badgeIcon}>🛡️</Text>
          <Text style={styles.badgeTitle}>Demir Savunma</Text>
          <Text style={styles.badgeSub}>Kayıpsız 5 galibiyet serisi</Text>
        </View>
        <View style={styles.badgeCard}>
          <Text style={styles.badgeIcon}>🎯</Text>
          <Text style={styles.badgeTitle}>Kusursuz Taktik</Text>
          <Text style={styles.badgeSub}>İpuçsuz Usta botunu yen</Text>
        </View>
        <View style={styles.badgeCard}>
          <Text style={styles.badgeIcon}>💎</Text>
          <Text style={styles.badgeTitle}>Vezir Fedası</Text>
          <Text style={styles.badgeSub}>Vezir feda ederek mat et</Text>
        </View>
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
  profileCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: Colors.surfaceContainerHighest,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 34,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: Colors.surfaceContainerHighest,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  levelText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  profileDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  verifiedIcon: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '900',
  },
  playerTitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: 6,
  },
  syncRow: {
    flexDirection: 'row',
  },
  syncPill: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  syncPillText: {
    fontSize: 10,
    color: Colors.tertiary,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingVertical: 12,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.outline,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  playButton: {
    flex: 2,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.onPrimary,
  },
  settingsButton: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  settingsButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.onSurface,
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  statDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  badgeIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  badgeSub: {
    fontSize: 11,
    color: Colors.outline,
    marginTop: 2,
  },
});

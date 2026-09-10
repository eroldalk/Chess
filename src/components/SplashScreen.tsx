import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../theme/colors';

interface SplashScreenProps {
  onFinish: () => void;
}

const PHRASES = [
  'Varlıklar & Yapay Zekâ Motoru Yükleniyor...',
  'Derin Taktik Ağı ve Mat Modelleri Isıtılıyor...',
  'Uluslararası Açılış Kitaplığı Hazırlanıyor...',
  'Salon Hazır! İyi Şanslar, Büyükusta.',
];

const { width } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState<number>(15);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Animations
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Continuous subtle pulse on the golden aura
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.96,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // Subtle rotation of outer geometry
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    return () => {
      pulseLoop.stop();
      spinLoop.stop();
    };
  }, [pulseAnim, spinAnim]);

  // Loading progress progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          setPhraseIndex(3);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 40 && next < 70) setPhraseIndex(1);
        else if (next >= 70 && next < 95) setPhraseIndex(2);
        else if (next >= 95) {
          setPhraseIndex(3);
          setIsReady(true);
        }
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Background Ambient Glow */}
      <View style={styles.glowAuraTop} />
      <View style={styles.glowAuraCenter} />

      {/* Top Telemetry Header */}
      <View style={styles.topStatusRow}>
        <View style={styles.onlineBadge}>
          <View style={styles.pingDot} />
          <Text style={styles.onlineText}>GOOGLE PLAY GAMES: BAĞLANDI ✓</Text>
        </View>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>v2.4.0 GRANDMASTER</Text>
        </View>
      </View>

      {/* Central Luxury Emblem & Sacred Geometry */}
      <View style={styles.emblemContainer}>
        {/* Outer Rotating Sacred Geometry Ring */}
        <Animated.View
          style={[
            styles.rotatingRing,
            { transform: [{ rotate: spin }] },
          ]}
        >
          <View style={styles.ringBorder} />
          <View style={styles.ringDiamondTop} />
          <View style={styles.ringDiamondRight} />
          <View style={styles.ringDiamondBottom} />
          <View style={styles.ringDiamondLeft} />
        </Animated.View>

        {/* Pulsing Golden Aura */}
        <Animated.View
          style={[
            styles.pulsingHalo,
            { transform: [{ scale: pulseAnim }] },
          ]}
        />

        {/* Lathed Obsidian Emblem Base */}
        <View style={styles.coinBase}>
          {/* Lathed Corner Accents */}
          <View style={[styles.cornerAccent, styles.cornerTL]} />
          <View style={[styles.cornerAccent, styles.cornerTR]} />
          <View style={[styles.cornerAccent, styles.cornerBL]} />
          <View style={[styles.cornerAccent, styles.cornerBR]} />

          {/* Luxury Crown / Knight Icon Logo */}
          <Image
            source={require('../../assets/icon.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Typographic Title */}
        <View style={styles.titleWrapper}>
          <View style={styles.brandSubtitleRow}>
            <View style={styles.goldLine} />
            <Text style={styles.brandSubtitle}>SOVEREIGN PARLOR</Text>
            <View style={styles.goldLine} />
          </View>
          <Text style={styles.brandTitle}>CHESS</Text>
          <Text style={styles.brandTagline}>MIND BOARD UNIVERSE</Text>
        </View>
      </View>

      {/* Loading Progress Gauge */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View style={styles.statusRow}>
            <Text style={styles.brainIcon}>⚙️</Text>
            <Text numberOfLines={1} style={styles.statusText}>
              {PHRASES[phraseIndex]}
            </Text>
          </View>
          <Text style={styles.progressPercent}>{progress}%</Text>
        </View>

        {/* Dual-layer Progress Track */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        {/* Telemetry Sub-indicators */}
        <View style={styles.telemetryRow}>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryIcon}>♟️</Text>
            <Text style={styles.telemetryLabel}>3x Tahta Modeli</Text>
          </View>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryIcon}>⚡</Text>
            <Text style={styles.telemetryLabel}>Stockfish NNUE v16</Text>
          </View>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryIcon}>✨</Text>
            <Text style={styles.telemetryLabel}>60 FPS Ultra</Text>
          </View>
        </View>
      </View>

      {/* Grandmaster Tactician Tip Card */}
      <View style={styles.adviceCard}>
        <View style={styles.adviceHeader}>
          <View style={styles.adviceTag}>
            <Text style={styles.adviceTagText}>BÜYÜKUSTA TAVSİYESİ</Text>
            <View style={styles.adviceDot} />
            <Text style={styles.adviceSubTag}>Taktik #42</Text>
          </View>
          <Text style={styles.starsText}>★★★</Text>
        </View>
        <Text style={styles.adviceContent}>
          “Merkez kareleri (e4, d4, e5, d5) piyonlarla kontrol etmek erken oyunda stratejik üstünlük ve hareket alanı sağlar.”
        </Text>
        <Text style={styles.authorText}>Grandmaster Demirkan • Elo 2840</Text>
      </View>

      {/* Launch / Entrance Button */}
      <TouchableOpacity
        style={[
          styles.launchButton,
          isReady && styles.launchButtonActive,
        ]}
        onPress={handleLaunch}
        activeOpacity={0.85}
      >
        <Text
          style={[
            styles.launchButtonText,
            isReady && styles.launchButtonTextActive,
          ]}
        >
          {isReady ? 'Arenaya Giriş Yap ➔' : 'Hazırlanıyor...'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  glowAuraTop: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    width: width * 0.9,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(242, 202, 80, 0.08)',
  },
  glowAuraCenter: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    width: width * 0.7,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(147, 215, 255, 0.04)',
  },
  topStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  pingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  onlineText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  versionBadge: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  versionText: {
    fontSize: 9,
    color: Colors.outline,
    fontWeight: '600',
  },
  emblemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  rotatingRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringBorder: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'rgba(242, 202, 80, 0.25)',
    borderStyle: 'dashed',
  },
  ringDiamondTop: {
    position: 'absolute',
    top: 0,
    width: 6,
    height: 6,
    backgroundColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  ringDiamondRight: {
    position: 'absolute',
    right: 0,
    width: 6,
    height: 6,
    backgroundColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  ringDiamondBottom: {
    position: 'absolute',
    bottom: 0,
    width: 6,
    height: 6,
    backgroundColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  ringDiamondLeft: {
    position: 'absolute',
    left: 0,
    width: 6,
    height: 6,
    backgroundColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  pulsingHalo: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(242, 202, 80, 0.12)',
  },
  coinBase: {
    width: 140,
    height: 140,
    borderRadius: 28,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(242, 202, 80, 0.45)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  cornerAccent: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderColor: Colors.primary,
  },
  cornerTL: { top: 4, left: 4, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerTR: { top: 4, right: 4, borderTopWidth: 2, borderRightWidth: 2 },
  cornerBL: { bottom: 4, left: 4, borderBottomWidth: 2, borderLeftWidth: 2 },
  cornerBR: { bottom: 4, right: 4, borderBottomWidth: 2, borderRightWidth: 2 },
  logoImage: {
    width: 100,
    height: 100,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 18,
  },
  brandSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  goldLine: {
    width: 24,
    height: 1,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 3,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.onSurface,
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    letterSpacing: 2.5,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  brainIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
  },
  telemetryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  telemetryIcon: {
    fontSize: 11,
  },
  telemetryLabel: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
  adviceCard: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  adviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  adviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  adviceTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  adviceDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.outline,
  },
  adviceSubTag: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  starsText: {
    fontSize: 10,
    color: Colors.primary,
  },
  adviceContent: {
    fontSize: 12,
    color: Colors.onSurface,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  authorText: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 6,
    fontWeight: '600',
  },
  launchButton: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  launchButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  launchButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.outline,
  },
  launchButtonTextActive: {
    color: Colors.onPrimary,
  },
});

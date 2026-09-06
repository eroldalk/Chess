import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface StageBannerProps {
  stage?: string;
  category?: string;
  title?: string;
  stars?: number;
  maxStars?: number;
}

export const StageBanner: React.FC<StageBannerProps> = ({
  stage = 'AŞAMA 08',
  category = 'Taktik Sınavı',
  title = 'Büyük Usta Düellosu',
  stars = 2,
  maxStars = 3,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.blurCircle} />
      <View style={styles.contentRow}>
        <View style={styles.leftCol}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>🏆</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.stageText}>{stage}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
          </View>
        </View>

        <View style={styles.starPill}>
          {Array.from({ length: maxStars }).map((_, idx) => (
            <Text
              key={idx}
              style={[
                styles.star,
                { color: idx < stars ? Colors.primary : Colors.surfaceContainerHighest },
              ]}
            >
              ★
            </Text>
          ))}
          <Text style={styles.starRatioText}>
            {stars}/{maxStars}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 6,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  blurCircle: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(242, 202, 80, 0.08)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dot: {
    fontSize: 10,
    color: Colors.outline,
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
    marginTop: 1,
  },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  star: {
    fontSize: 13,
    marginRight: 2,
  },
  starRatioText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 4,
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieceColor, PieceType, Square } from '../types/chess';
import { Colors } from '../theme/colors';
import { ChessPiece } from './ChessPiece';

interface ChessSquareProps {
  square: Square;
  isLight: boolean;
  piece: { type: PieceType; color: PieceColor } | null;
  isSelected: boolean;
  isLegalTarget: boolean;
  isLastMove: boolean;
  isInCheck: boolean;
  isHintTarget: boolean;
  size: number;
  showFileLabel?: boolean;
  showRankLabel?: boolean;
  onPress: (square: Square) => void;
}

export const ChessSquare: React.FC<ChessSquareProps> = ({
  square,
  isLight,
  piece,
  isSelected,
  isLegalTarget,
  isLastMove,
  isInCheck,
  isHintTarget,
  size,
  showFileLabel,
  showRankLabel,
  onPress,
}) => {
  const file = square[0];
  const rank = square[1];

  let backgroundColor = isLight ? Colors.lightSquare : Colors.darkSquare;
  if (isSelected) {
    backgroundColor = Colors.selectedSquare;
  } else if (isInCheck) {
    backgroundColor = Colors.checkSquare;
  } else if (isLastMove) {
    backgroundColor = Colors.lastMoveSquare;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(square)}
      style={[
        styles.square,
        {
          width: size,
          height: size,
          backgroundColor,
        },
        isSelected && styles.selectedBorder,
        isHintTarget && styles.hintBorder,
      ]}
    >
      {/* Rank Label (1-8) at top-left */}
      {showRankLabel && (
        <Text style={[styles.coordinateLabel, styles.rankLabel]}>
          {rank}
        </Text>
      )}

      {/* File Label (a-h) at bottom-right */}
      {showFileLabel && (
        <Text style={[styles.coordinateLabel, styles.fileLabel]}>
          {file}
        </Text>
      )}

      {/* Hint Target Pulsing Indicator */}
      {isHintTarget && (
        <View style={[styles.hintIndicator, { width: size * 0.7, height: size * 0.7 }]} />
      )}

      {/* Piece */}
      {piece && <ChessPiece type={piece.type} color={piece.color} size={size * 0.86} />}

      {/* Legal Move Dot or Capture Ring */}
      {isLegalTarget && !piece && (
        <View
          style={[
            styles.legalMoveDot,
            { width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14 },
          ]}
        />
      )}

      {isLegalTarget && piece && (
        <View
          style={[
            styles.captureRing,
            {
              width: size * 0.88,
              height: size * 0.88,
              borderRadius: size * 0.44,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  hintBorder: {
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  coordinateLabel: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.outline,
    opacity: 0.55,
  },
  rankLabel: {
    top: 2,
    left: 2,
  },
  fileLabel: {
    bottom: 2,
    right: 2,
  },
  legalMoveDot: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    opacity: 0.65,
    zIndex: 1,
  },
  captureRing: {
    position: 'absolute',
    borderWidth: 2.5,
    borderColor: Colors.primary,
    opacity: 0.75,
    zIndex: 3,
  },
  hintIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 185, 95, 0.25)',
    zIndex: 1,
  },
});

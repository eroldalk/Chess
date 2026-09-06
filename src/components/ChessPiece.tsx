import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieceColor, PieceType } from '../types/chess';
import { Colors } from '../theme/colors';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  size?: number;
}

// Unicode symbols for chess pieces
const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  w: {
    k: '♔',
    q: '♕',
    r: '♖',
    b: '♗',
    n: '♘',
    p: '♙',
  },
  b: {
    k: '♚',
    q: '♛',
    r: '♜',
    b: '♝',
    n: '♞',
    p: '♟',
  },
};

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  size = 36,
}) => {
  const isWhite = color === 'w';
  const symbol = PIECE_SYMBOLS[color][type];

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text
        style={[
          styles.symbol,
          {
            fontSize: size * 0.82,
            color: isWhite ? Colors.primary : Colors.onSurface,
            textShadowColor: isWhite
              ? 'rgba(242, 202, 80, 0.45)'
              : 'rgba(0, 0, 0, 0.8)',
            textShadowOffset: { width: 0, height: isWhite ? 0 : 2 },
            textShadowRadius: isWhite ? 6 : 4,
          },
        ]}
      >
        {symbol}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  symbol: {
    fontWeight: '700',
    textAlign: 'center',
    userSelect: 'none',
  },
});

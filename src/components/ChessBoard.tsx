import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ChessPiece } from './ChessPiece';
import { ChessSquare } from './ChessSquare';
import { PieceColor, PieceType, Square } from '../types/chess';
import { Colors } from '../theme/colors';

interface ChessBoardProps {
  board: ({ type: PieceType; color: PieceColor } | null)[][];
  playerColor: PieceColor;
  selectedSquare: Square | null;
  legalMoves: Square[];
  lastMove: { from: Square; to: Square } | null;
  checkSquare: Square | null;
  hintTarget: Square | null;
  onSquarePress: (square: Square) => void;
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  playerColor,
  selectedSquare,
  legalMoves,
  lastMove,
  checkSquare,
  hintTarget,
  onSquarePress,
}) => {
  const { width } = useWindowDimensions();
  // Responsive board size calculation: max 420px, with padding
  const boardSize = Math.min(width - 32, 420);
  const squareSize = (boardSize - 16) / 8; // Accounting for 8px padding each side

  const files = playerColor === 'w' ? FILES : [...FILES].reverse();
  const ranks = playerColor === 'w' ? RANKS : [...RANKS].reverse();

  return (
    <View style={[styles.outerFrame, { width: boardSize, height: boardSize }]}>
      <View style={styles.innerFrame}>
        <View style={styles.grid}>
          {ranks.map((rank, rankIndex) => (
            <View key={rank} style={styles.row}>
              {files.map((file, fileIndex) => {
                const square = `${file}${rank}` as Square;
                const isLight = (file.charCodeAt(0) - 'a'.charCodeAt(0) + parseInt(rank, 10)) % 2 !== 0;

                // Lookup piece from board array:
                // When playerColor === 'w', rankIndex 0 is rank 8 (row 0 in board), fileIndex 0 is file a (col 0)
                const boardRow = playerColor === 'w' ? rankIndex : 7 - rankIndex;
                const boardCol = playerColor === 'w' ? fileIndex : 7 - fileIndex;
                const piece = board[boardRow] ? board[boardRow][boardCol] : null;

                const isSelected = selectedSquare === square;
                const isLegalTarget = legalMoves.includes(square);
                const isLast = lastMove?.from === square || lastMove?.to === square;
                const isInCheck = checkSquare === square;
                const isHint = hintTarget === square;

                return (
                  <ChessSquare
                    key={square}
                    square={square}
                    isLight={isLight}
                    piece={piece}
                    isSelected={isSelected}
                    isLegalTarget={isLegalTarget}
                    isLastMove={isLast}
                    isInCheck={isInCheck}
                    isHintTarget={isHint}
                    size={squareSize}
                    showRankLabel={fileIndex === 0}
                    showFileLabel={rankIndex === 7}
                    onPress={onSquarePress}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerFrame: {
    backgroundColor: Colors.boardFrame,
    borderRadius: 14,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: Colors.boardBorder,
    alignSelf: 'center',
    marginVertical: 6,
  },
  innerFrame: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  grid: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

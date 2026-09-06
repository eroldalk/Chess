import { Chess, Move, Square } from 'chess.js';
import { AIDifficulty, PieceColor } from '../types/chess';

// Piece base values (centipawns)
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece-Square Tables (from White's perspective; inverted for Black)
const PAWN_TABLE = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0,
];

const KNIGHT_TABLE = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

const BISHOP_TABLE = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
];

const ROOK_TABLE = [
    0,  0,  0,  0,  0,  0,  0,  0,
    5, 10, 10, 10, 10, 10, 10,  5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
    0,  0,  0,  5,  5,  0,  0,  0
];

const QUEEN_TABLE = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
];

const KING_TABLE_MIDDLE = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20
];

function getSquareIndex(square: Square): number {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = 8 - parseInt(square[1], 10);
  return rank * 8 + file;
}

function evaluatePosition(game: Chess): number {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -99999 : 99999;
  }
  if (game.isDraw()) {
    return 0;
  }

  let score = 0;
  const board = game.board();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const baseVal = PIECE_VALUES[piece.type] || 0;
      let posVal = 0;
      const idx = piece.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;

      switch (piece.type) {
        case 'p':
          posVal = PAWN_TABLE[idx] || 0;
          break;
        case 'n':
          posVal = KNIGHT_TABLE[idx] || 0;
          break;
        case 'b':
          posVal = BISHOP_TABLE[idx] || 0;
          break;
        case 'r':
          posVal = ROOK_TABLE[idx] || 0;
          break;
        case 'q':
          posVal = QUEEN_TABLE[idx] || 0;
          break;
        case 'k':
          posVal = KING_TABLE_MIDDLE[idx] || 0;
          break;
      }

      const totalVal = baseVal + posVal;
      if (piece.color === 'w') {
        score += totalVal;
      } else {
        score -= totalVal;
      }
    }
  }

  return score;
}

// Alpha-Beta Minimax search
function alphaBeta(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluatePosition(game);
  }

  const moves = game.moves({ verbose: true });
  // Move ordering: prioritizes captures for faster cutoffs
  moves.sort((a, b) => {
    const valA = a.captured ? PIECE_VALUES[a.captured] * 10 - PIECE_VALUES[a.piece] : 0;
    const valB = b.captured ? PIECE_VALUES[b.captured] * 10 - PIECE_VALUES[b.piece] : 0;
    return valB - valA;
  });

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const ev = alphaBeta(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, ev);
      alpha = Math.max(alpha, ev);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const ev = alphaBeta(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, ev);
      beta = Math.min(beta, ev);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Calculates the best move for the specified AI difficulty level.
 */
export function getAIMove(
  game: Chess,
  difficulty: AIDifficulty
): Move | null {
  const legalMoves = game.moves({ verbose: true });
  if (legalMoves.length === 0) return null;

  const isWhite = game.turn() === 'w';

  // 1. Easy level (Acemi ~800 Elo)
  if (difficulty === 'easy') {
    // 30% chance to make a completely random legal move
    if (Math.random() < 0.3) {
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }
    // Otherwise, evaluate at depth 1 with slight noise
    let bestMove = legalMoves[0];
    let bestScore = isWhite ? -Infinity : Infinity;

    for (const move of legalMoves) {
      game.move(move);
      let score = evaluatePosition(game) + (Math.random() * 40 - 20);
      game.undo();

      if (isWhite ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // 2. Medium level (Kulüp ~1400 Elo) -> Depth 2
  if (difficulty === 'medium') {
    let bestMove = legalMoves[0];
    let bestScore = isWhite ? -Infinity : Infinity;

    for (const move of legalMoves) {
      game.move(move);
      const score = alphaBeta(game, 1, -Infinity, Infinity, !isWhite);
      game.undo();

      if (isWhite ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // 3. Master level (Usta ~1850+ Elo) -> Depth 3
  let bestMove = legalMoves[0];
  let bestScore = isWhite ? -Infinity : Infinity;

  // Shuffle slightly so games don't always play the exact same opening line
  const shuffled = [...legalMoves].sort(() => Math.random() - 0.5);
  // Sort captures first
  shuffled.sort((a, b) => (b.captured ? 10 : 0) - (a.captured ? 10 : 0));

  for (const move of shuffled) {
    game.move(move);
    const score = alphaBeta(game, 2, -Infinity, Infinity, !isWhite);
    game.undo();

    if (isWhite ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

/**
 * Returns the best move hint for the current turn.
 */
export function getBestMoveHint(game: Chess): { move: Move; explanation: string } | null {
  const legalMoves = game.moves({ verbose: true });
  if (legalMoves.length === 0) return null;

  const isWhite = game.turn() === 'w';
  let bestMove = legalMoves[0];
  let bestScore = isWhite ? -Infinity : Infinity;

  for (const move of legalMoves) {
    game.move(move);
    const score = alphaBeta(game, 2, -Infinity, Infinity, !isWhite);
    game.undo();

    if (isWhite ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  let explanation = `${bestMove.piece.toUpperCase()} taşını ${bestMove.to} karesine oyna`;
  if (bestMove.captured) {
    explanation = `${bestMove.to} karesindeki ${bestMove.captured.toUpperCase()} taşını al!`;
  } else if (bestMove.san.includes('+')) {
    explanation = `Şah çek: ${bestMove.san}!`;
  } else if (bestMove.san.includes('#')) {
    explanation = `Mat hamlesi: ${bestMove.san}!`;
  }

  return { move: bestMove, explanation };
}

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

// Opening book common responses (SAN or from/to)
const OPENING_BOOK_WHITE: { from: Square; to: Square }[] = [
  { from: 'e2', to: 'e4' }, // King's Pawn
  { from: 'd2', to: 'd4' }, // Queen's Pawn
  { from: 'g1', to: 'f3' }, // Zukertort / Réti
  { from: 'c2', to: 'c4' }, // English Opening
];

const OPENING_BOOK_BLACK_VS_E4: { from: Square; to: Square }[] = [
  { from: 'e7', to: 'e5' }, // Open Game
  { from: 'c7', to: 'c5' }, // Sicilian Defense
  { from: 'e7', to: 'e6' }, // French Defense
  { from: 'c7', to: 'c6' }, // Caro-Kann
];

const OPENING_BOOK_BLACK_VS_D4: { from: Square; to: Square }[] = [
  { from: 'd7', to: 'd5' }, // Closed Game
  { from: 'g8', to: 'f6' }, // Indian Defenses
  { from: 'e7', to: 'e6' }, // Nimzo / Queen's Gambit Declined prep
];

// Piece-Square Tables (White perspective; inverted for Black)
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

      // Small center control bonus (d4, e4, d5, e5)
      const isCenterSquare = (r === 3 || r === 4) && (c === 3 || c === 4);
      const centerBonus = isCenterSquare ? 15 : 0;

      const totalVal = baseVal + posVal + centerBonus;
      if (piece.color === 'w') {
        score += totalVal;
      } else {
        score -= totalVal;
      }
    }
  }

  return score;
}

// Alpha-Beta Minimax search with move ordering
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
  if (moves.length === 0) {
    return evaluatePosition(game);
  }

  // Move ordering: checks first, then high-value captures
  moves.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.san.includes('#')) scoreA += 10000;
    if (b.san.includes('#')) scoreB += 10000;
    if (a.san.includes('+')) scoreA += 500;
    if (b.san.includes('+')) scoreB += 500;
    if (a.captured) scoreA += PIECE_VALUES[a.captured] * 10 - PIECE_VALUES[a.piece];
    if (b.captured) scoreB += PIECE_VALUES[b.captured] * 10 - PIECE_VALUES[b.piece];
    return scoreB - scoreA;
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
 * Calculates the best move for the AI, supporting both White and Black play.
 */
export function getAIMove(
  game: Chess,
  difficulty: AIDifficulty
): Move | null {
  const legalMoves = game.moves({ verbose: true });
  if (legalMoves.length === 0) return null;

  const isWhite = game.turn() === 'w';
  const history = game.history();

  // 1. Check for immediate winning checkmate in 1 move
  for (const move of legalMoves) {
    if (move.san.includes('#')) {
      return move;
    }
  }

  // 2. Opening Book on Move 1
  if (history.length === 0 && isWhite) {
    // AI is White on Move 1: pick a sound opening
    const bookChoice = OPENING_BOOK_WHITE[Math.floor(Math.random() * OPENING_BOOK_WHITE.length)];
    const matchingMove = legalMoves.find(
      (m) => m.from === bookChoice.from && m.to === bookChoice.to
    );
    if (matchingMove) return matchingMove;
  } else if (history.length === 1 && !isWhite) {
    // AI is Black responding to White's first move
    const firstMove = history[0];
    let bookChoices = OPENING_BOOK_BLACK_VS_E4;
    if (firstMove.startsWith('d') || firstMove === 'd4') {
      bookChoices = OPENING_BOOK_BLACK_VS_D4;
    }
    const bookChoice = bookChoices[Math.floor(Math.random() * bookChoices.length)];
    const matchingMove = legalMoves.find(
      (m) => m.from === bookChoice.from && m.to === bookChoice.to
    );
    if (matchingMove) return matchingMove;
  }

  // 3. Difficulty: Easy (Acemi ~800 Elo)
  if (difficulty === 'easy') {
    // 25% chance of random legal move
    if (Math.random() < 0.25) {
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }
    let bestMove = legalMoves[0];
    let bestScore = isWhite ? -Infinity : Infinity;

    for (const move of legalMoves) {
      game.move(move);
      let score = evaluatePosition(game) + (Math.random() * 50 - 25);
      game.undo();

      if (isWhite ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // 4. Difficulty: Medium (Kulüp ~1400 Elo) -> Depth 2
  if (difficulty === 'medium') {
    let bestMove = legalMoves[0];
    let bestScore = isWhite ? -Infinity : Infinity;

    for (const move of legalMoves) {
      game.move(move);
      // Next turn is opponent's turn
      const score = alphaBeta(game, 1, -Infinity, Infinity, !isWhite);
      game.undo();

      if (isWhite ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // 5. Difficulty: Master (Büyük Usta ~1850+ Elo) -> Depth 3
  let bestMove = legalMoves[0];
  let bestScore = isWhite ? -Infinity : Infinity;

  // Move ordering
  const orderedMoves = [...legalMoves].sort((a, b) => {
    let sa = a.captured ? PIECE_VALUES[a.captured] * 10 - PIECE_VALUES[a.piece] : 0;
    let sb = b.captured ? PIECE_VALUES[b.captured] * 10 - PIECE_VALUES[b.piece] : 0;
    if (a.san.includes('+')) sa += 200;
    if (b.san.includes('+')) sb += 200;
    return sb - sa;
  });

  for (const move of orderedMoves) {
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
    if (move.san.includes('#')) {
      return {
        move,
        explanation: `Mat Hamlesi! ${move.san} ile oyunu kazan!`,
      };
    }

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
  } else if (bestMove.san === 'O-O' || bestMove.san === 'O-O-O') {
    explanation = `Rok yaparak şahını güvenceye al (${bestMove.san})`;
  }

  return { move: bestMove, explanation };
}

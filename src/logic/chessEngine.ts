import { Chess, Square, PieceSymbol, Color } from 'chess.js';
import { CapturedPieces, GameStatus, MoveRecord, PieceColor, PieceType } from '../types/chess';

export class ChessGameEngine {
  private chess: Chess;

  constructor(fen?: string) {
    this.chess = new Chess(fen);
  }

  public getChessInstance(): Chess {
    return this.chess;
  }

  public reset(): void {
    this.chess.reset();
  }

  public load(fen: string): boolean {
    try {
      this.chess.load(fen);
      return true;
    } catch {
      return false;
    }
  }

  public getTurn(): PieceColor {
    return this.chess.turn();
  }

  public isCheck(): boolean {
    return this.chess.inCheck();
  }

  public getStatus(): GameStatus {
    if (this.chess.isCheckmate()) return 'checkmate';
    if (this.chess.isStalemate()) return 'stalemate';
    if (this.chess.isThreefoldRepetition()) return 'draw_repetition';
    if (this.chess.isInsufficientMaterial()) return 'draw_insufficient_material';
    if (this.chess.isDraw()) return 'draw_50_moves';
    return 'active';
  }

  public getBoard() {
    return this.chess.board();
  }

  public getFen(): string {
    return this.chess.fen();
  }

  public getLegalMovesForSquare(square: Square): Square[] {
    const moves = this.chess.moves({ square, verbose: true });
    return moves.map((m) => m.to as Square);
  }

  public makeMove(from: Square, to: Square, promotion: PieceType = 'q'): MoveRecord | null {
    try {
      const move = this.chess.move({
        from,
        to,
        promotion,
      });

      if (!move) return null;

      return {
        from: move.from as Square,
        to: move.to as Square,
        san: move.san,
        piece: move.piece as PieceType,
        color: move.color as PieceColor,
        captured: move.captured ? (move.captured as PieceType) : undefined,
        promotion: move.promotion ? (move.promotion as PieceType) : undefined,
      };
    } catch (e) {
      return null;
    }
  }

  public undo(): boolean {
    const undone = this.chess.undo();
    return !!undone;
  }

  public getHistory(): string[] {
    return this.chess.history();
  }

  public getLastMove(): { from: Square; to: Square } | null {
    const history = this.chess.history({ verbose: true });
    if (history.length === 0) return null;
    const last = history[history.length - 1];
    return { from: last.from as Square, to: last.to as Square };
  }

  /**
   * Calculates captured pieces by comparing initial inventory with current board pieces.
   */
  public getCapturedPieces(): CapturedPieces {
    const startingInventory: Record<PieceColor, Record<PieceSymbol, number>> = {
      w: { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 },
      b: { p: 8, n: 2, b: 2, r: 2, q: 1, k: 1 },
    };

    const currentInventory: Record<PieceColor, Record<PieceSymbol, number>> = {
      w: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
      b: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
    };

    const board = this.chess.board();
    for (const row of board) {
      for (const piece of row) {
        if (piece) {
          currentInventory[piece.color][piece.type]++;
        }
      }
    }

    const capturedByWhite: PieceType[] = [];
    const capturedByBlack: PieceType[] = [];

    const pieceOrder: PieceSymbol[] = ['q', 'r', 'b', 'n', 'p'];

    for (const p of pieceOrder) {
      // Black pieces captured by White:
      const blackLost = startingInventory.b[p] - currentInventory.b[p];
      for (let i = 0; i < blackLost; i++) {
        capturedByWhite.push(p as PieceType);
      }
      // White pieces captured by Black:
      const whiteLost = startingInventory.w[p] - currentInventory.w[p];
      for (let i = 0; i < whiteLost; i++) {
        capturedByBlack.push(p as PieceType);
      }
    }

    return {
      w: capturedByWhite,
      b: capturedByBlack,
    };
  }
}

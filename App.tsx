import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { ChessGameEngine } from './src/logic/chessEngine';
import { getAIMove, getBestMoveHint } from './src/logic/chessAI';
import { Colors } from './src/theme/colors';
import {
  AIDifficulty,
  CapturedPieces,
  GameSettings,
  GameStatus,
  PieceColor,
  PieceType,
  Square,
} from './src/types/chess';
import { HeaderBar } from './src/components/HeaderBar';
import { StageBanner } from './src/components/StageBanner';
import { OpponentHeader } from './src/components/OpponentHeader';
import { ChessBoard } from './src/components/ChessBoard';
import { PlayerHUD } from './src/components/PlayerHUD';
import { ActionControls } from './src/components/ActionControls';
import { TacticalAlert } from './src/components/TacticalAlert';
import { NotationBar } from './src/components/NotationBar';
import { PromotionModal } from './src/components/PromotionModal';
import { GameOverModal } from './src/components/GameOverModal';
import { SettingsModal } from './src/components/SettingsModal';
import { HistoryModal } from './src/components/HistoryModal';

const INITIAL_TIME_SECONDS = 600; // 10 minutes rapid

const AI_PROFILES: Record<AIDifficulty, { name: string; rating: number; icon: string }> = {
  easy: { name: 'Acemi Bot', rating: 800, icon: '🌱' },
  medium: { name: 'Kulüp Ustası', rating: 1400, icon: '⚡' },
  master: { name: 'Stockfish Magnus v16', rating: 1850, icon: '👑' },
};

export default function App() {
  const engineRef = useRef(new ChessGameEngine());
  const engine = engineRef.current;

  // Settings State
  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'master',
    playerColor: 'w',
    soundEnabled: true,
    hapticEnabled: true,
    showLegalMoves: true,
  });

  // Board & Game State
  const [board, setBoard] = useState(engine.getBoard());
  const [turn, setTurn] = useState<PieceColor>(engine.getTurn());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [checkSquare, setCheckSquare] = useState<Square | null>(null);
  const [hintTarget, setHintTarget] = useState<Square | null>(null);
  const [capturedPieces, setCapturedPieces] = useState<CapturedPieces>({ w: [], b: [] });
  const [history, setHistory] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('active');
  const [winner, setWinner] = useState<PieceColor | null>(null);
  const [undoCount, setUndoCount] = useState<number>(0);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Clocks
  const [whiteTime, setWhiteTime] = useState<number>(INITIAL_TIME_SECONDS);
  const [blackTime, setBlackTime] = useState<number>(INITIAL_TIME_SECONDS);

  // Modals & UI alerts
  const [tacticalAlert, setTacticalAlert] = useState<{
    message: string;
    subBadge?: string;
    isWarning?: boolean;
  } | null>({
    message: 'Maç Başladı: Şah Mat için en iyi hamleni yap!',
    subBadge: 'CANLI',
  });
  const [promotionPending, setPromotionPending] = useState<{
    from: Square;
    to: Square;
  } | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  // Helper to format seconds as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Locate the King's square when in check
  const updateCheckState = useCallback(() => {
    if (engine.isCheck()) {
      const currentBoard = engine.getBoard();
      const currentTurn = engine.getTurn();
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const p = currentBoard[r][c];
          if (p && p.type === 'k' && p.color === currentTurn) {
            const f = String.fromCharCode('a'.charCodeAt(0) + c);
            const rk = (8 - r).toString();
            setCheckSquare(`${f}${rk}` as Square);
            return;
          }
        }
      }
    } else {
      setCheckSquare(null);
    }
  }, [engine]);

  // Refresh Board and UI state after move
  const syncGameState = useCallback(() => {
    setBoard(engine.getBoard());
    const currentTurn = engine.getTurn();
    setTurn(currentTurn);
    setLastMove(engine.getLastMove());
    setCapturedPieces(engine.getCapturedPieces());
    setHistory(engine.getHistory());
    updateCheckState();

    const status = engine.getStatus();
    setGameStatus(status);

    if (status === 'checkmate') {
      const gameWinner = currentTurn === 'w' ? 'b' : 'w';
      setWinner(gameWinner);
      setShowGameOver(true);
      setTacticalAlert({
        message: 'ŞAH MAT! Oyun bitti.',
        subBadge: 'MAT',
        isWarning: true,
      });
    } else if (status !== 'active') {
      setShowGameOver(true);
      setTacticalAlert({
        message: 'Beraberlik sağlandı.',
        subBadge: 'BERABERE',
      });
    } else if (engine.isCheck()) {
      setTacticalAlert({
        message: currentTurn === settings.playerColor ? 'Dikkat: Şah altındasın!' : 'Şah çekildi!',
        subBadge: 'ŞAH',
        isWarning: true,
      });
    }
  }, [engine, settings.playerColor, updateCheckState]);

  // Timer interval
  useEffect(() => {
    if (gameStatus !== 'active') return;

    const timer = setInterval(() => {
      if (turn === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameStatus('resigned');
            setWinner('b');
            setShowGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameStatus('resigned');
            setWinner('w');
            setShowGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, gameStatus]);

  // AI Turn Trigger
  useEffect(() => {
    const isAiTurn = turn !== settings.playerColor;
    if (isAiTurn && gameStatus === 'active' && !isAiThinking) {
      setIsAiThinking(true);

      // Human-like pause for calculation
      const delay = settings.difficulty === 'master' ? 600 : 350;
      const timeout = setTimeout(() => {
        const aiMove = getAIMove(engine.getChessInstance(), settings.difficulty);
        if (aiMove) {
          engine.makeMove(
            aiMove.from as Square,
            aiMove.to as Square,
            (aiMove.promotion as PieceType) || 'q'
          );
          syncGameState();
        }
        setIsAiThinking(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [turn, settings.playerColor, settings.difficulty, gameStatus, isAiThinking, engine, syncGameState]);

  // Handle Square Selection and Moves
  const handleSquarePress = (square: Square) => {
    // If game is over or AI is thinking, ignore presses
    if (gameStatus !== 'active' || isAiThinking || turn !== settings.playerColor) {
      return;
    }

    const currentBoard = engine.getBoard();
    const rank = parseInt(square[1], 10);
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - rank;
    const piece = currentBoard[row] ? currentBoard[row][file] : null;

    // Clear previous hint target when player acts
    if (hintTarget) setHintTarget(null);

    // 1. If clicking on own piece, select it
    if (piece && piece.color === settings.playerColor) {
      setSelectedSquare(square);
      const targets = settings.showLegalMoves ? engine.getLegalMovesForSquare(square) : [];
      setLegalMoves(targets);
      return;
    }

    // 2. If already selected a square and clicking a legal target
    if (selectedSquare) {
      const isLegal = legalMoves.includes(square);
      if (isLegal) {
        // Check for Pawn Promotion (White reaches rank 8, Black reaches rank 1)
        const selectedFile = selectedSquare.charCodeAt(0) - 'a'.charCodeAt(0);
        const selectedRow = 8 - parseInt(selectedSquare[1], 10);
        const movingPiece = currentBoard[selectedRow][selectedFile];

        if (
          movingPiece?.type === 'p' &&
          ((settings.playerColor === 'w' && square[1] === '8') ||
            (settings.playerColor === 'b' && square[1] === '1'))
        ) {
          setPromotionPending({ from: selectedSquare, to: square });
          return;
        }

        // Execute Move
        const moveResult = engine.makeMove(selectedSquare, square);
        if (moveResult) {
          setSelectedSquare(null);
          setLegalMoves([]);
          syncGameState();
        }
      } else {
        // Deselect if clicking invalid square
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  };

  // Handle Promotion Selection
  const handlePromotionSelect = (promotedType: PieceType) => {
    if (!promotionPending) return;
    const moveResult = engine.makeMove(promotionPending.from, promotionPending.to, promotedType);
    setPromotionPending(null);
    setSelectedSquare(null);
    setLegalMoves([]);
    if (moveResult) {
      syncGameState();
    }
  };

  // Undo Move (Undoes both AI and Player move)
  const handleUndo = () => {
    if (undoCount >= 3 || isAiThinking) return;

    // Undo AI move if it was AI's turn
    if (turn === settings.playerColor) {
      engine.undo(); // Undo AI's move
      engine.undo(); // Undo Player's move
    } else {
      engine.undo(); // Undo Player's move
    }

    setUndoCount((prev) => prev + 1);
    setSelectedSquare(null);
    setLegalMoves([]);
    setHintTarget(null);
    syncGameState();
    setTacticalAlert({
      message: 'Hamle geri alındı.',
      subBadge: `${3 - (undoCount + 1)}/3`,
    });
  };

  // Hint / Tactical Opportunity
  const handleHint = () => {
    if (isAiThinking || turn !== settings.playerColor) return;
    const hint = getBestMoveHint(engine.getChessInstance());
    if (hint) {
      setHintTarget(hint.move.to as Square);
      setSelectedSquare(hint.move.from as Square);
      setLegalMoves([hint.move.to as Square]);
      setTacticalAlert({
        message: `Taktik İpucu: ${hint.explanation}`,
        subBadge: hint.move.san,
      });
    }
  };

  // Resign
  const handleResign = () => {
    setGameStatus('resigned');
    setWinner(settings.playerColor === 'w' ? 'b' : 'w');
    setShowGameOver(true);
  };

  // Restart / New Game
  const handleNewGame = () => {
    engine.reset();
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
    setCheckSquare(null);
    setHintTarget(null);
    setUndoCount(0);
    setWhiteTime(INITIAL_TIME_SECONDS);
    setBlackTime(INITIAL_TIME_SECONDS);
    setIsAiThinking(false);
    setShowGameOver(false);
    syncGameState();
    setTacticalAlert({
      message: 'Yeni oyun başladı! Bol şanslar.',
      subBadge: 'YENİ',
    });
  };

  // Current active opponent info based on difficulty setting
  const aiProfile = AI_PROFILES[settings.difficulty];
  const isPlayerTurn = turn === settings.playerColor;

  const opponentCaptured = settings.playerColor === 'w' ? capturedPieces.b : capturedPieces.w;
  const playerCaptured = settings.playerColor === 'w' ? capturedPieces.w : capturedPieces.b;

  const opponentTime = settings.playerColor === 'w' ? blackTime : whiteTime;
  const playerTime = settings.playerColor === 'w' ? whiteTime : blackTime;

  const lastMoveText =
    history.length > 0
      ? `${history.length % 2 === 1 ? 'Beyaz' : 'Siyah'} ...${history[history.length - 1]}`
      : 'Henüz hamle yapılmadı';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Top App Header */}
      <HeaderBar
        title="Aktif Oyun Arenası"
        onSettingsPress={() => setShowSettings(true)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stage & Challenge Banner */}
        <StageBanner
          stage="AŞAMA 08"
          category="Taktik Sınavı"
          title="Büyük Usta Düellosu"
          stars={2}
          maxStars={3}
        />

        {/* AI Opponent Header */}
        <OpponentHeader
          name={aiProfile.name}
          rating={aiProfile.rating}
          avatarIcon={aiProfile.icon}
          isTurn={!isPlayerTurn && gameStatus === 'active'}
          capturedPieces={opponentCaptured}
          timeFormatted={formatTime(opponentTime)}
        />

        {/* Tactical Notification Banner */}
        {tacticalAlert && (
          <TacticalAlert
            message={tacticalAlert.message}
            subBadge={tacticalAlert.subBadge}
            isWarning={tacticalAlert.isWarning}
          />
        )}

        {/* 8x8 Interactive Chessboard Container */}
        <ChessBoard
          board={board}
          playerColor={settings.playerColor}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          lastMove={lastMove}
          checkSquare={checkSquare}
          hintTarget={hintTarget}
          onSquarePress={handleSquarePress}
        />

        {/* Player HUD Panel */}
        <PlayerHUD
          name="Usta Adayı"
          rating={1450}
          playerColor={settings.playerColor}
          isTurn={isPlayerTurn && gameStatus === 'active'}
          timeFormatted={formatTime(playerTime)}
          hapticEnabled={settings.hapticEnabled}
        />

        {/* Tactical Action Controls (Geri Al, İpucu, Ayarlar, Pes Et, Yeni Oyun) */}
        <ActionControls
          onUndo={handleUndo}
          onHint={handleHint}
          onSettings={() => setShowSettings(true)}
          onResign={handleResign}
          onNewGame={handleNewGame}
          undoCount={undoCount}
          hintActive={!!hintTarget}
          disabled={gameStatus !== 'active' || isAiThinking}
        />

        {/* Bottom Notation Strip */}
        <NotationBar
          lastMoveText={lastMoveText}
          onPressHistory={() => setShowHistory(true)}
        />
      </ScrollView>

      {/* Pawn Promotion Modal */}
      <PromotionModal
        visible={!!promotionPending}
        color={settings.playerColor}
        onSelect={handlePromotionSelect}
      />

      {/* Game Over Result Modal */}
      <GameOverModal
        visible={showGameOver}
        status={gameStatus}
        winner={winner}
        playerColor={settings.playerColor}
        moveCount={history.length}
        onRestart={handleNewGame}
        onClose={() => setShowGameOver(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettings}
        settings={settings}
        onUpdateSettings={(newVals) => {
          setSettings((prev) => ({ ...prev, ...newVals }));
        }}
        onClose={() => setShowSettings(false)}
      />

      {/* Notation & History Modal */}
      <HistoryModal
        visible={showHistory}
        history={history}
        onClose={() => setShowHistory(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  StatusBar,
} from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Game constants
const PADDLE_W = 80;
const PADDLE_H = 12;
const BALL_SIZE = 16;
const PADDLE_Y_OFFSET = 60;
const AI_SPEED = 3.5;
const INITIAL_BALL_SPEED = 5;
const MAX_SCORE = 7;

interface GameState {
  ballX: number;
  ballY: number;
  ballVX: number;
  ballVY: number;
  playerX: number;
  aiX: number;
  playerScore: number;
  aiScore: number;
  phase: 'playing' | 'scored' | 'gameover';
  scorer: 'player' | 'ai' | null;
  winner: 'player' | 'ai' | null;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function makeBall(toPlayer: boolean): { ballX: number; ballY: number; ballVX: number; ballVY: number } {
  const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
  const speed = INITIAL_BALL_SPEED;
  return {
    ballX: SCREEN_W / 2 - BALL_SIZE / 2,
    ballY: SCREEN_H / 2 - BALL_SIZE / 2,
    ballVX: speed * Math.sin(angle),
    ballVY: toPlayer ? speed * Math.cos(angle) : -speed * Math.cos(angle),
  };
}

function initialState(): GameState {
  return {
    ...makeBall(true),
    playerX: SCREEN_W / 2 - PADDLE_W / 2,
    aiX: SCREEN_W / 2 - PADDLE_W / 2,
    playerScore: 0,
    aiScore: 0,
    phase: 'playing',
    scorer: null,
    winner: null,
  };
}

export default function App() {
  const stateRef = useRef<GameState>(initialState());
  const [renderTick, setRenderTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const touchXRef = useRef<number | null>(null);

  const forceRender = useCallback(() => setRenderTick((t) => t + 1), []);

  const resetRound = useCallback((scorer: 'player' | 'ai') => {
    const s = stateRef.current;
    const ball = makeBall(scorer === 'ai'); // serve toward the one who lost the point
    stateRef.current = {
      ...s,
      ...ball,
      phase: 'playing',
      scorer: null,
    };
  }, []);

  // Game loop
  const tick = useCallback(() => {
    const s = stateRef.current;
    if (s.phase !== 'playing') return;

    let { ballX, ballY, ballVX, ballVY, playerX, aiX } = s;

    // Move player paddle toward touch
    if (touchXRef.current !== null) {
      const target = touchXRef.current - PADDLE_W / 2;
      playerX = clamp(target, 0, SCREEN_W - PADDLE_W);
    }

    // AI paddle follows ball
    const aiCenter = aiX + PADDLE_W / 2;
    if (ballX + BALL_SIZE / 2 > aiCenter) {
      aiX = Math.min(aiX + AI_SPEED, SCREEN_W - PADDLE_W);
    } else {
      aiX = Math.max(aiX - AI_SPEED, 0);
    }

    // Move ball
    ballX += ballVX;
    ballY += ballVY;

    // Wall bounce left/right
    if (ballX <= 0) {
      ballX = 0;
      ballVX = Math.abs(ballVX);
    } else if (ballX + BALL_SIZE >= SCREEN_W) {
      ballX = SCREEN_W - BALL_SIZE;
      ballVX = -Math.abs(ballVX);
    }

    // Player paddle collision (bottom)
    const playerPaddleY = SCREEN_H - PADDLE_Y_OFFSET - PADDLE_H;
    if (
      ballVY > 0 &&
      ballY + BALL_SIZE >= playerPaddleY &&
      ballY + BALL_SIZE <= playerPaddleY + PADDLE_H + Math.abs(ballVY) &&
      ballX + BALL_SIZE >= playerX &&
      ballX <= playerX + PADDLE_W
    ) {
      const hitPos = (ballX + BALL_SIZE / 2 - playerX) / PADDLE_W; // 0..1
      const angle = (hitPos - 0.5) * 120 * (Math.PI / 180);
      const speed = Math.sqrt(ballVX * ballVX + ballVY * ballVY) + 0.3;
      ballVX = speed * Math.sin(angle);
      ballVY = -Math.abs(speed * Math.cos(angle));
      ballY = playerPaddleY - BALL_SIZE;
    }

    // AI paddle collision (top)
    const aiPaddleY = PADDLE_Y_OFFSET;
    if (
      ballVY < 0 &&
      ballY <= aiPaddleY + PADDLE_H &&
      ballY >= aiPaddleY - Math.abs(ballVY) &&
      ballX + BALL_SIZE >= aiX &&
      ballX <= aiX + PADDLE_W
    ) {
      const hitPos = (ballX + BALL_SIZE / 2 - aiX) / PADDLE_W;
      const angle = (hitPos - 0.5) * 120 * (Math.PI / 180);
      const speed = Math.sqrt(ballVX * ballVX + ballVY * ballVY) + 0.3;
      ballVX = speed * Math.sin(angle);
      ballVY = Math.abs(speed * Math.cos(angle));
      ballY = aiPaddleY + PADDLE_H;
    }

    // Score: ball goes past bottom → AI scores
    if (ballY > SCREEN_H) {
      const aiScore = s.aiScore + 1;
      if (aiScore >= MAX_SCORE) {
        stateRef.current = { ...s, ballX, ballY, phase: 'gameover', winner: 'ai', aiScore };
      } else {
        stateRef.current = { ...s, ballX, ballY, ballVX, ballVY, playerX, aiX, aiScore, phase: 'scored', scorer: 'ai' };
        setTimeout(() => { resetRound('ai'); forceRender(); }, 1200);
      }
      forceRender();
      return;
    }

    // Score: ball goes past top → Player scores
    if (ballY + BALL_SIZE < 0) {
      const playerScore = s.playerScore + 1;
      if (playerScore >= MAX_SCORE) {
        stateRef.current = { ...s, ballX, ballY, phase: 'gameover', winner: 'player', playerScore };
      } else {
        stateRef.current = { ...s, ballX, ballY, ballVX, ballVY, playerX, aiX, playerScore, phase: 'scored', scorer: 'player' };
        setTimeout(() => { resetRound('player'); forceRender(); }, 1200);
      }
      forceRender();
      return;
    }

    stateRef.current = { ...s, ballX, ballY, ballVX, ballVY, playerX, aiX };
    forceRender();
  }, [forceRender, resetRound]);

  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      tick();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        touchXRef.current = e.nativeEvent.pageX;
      },
      onPanResponderMove: (e) => {
        touchXRef.current = e.nativeEvent.pageX;
      },
      onPanResponderRelease: () => {
        touchXRef.current = null;
      },
      onPanResponderTerminate: () => {
        touchXRef.current = null;
      },
    })
  ).current;

  const handleRestart = () => {
    stateRef.current = initialState();
    forceRender();
  };

  const s = stateRef.current;
  const playerPaddleY = SCREEN_H - PADDLE_Y_OFFSET - PADDLE_H;
  const aiPaddleY = PADDLE_Y_OFFSET;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <StatusBar hidden />

      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>CPU: {s.aiScore}</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.scoreText}>DU: {s.playerScore}</Text>
      </View>

      {/* Center line */}
      <View style={styles.centerLine} />

      {/* AI Paddle */}
      <View
        style={[
          styles.paddle,
          styles.aiPaddle,
          { left: s.aiX, top: aiPaddleY },
        ]}
      />

      {/* Ball */}
      <View
        style={[
          styles.ball,
          { left: s.ballX, top: s.ballY },
        ]}
      />

      {/* Player Paddle */}
      <View
        style={[
          styles.paddle,
          styles.playerPaddle,
          { left: s.playerX, top: playerPaddleY },
        ]}
      />

      {/* Scored overlay */}
      {s.phase === 'scored' && (
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.overlayText}>
            {s.scorer === 'player' ? '✓ Punkt!' : '✗ Punkt für CPU'}
          </Text>
        </View>
      )}

      {/* Game Over overlay */}
      {s.phase === 'gameover' && (
        <View style={styles.overlay}>
          <Text style={styles.gameOverTitle}>
            {s.winner === 'player' ? '🏆 Du gewinnst!' : '😅 CPU gewinnt'}
          </Text>
          <Text style={styles.finalScore}>
            {s.playerScore} : {s.aiScore}
          </Text>
          <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
            <Text style={styles.restartText}>Nochmal spielen</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hint */}
      {s.phase === 'playing' && (
        <Text style={styles.hint}>Finger gedrückt halten & bewegen</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a2e',
  },
  scoreContainer: {
    position: 'absolute',
    top: SCREEN_H / 2 - 18,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    zIndex: 5,
  },
  scoreText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 18,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  divider: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: 18,
  },
  centerLine: {
    position: 'absolute',
    top: SCREEN_H / 2,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  paddle: {
    position: 'absolute',
    width: PADDLE_W,
    height: PADDLE_H,
    borderRadius: PADDLE_H / 2,
  },
  playerPaddle: {
    backgroundColor: '#4fc3f7',
    shadowColor: '#4fc3f7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  aiPaddle: {
    backgroundColor: '#ef5350',
    shadowColor: '#ef5350',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 10,
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  gameOverTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  finalScore: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 48,
    fontWeight: '300',
    marginBottom: 40,
    fontVariant: ['tabular-nums'],
  },
  restartBtn: {
    backgroundColor: '#4fc3f7',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  restartText: {
    color: '#0a0a2e',
    fontSize: 18,
    fontWeight: '700',
  },
  hint: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.2)',
    fontSize: 12,
  },
});

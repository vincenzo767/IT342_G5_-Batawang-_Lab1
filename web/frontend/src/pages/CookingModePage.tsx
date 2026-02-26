import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { recipeApi } from '../api';
import { ScaledRecipe, ActiveTimer } from '../types';
import { RootState } from '../store';
import { startTimer, pauseTimer, resumeTimer, updateTimerRemaining, completeTimer } from '../store/timerSlice';
import { nextStep, previousStep, setCurrentStepIndex } from '../store/uiSlice';
import './CookingModePage.css';

const CookingModePage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [scaledRecipe, setScaledRecipe] = useState<ScaledRecipe | null>(null);
  const [loading, setLoading] = useState(true);

  const currentStepIndex = useSelector((state: RootState) => state.ui.currentStepIndex);
  const activeTimers = useSelector((state: RootState) => state.timers.activeTimers);

  useEffect(() => {
    if (id) {
      const servings = parseInt(searchParams.get('servings') || '4');
      loadScaledRecipe(parseInt(id), servings);
    }
  }, [id, searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      activeTimers.forEach((timer) => {
        if (timer.state === 'RUNNING') {
          const elapsed = Math.floor((Date.now() - timer.startTime) / 1000);
          const remaining = Math.max(0, timer.durationSeconds - elapsed);

          dispatch(updateTimerRemaining({ stepId: timer.stepId, remaining }));

          if (remaining === 0) {
            dispatch(completeTimer(timer.stepId));
            playNotificationSound();
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimers, dispatch]);

  const loadScaledRecipe = async (recipeId: number, servings: number) => {
    try {
      const response = await recipeApi.getScaled(recipeId, servings);
      setScaledRecipe(response.data);
    } catch (error) {
      console.error('Failed to load scaled recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTimer = (stepId: number, durationSeconds: number, timerLabel: string) => {
    const timer: ActiveTimer = {
      stepId,
      timerLabel,
      durationSeconds,
      remainingSeconds: durationSeconds,
      state: 'RUNNING',
      startTime: Date.now(),
    };
    dispatch(startTimer(timer));
  };

  const handlePauseTimer = (stepId: number) => {
    dispatch(pauseTimer(stepId));
  };

  const handleResumeTimer = (stepId: number) => {
    dispatch(resumeTimer(stepId));
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => console.log('Could not play notification'));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading || !scaledRecipe) {
    return (
      <div className="cooking-mode-page">
        <div className="loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  const currentStep = scaledRecipe.scaledSteps[currentStepIndex];
  const isLastStep = currentStepIndex === scaledRecipe.scaledSteps.length - 1;
  const currentTimer = activeTimers.find((t) => t.stepId === currentStep?.stepId);

  return (
    <div className="cooking-mode-page">
      <div className="cooking-header">
        <h2>{scaledRecipe.recipeName}</h2>
        <div className="progress-indicator">
          Step {currentStepIndex + 1} of {scaledRecipe.scaledSteps.length}
        </div>
      </div>

      {/* Active Timers Display */}
      {activeTimers.length > 0 && (
        <div className="active-timers-bar">
          {activeTimers.map((timer) => (
            <div
              key={timer.stepId}
              className={`timer-chip ${timer.state.toLowerCase()}`}
            >
              <span>{timer.timerLabel}</span>
              <span className="timer-display">{formatTime(timer.remainingSeconds)}</span>
              {timer.state === 'COMPLETED' && <FaCheck />}
            </div>
          ))}
        </div>
      )}

      {/* Focus Mode - Current Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="step-focus-card"
        >
          <div className="step-number-large">{currentStep.orderIndex}</div>

          <div className="step-instruction-large">
            <p>{currentStep.instruction}</p>
          </div>

          {currentStep.hasTimer && currentStep.scaledTimerSeconds && (
            <div className="timer-control">
              {!currentTimer ? (
                <button
                  onClick={() =>
                    handleStartTimer(
                      currentStep.stepId,
                      currentStep.scaledTimerSeconds!,
                      currentStep.timerLabel || 'Timer'
                    )
                  }
                  className="btn btn-primary btn-large"
                >
                  <FaPlay />
                  Start Timer: {formatTime(currentStep.scaledTimerSeconds)}
                </button>
              ) : (
                <div className="timer-display-large">
                  <div className="timer-circle">
                    <svg viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#667eea"
                        strokeWidth="8"
                        strokeDasharray={`${
                          (currentTimer.remainingSeconds / currentTimer.durationSeconds) * 283
                        } 283`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="timer-text">{formatTime(currentTimer.remainingSeconds)}</div>
                  </div>

                  <div className="timer-controls">
                    {currentTimer.state === 'RUNNING' ? (
                      <button
                        onClick={() => handlePauseTimer(currentStep.stepId)}
                        className="btn btn-secondary"
                      >
                        <FaPause />
                        Pause
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResumeTimer(currentStep.stepId)}
                        className="btn btn-primary"
                      >
                        <FaPlay />
                        Resume
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep.tips && (
            <div className="step-tip-large">
              <span className="tip-icon">💡</span>
              <p>{currentStep.tips}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="step-navigation">
        <button
          onClick={() => dispatch(previousStep())}
          disabled={currentStepIndex === 0}
          className="btn btn-secondary"
        >
          <FaArrowLeft />
          Previous
        </button>

        <div className="step-dots">
          {scaledRecipe.scaledSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => dispatch(setCurrentStepIndex(index))}
              className={`step-dot ${index === currentStepIndex ? 'active' : ''} ${
                index < currentStepIndex ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        {!isLastStep ? (
          <button onClick={() => dispatch(nextStep())} className="btn btn-primary">
            Next
            <FaArrowRight />
          </button>
        ) : (
          <button className="btn btn-primary">
            <FaCheck />
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default CookingModePage;

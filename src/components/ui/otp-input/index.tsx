import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useMemo,
} from 'react';
import {
  AccessibilityInfo,
  AccessibilityRole,
  Animated,
  Clipboard,
  I18nManager,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  View,
} from 'react-native';
import { Button } from '../button';
import { styles } from './styles';

export interface OTPInputProps {
  // Core functionality
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;

  // Appearance
  disabled?: boolean;
  autoFocus?: boolean;
  separator?: boolean | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  mask?: boolean;
  keyboard?: 'numeric' | 'default' | 'email-address' | 'phone-pad';
  error?: boolean | string;
  className?: string;
  mode?: 'light' | 'dark';

  // Input validation
  validateChar?: (char: string, index: number) => boolean;
  allowedChars?: string | RegExp;

  // Auto-submission
  shouldAutoSubmit?: boolean;
  autoSubmitDelay?: number;

  // Timeout/Expiry
  expiresIn?: number; // in seconds
  onExpire?: () => void;
  showExpiryTimer?: boolean;

  // Resend functionality
  onResend?: () => void;
  resendCooldown?: number; // in seconds
  maxResendAttempts?: number;

  // Clipboard
  shouldHandleClipboard?: boolean;

  // Animation
  animate?: boolean;
  animationDuration?: number;

  // Accessibility
  ariaLabel?: string;
  errorAriaLabel?: string;

  // Testing
  testID?: string;

  // External form integration
  name?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

type OTPInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  (
    {
      // Core functionality
      length = 6,
      value = '',
      onChange,
      onComplete,

      // Appearance
      disabled = false,
      autoFocus = false,
      separator = false,
      size = 'md',
      mask = false,
      keyboard = 'numeric',
      error = false,
      className = '',
      mode = 'light',

      // Input validation
      validateChar,
      allowedChars,

      // Auto-submission
      shouldAutoSubmit = true,
      autoSubmitDelay = 300,

      // Timeout/Expiry
      expiresIn = 0, // 0 means no expiry
      onExpire,
      showExpiryTimer = false,

      // Resend functionality
      onResend,
      resendCooldown = 30, // in seconds
      maxResendAttempts = 3,

      // Clipboard
      shouldHandleClipboard = true,

      // Animation
      animate = true,
      animationDuration = 200,

      // Accessibility
      ariaLabel = 'OTP Input',
      errorAriaLabel = 'Error in OTP Input',

      // Testing
      testID = 'otp-input',

      // Form integration
      name,
      onBlur: externalOnBlur,
      onFocus: externalOnFocus,
    },
    ref
  ) => {
    // Local state management
    const [localValue, setLocalValue] = useState<string>(
      value.slice(0, length)
    );
    const [focused, setFocused] = useState<boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [timeRemaining, setTimeRemaining] = useState<number>(expiresIn);
    const [resendAttempts, setResendAttempts] = useState<number>(0);
    const [resendCountdown, setResendCountdown] = useState<number>(0);
    const [_errorMessage, _setErrorMessage] = useState<string>(
      typeof error === 'string' ? error : ''
    );

    // Animation related state
    const shakeAnimations = useRef<Animated.Value[]>(
      Array(length)
        .fill(0)
        .map(() => new Animated.Value(0))
    ).current;
    const fadeAnimations = useRef<Animated.Value[]>(
      Array(length)
        .fill(0)
        .map(() => new Animated.Value(1))
    ).current;

    // Refs
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const expiryTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resendTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isRTL = I18nManager.isRTL;

    // Calculate the middle point for separator
    const midPoint = Math.floor(length / 2);

    // First, add a new ref to track if clipboard has been checked
    const clipboardCheckedRef = useRef<boolean>(false);

    // Setup expiration timer
    useEffect(() => {
      if (expiresIn > 0) {
        setTimeRemaining(expiresIn);

        expiryTimerRef.current = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(expiryTimerRef.current!);
              if (onExpire) {
                onExpire();
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      return () => {
        if (expiryTimerRef.current) {
          clearInterval(expiryTimerRef.current);
        }
      };
    }, [expiresIn, onExpire]);

    // Setup resend cooldown
    useEffect(() => {
      if (resendCountdown > 0) {
        resendTimerRef.current = setInterval(() => {
          setResendCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(resendTimerRef.current!);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      return () => {
        if (resendTimerRef.current) {
          clearInterval(resendTimerRef.current);
        }
      };
    }, [resendCountdown]);

    // Update local value when prop value changes
    useEffect(() => {
      setLocalValue(value.slice(0, length));

      // Check for completion when value changes
      if (value.length === length && shouldAutoSubmit && onComplete) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          onComplete(value);
        }, autoSubmitDelay);
      }
    }, [value, length, shouldAutoSubmit, onComplete, autoSubmitDelay]);

    // Initialize input refs array
    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length);

      // Reset animation values when length changes
      shakeAnimations.forEach((anim) => anim.setValue(0));
      fadeAnimations.forEach((anim) => anim.setValue(1));
    }, [length, shakeAnimations, fadeAnimations]);

    // Modify the clipboard handling useEffect to only check once
    useEffect(() => {
      let mounted = true;

      const checkClipboard = async () => {
        if (!shouldHandleClipboard || !focused || clipboardCheckedRef.current) {
          return;
        }

        try {
          const clipboardContent = await Clipboard.getString();

          // Set the flag to prevent future automatic checks
          clipboardCheckedRef.current = true;

          if (!clipboardContent || !mounted) {
            return;
          }

          // Only proceed if clipboard looks like a viable OTP code
          if (clipboardContent.length >= length) {
            // Filter characters if validation is required
            let validChars = clipboardContent;

            if (allowedChars) {
              if (allowedChars instanceof RegExp) {
                validChars = clipboardContent
                  .split('')
                  .filter((char) => allowedChars.test(char))
                  .join('');
              } else {
                validChars = clipboardContent
                  .split('')
                  .filter((char) => allowedChars.includes(char))
                  .join('');
              }
            }

            if (keyboard === 'numeric') {
              validChars = validChars.replace(/[^0-9]/g, '');
            }

            const pasteValue = validChars.slice(0, length);

            if (pasteValue.length > 0 && mounted) {
              setLocalValue(pasteValue);
              onChange(pasteValue);

              // Focus the last filled input or first empty
              const lastFilledIndex = Math.min(pasteValue.length, length - 1);
              inputRefs.current[lastFilledIndex]?.focus();

              // Check if we should auto-submit
              if (
                pasteValue.length === length &&
                shouldAutoSubmit &&
                onComplete
              ) {
                if (timerRef.current) {
                  clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(() => {
                  onComplete(pasteValue);
                }, autoSubmitDelay);
              }
            }
          }
        } catch (e) {
          console.error('Clipboard error:', e);
        }
      };

      // Check clipboard when focused
      if (focused) {
        checkClipboard();
      }

      return () => {
        mounted = false;
      };
    }, [
      focused,
      shouldHandleClipboard,
      length,
      onChange,
      allowedChars,
      keyboard,
      shouldAutoSubmit,
      onComplete,
      autoSubmitDelay,
    ]);

    // Validate a character based on rules
    const validateCharacter = useCallback(
      (char: string, index: number): boolean => {
        if (!char) {
          return true;
        }

        // Custom validation function takes precedence
        if (validateChar) {
          return validateChar(char, index);
        }

        // Check against allowed characters
        if (allowedChars) {
          if (allowedChars instanceof RegExp) {
            return allowedChars.test(char);
          }
          return allowedChars.includes(char);
        }

        // Default validation based on keyboard type
        if (keyboard === 'numeric') {
          return /^[0-9]$/.test(char);
        }

        return true;
      },
      [validateChar, allowedChars, keyboard]
    );

    // Handle text change
    const handleChange = useCallback(
      (text: string, index: number) => {
        if (disabled) {
          return;
        }

        // Handle paste operations
        if (text.length > 1) {
          const chars = text.split('');
          const newValue = localValue.split('');
          const validChars = chars.filter((char, i) => {
            const targetIndex = index + i;
            return targetIndex < length && validateCharacter(char, targetIndex);
          });

          if (validChars.length > 0) {
            validChars.forEach((char, i) => {
              const targetIndex = index + i;
              if (targetIndex < length) {
                newValue[targetIndex] = char;
              }
            });

            const nextValue = newValue.join('');
            setLocalValue(nextValue);
            onChange(nextValue);

            // Focus the next empty input or stay at current position
            const nextEmptyIndex = newValue.findIndex(
              (char, i) => !char && i > index
            );
            if (nextEmptyIndex !== -1) {
              inputRefs.current[nextEmptyIndex]?.focus();
            } else {
              inputRefs.current[
                Math.min(index + validChars.length, length - 1)
              ]?.focus();
            }

            // Check for completion
            if (nextValue.length === length && shouldAutoSubmit && onComplete) {
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              timerRef.current = setTimeout(() => {
                onComplete(nextValue);
              }, autoSubmitDelay);
            }
          }
          return;
        }

        // Handle single character input
        if (text.length <= 1) {
          if (text && !validateCharacter(text, index)) {
            if (animate) {
              Animated.sequence([
                Animated.timing(shakeAnimations[index], {
                  toValue: 10,
                  duration: animationDuration / 4,
                  useNativeDriver: true,
                }),
                Animated.timing(shakeAnimations[index], {
                  toValue: -10,
                  duration: animationDuration / 2,
                  useNativeDriver: true,
                }),
                Animated.timing(shakeAnimations[index], {
                  toValue: 0,
                  duration: animationDuration / 4,
                  useNativeDriver: true,
                }),
              ]).start();
            }
            return;
          }

          const newValue = localValue.split('');
          newValue[index] = text;
          const nextValue = newValue.join('');

          setLocalValue(nextValue);
          onChange(nextValue);

          // Only auto-advance if we're adding a new character (not editing)
          if (text && !localValue[index] && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }

          // Check for completion
          if (nextValue.length === length && shouldAutoSubmit && onComplete) {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
              onComplete(nextValue);
            }, autoSubmitDelay);
          }
        }
      },
      [
        disabled,
        length,
        localValue,
        onChange,
        validateCharacter,
        shouldAutoSubmit,
        onComplete,
        autoSubmitDelay,
        animate,
        shakeAnimations,
        animationDuration,
      ]
    );

    // Handle keypress events
    const handleKeyPress = useCallback(
      (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        const key = e.nativeEvent.key;

        if (key === 'Backspace') {
          // Only clear current input if it has a value
          if (localValue[index]) {
            const newValue = localValue.split('');
            newValue[index] = '';
            const nextValue = newValue.join('');
            setLocalValue(nextValue);
            onChange(nextValue);
          } else if (index > 0) {
            // Move to previous input if current is empty
            inputRefs.current[index - 1]?.focus();
          }
        }
      },
      [localValue, onChange]
    );

    // Handle arrow key navigation
    const _handleKeyDown = useCallback(
      (e: any, index: number) => {
        // Skip if not keyboard event or disabled
        if (!e.nativeEvent || disabled) {
          return;
        }

        const key = e.nativeEvent.key;

        switch (key) {
          case 'ArrowLeft':
            // Move to previous input (respect RTL)
            if (isRTL ? index < length - 1 : index > 0) {
              const prevIndex = isRTL ? index + 1 : index - 1;
              inputRefs.current[prevIndex]?.focus();
            }
            break;

          case 'ArrowRight':
            // Move to next input (respect RTL)
            if (isRTL ? index > 0 : index < length - 1) {
              const nextIndex = isRTL ? index - 1 : index + 1;
              inputRefs.current[nextIndex]?.focus();
            }
            break;

          case 'Home':
            // Move to first input
            inputRefs.current[0]?.focus();
            break;

          case 'End':
            // Move to last input
            inputRefs.current[length - 1]?.focus();
            break;
        }
      },
      [disabled, length, isRTL]
    );

    // Handle input focus
    const handleFocus = useCallback(
      (index: number) => {
        setFocused(true);
        setFocusedIndex(index);

        if (externalOnFocus) {
          externalOnFocus();
        }

        // Animate focus if enabled
        if (animate) {
          Animated.sequence([
            Animated.timing(fadeAnimations[index], {
              toValue: 1.1,
              duration: animationDuration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnimations[index], {
              toValue: 1,
              duration: animationDuration / 2,
              useNativeDriver: true,
            }),
          ]).start();
        }

        // Announce to screen readers
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          AccessibilityInfo.announceForAccessibility(
            `OTP digit ${index + 1} of ${length}. ${localValue[index] ? 'Filled with ' + (mask ? 'dot' : localValue[index]) : 'Empty'}`
          );
        }
      },
      [
        externalOnFocus,
        fadeAnimations,
        animate,
        animationDuration,
        localValue,
        length,
        mask,
      ]
    );

    // Handle input blur
    const handleBlur = useCallback(() => {
      setFocused(false);
      setFocusedIndex(-1);

      // Call external onBlur if provided
      if (externalOnBlur) {
        externalOnBlur();
      }

      // Reset all animations if enabled
      if (animate) {
        fadeAnimations.forEach((anim, _index) => {
          Animated.timing(anim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          }).start();
        });
      }
    }, [externalOnBlur, fadeAnimations, animate, animationDuration]);

    // Handle input tap to clear the current value immediately
    const handleTap = useCallback(
      (index: number) => {
        if (disabled) {
          return;
        }

        // Focus the input without clearing it - allow editing existing values
        inputRefs.current[index]?.focus();
      },
      [disabled]
    );

    // Handle container press to focus on first empty or last filled input
    const _handleContainerPress = useCallback(() => {
      if (disabled) {
        return;
      }

      const firstEmptyIndex = localValue.split('').findIndex((char) => !char);
      const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }, [disabled, localValue, length]);

    // Handle resend button press
    const handleResend = useCallback(() => {
      if (
        disabled ||
        resendCountdown > 0 ||
        resendAttempts >= maxResendAttempts
      ) {
        return;
      }

      if (onResend) {
        onResend();
      }

      setResendAttempts((prev) => prev + 1);
      setResendCountdown(resendCooldown);
    }, [
      disabled,
      resendCountdown,
      resendAttempts,
      maxResendAttempts,
      onResend,
      resendCooldown,
    ]);

    // Clear all inputs
    const clearInputs = useCallback(() => {
      setLocalValue('');
      onChange('');

      // Focus first input after clearing
      inputRefs.current[0]?.focus();
    }, [onChange]);

    // Focus the first input
    const focusInput = useCallback(() => {
      inputRefs.current[0]?.focus();
    }, []);

    // Blur all inputs
    const blurInputs = useCallback(() => {
      inputRefs.current.forEach((ref) => ref?.blur());
    }, []);

    // Expose methods through ref
    useEffect(() => {
      if (ref) {
        (ref as React.MutableRefObject<OTPInputRef>).current = {
          focus: focusInput,
          blur: blurInputs,
          clear: clearInputs,
        };
      }
    }, [ref, focusInput, blurInputs, clearInputs]);

    // Get position-specific style based on index
    const getPositionStyle = useCallback(
      (index: number) => {
        // Adjust for RTL if needed
        const adjustedIndex = isRTL ? length - 1 - index : index;

        if (separator && typeof separator !== 'boolean') {
          // With custom separator, we create two groups
          if (adjustedIndex === 0) {
            return styles.inputFirstInGroup;
          }
          if (adjustedIndex === midPoint - 1) {
            return styles.inputLastInGroup;
          }
          if (adjustedIndex === midPoint) {
            return styles.inputFirstInGroup;
          }
          if (adjustedIndex === length - 1) {
            return styles.inputLastInGroup;
          }
          return styles.inputMiddle;
        } else if (separator) {
          // With default separator, we create two groups
          if (adjustedIndex === 0) {
            return styles.inputFirstInGroup;
          }
          if (adjustedIndex === midPoint - 1) {
            return styles.inputLastInGroup;
          }
          if (adjustedIndex === midPoint) {
            return styles.inputFirstInGroup;
          }
          if (adjustedIndex === length - 1) {
            return styles.inputLastInGroup;
          }
          return styles.inputMiddle;
        } else {
          // Without separator, just one continuous group
          if (adjustedIndex === 0) {
            return styles.inputFirstInGroup;
          }
          if (adjustedIndex === length - 1) {
            return styles.inputLastInGroup;
          }
          return styles.inputMiddle;
        }
      },
      [separator, length, midPoint, isRTL]
    );

    // Get full input style with mode-specific styles
    const getInputStyle = useCallback(
      (index: number) => {
        const isActive = index === focusedIndex;
        const isFilled = !!localValue[index];
        const isDark = mode === 'dark';
        const hasError = error !== false;

        const styleClasses = [
          styles.input,
          styles[`input-${size}`],
          styles['input-outline'],
          getPositionStyle(index),
          isDark ? styles.inputDark : styles.inputLight,
        ];

        // Make active state more subtle
        if (isActive) {
          styleClasses.push(
            isDark ? styles.inputActiveDark : styles.inputActive
          );
        }
        if (isFilled) {
          styleClasses.push(
            isDark ? styles.inputFilledDark : styles.inputFilled
          );
        }
        if (disabled) {
          styleClasses.push(
            isDark ? styles.inputDisabledDark : styles.inputDisabled
          );
        }
        if (hasError) {
          styleClasses.push(isDark ? styles.inputErrorDark : styles.inputError);
        }

        return styleClasses.join(' ');
      },
      [focusedIndex, localValue, mode, error, disabled, size, getPositionStyle]
    );

    // Create animation styles for inputs
    const getAnimationStyle = useCallback(
      (index: number) => {
        return {
          transform: [{ translateX: shakeAnimations[index] }],
          opacity: fadeAnimations[index],
        };
      },
      [shakeAnimations, fadeAnimations]
    );

    const containerStyle = useMemo(() => {
      return `${styles.container} flex flex-col items-center ${mode === 'dark' ? styles.containerDark : ''} ${className}`;
    }, [mode, className]);

    const inputContainerStyle = 'flex flex-row items-center justify-center';

    const separatorStyle = useMemo(() => {
      return mode === 'dark' ? styles.separatorDark : styles.separator;
    }, [mode]);

    const errorTextStyle = useMemo(() => {
      return (
        'text-sm text-red-500 mt-2 w-full text-center' +
        (mode === 'dark' ? ' text-red-400' : '')
      );
    }, [mode]);

    const timerStyle = useMemo(() => {
      return (
        'text-sm text-gray-500 mt-2 w-full text-center' +
        (mode === 'dark' ? ' text-gray-400' : '')
      );
    }, [mode]);

    const resendButtonStyle = useMemo(() => {
      let baseStyle = 'mt-4 w-full';
      if (resendCountdown > 0 || resendAttempts >= maxResendAttempts) {
        baseStyle += ' opacity-50';
      }
      return baseStyle;
    }, [resendCountdown, resendAttempts, maxResendAttempts]);

    return (
      <View
        className={containerStyle}
        testID={testID}
        accessible={true}
        accessibilityLabel={ariaLabel}
        accessibilityHint="Enter your verification code"
        accessibilityRole={'group' as AccessibilityRole}
        accessibilityState={{ disabled }}
      >
        {/* OTP Input Row */}
        <View className={inputContainerStyle}>
          {Array.from({ length }).map((_, index) => {
            const displayIndex = isRTL ? length - 1 - index : index;

            return (
              <React.Fragment key={index}>
                <Pressable onPress={() => handleTap(displayIndex)}>
                  <Animated.View style={getAnimationStyle(displayIndex)}>
                    <TextInput
                      ref={(ref) => (inputRefs.current[displayIndex] = ref)}
                      className={getInputStyle(displayIndex)}
                      value={
                        mask && localValue[displayIndex]
                          ? '•'
                          : localValue[displayIndex] || ''
                      }
                      onChangeText={(text) => handleChange(text, displayIndex)}
                      onKeyPress={(e) => handleKeyPress(e, displayIndex)}
                      onFocus={() => handleFocus(displayIndex)}
                      onBlur={handleBlur}
                      maxLength={1}
                      keyboardType={keyboard}
                      secureTextEntry={false}
                      editable={!disabled}
                      selectTextOnFocus={true}
                      autoFocus={autoFocus && displayIndex === 0}
                      contextMenuHidden={false}
                      textContentType="oneTimeCode"
                      autoComplete="sms-otp"
                      autoCorrect={false}
                      autoCapitalize="none"
                      spellCheck={false}
                      blurOnSubmit={false}
                      caretHidden={false}
                      selection={{ start: 0, end: 1 }}
                      style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        paddingTop: 0,
                        paddingBottom: 0,
                        lineHeight:
                          size === 'sm' ? 16 : size === 'md' ? 18 : 22,
                        color: mode === 'dark' ? '#fff' : '#000',
                        fontWeight: '600',
                      }}
                      accessibilityLabel={`OTP digit ${displayIndex + 1} of ${length}${localValue[displayIndex] ? '. Filled' : '. Empty'}`}
                      accessibilityRole="text"
                      accessibilityState={{
                        disabled,
                        selected: displayIndex === focusedIndex,
                      }}
                      accessibilityHint={`Enter digit ${displayIndex + 1} of your verification code`}
                      testID={`${testID}-input-${displayIndex}`}
                    />
                  </Animated.View>
                </Pressable>

                {separator && displayIndex === midPoint - 1 && (
                  <View
                    className={separatorStyle}
                    accessibilityElementsHidden={true}
                  >
                    {typeof separator === 'boolean' ? (
                      <Text>—</Text>
                    ) : (
                      separator
                    )}
                  </View>
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* Error Message */}
        {error !== false && (
          <Text
            className={errorTextStyle}
            accessibilityLabel={errorAriaLabel}
            accessibilityRole="alert"
            testID={`${testID}-error`}
          >
            {typeof error === 'string' ? error : 'Invalid code'}
          </Text>
        )}

        {/* Timer Display */}
        {showExpiryTimer && expiresIn > 0 && (
          <Text
            className={timerStyle}
            accessibilityLabel={`Code expires in ${timeRemaining} seconds`}
            testID={`${testID}-timer`}
          >
            Code expires in {timeRemaining}s
          </Text>
        )}

        {/* Resend Button */}
        {onResend && (
          <View
            className={`${resendButtonStyle} flex justify-center items-center`}
          >
            <Button
              onPress={handleResend}
              disabled={
                resendCountdown > 0 || resendAttempts >= maxResendAttempts
              }
              variant={mode === 'dark' ? 'secondary' : 'default'}
              accessibilityLabel={
                resendCountdown > 0
                  ? `Resend code in ${resendCountdown} seconds`
                  : resendAttempts >= maxResendAttempts
                    ? 'Maximum resend attempts reached'
                    : 'Resend code'
              }
              testID={`${testID}-resend`}
              className="w-[60%]"
            >
              {resendCountdown > 0
                ? `Resend code in ${resendCountdown}s`
                : resendAttempts >= maxResendAttempts
                  ? 'Maximum resend attempts reached'
                  : 'Resend code'}
            </Button>
          </View>
        )}
      </View>
    );
  }
);

// For better debugging
OTPInput.displayName = 'OTPInput';

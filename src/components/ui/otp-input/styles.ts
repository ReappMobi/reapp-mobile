// NativeWind compatible style object
export const styles = {
  // Container styles
  container: 'flex-row items-center justify-center',
  containerDark: 'bg-dark-background',

  // Separator styles
  separator: 'mx-2 text-gray-400',
  separatorDark: 'mx-2 text-gray-600',

  // Input base styles
  input: 'text-center font-medium flex flex-col items-center justify-center',
  inputLight:
    'bg-white text-black  border-gray-400 flex flex-col items-center justify-center',
  inputDark:
    'bg-dark-card  border-white/40 text-dark-foreground flex flex-col items-center justify-center',

  // Input size variants
  'input-sm': 'w-8 h-10 text-sm',
  'input-md': 'w-10 h-12 text-base',
  'input-lg': 'w-12 h-14 text-lg',

  // Input style variants
  'input-outline': 'border',

  // Input position styles
  inputFirstInGroup:
    'rounded-l-md border-l border-t border-b border-r-0 rounded-r-none',
  inputLastInGroup: 'rounded-r-md border-r border-t border-b rounded-l-none',
  inputMiddle: 'rounded-none border-t border-b border-r-0',

  // Input states - Light mode
  inputActive: ' z-10',
  inputFilled: ' bg-gray-200/80',
  inputDisabled: 'opacity-50 bg-muted',
  inputError: 'border-destructive',

  // Input states - Dark mode
  inputActiveDark: '  z-10',
  inputFilledDark: 'bg-[#3C3C3C]',
  inputDisabledDark: 'opacity-50 bg-dark-muted',
  inputErrorDark: 'border-dark-destructive',
};

export enum foreground_ANSI_codes {
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
}

export enum background_ANSI_codes {
  Black = '\x1b[40m',
  Red = '\x1b[41m',
  Green = '\x1b[42m',
  Yellow = '\x1b[43m',
  Blue = '\x1b[44m',
  Magenta = '\x1b[45m',
  Cyan = '\x1b[46m',
  White = '\x1b[47m',
}

export const ANSI_code_Reset = '\x1b[0m';

export enum ANSI_styles {
  Bold = '\x1b[1m',
  Dim = '\x1b[2m',
  Underline = '\x1b[4m',
  Invert_colors = '\x1b[7m',
  Hidden = '\x1b[8m'
}

export const ANSI_style_1 = foreground_ANSI_codes.Black + background_ANSI_codes.White;
export const ANSI_style_2 = foreground_ANSI_codes.Red + background_ANSI_codes.Yellow;

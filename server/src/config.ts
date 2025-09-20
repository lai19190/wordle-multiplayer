import dotenv from 'dotenv';
import { ServerConfig } from './types';

dotenv.config({ path: '.env' });

const Config: ServerConfig = {
  port: Number(process.env.PORT) || 3000,
  maxGuesses: Number(process.env.MAX_GUESSES) || 6,
  predefinedWordList: (process.env.PREDEFINED_WORD_LIST || '').split(','),
};

export default Config;

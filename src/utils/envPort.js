import dotenv from 'dotenv';

dotenv.config();

export const envPort = (portName, defaultValue) => {
  return process?.env[portName] || defaultValue;
};

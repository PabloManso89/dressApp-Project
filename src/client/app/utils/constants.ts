import {resultTypes} from './types';

export class Constants {
  public static get USER_COLLECTION(): string { return 'users'; };
}

export const COMPARISON_SYMBOLS = {
  EQUAL: '==',
  BT: '>',
  ST: '<'
};

export const RESULT_VALUES = {
  SUCCESS: 'SUCCESS',
  NON_FOUND_USER: 'NON_FOUND_USER',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  USER_ALREADY_REGISTERED: 'USER_ALREADY_REGISTERED'
} as {[key in string]: resultTypes};

export const RESULT_MESSAGES = {
  SUCCESS: '',
  NON_FOUND_USER: 'User not found',
  USER_ALREADY_REGISTERED: 'There is already an user with same email registered',
  USER_SUCCESSFULLY_REGISTERED: 'The user has been successfully registered',
  UNKNOWN_ERROR: 'There has been a technical problem, please try to repeat o contact us'
} as {[key in string]: string};

import {resultTypes} from './types';

export class Constants {
  public static get USER_COLLECTION(): string { return 'users'; };
}

export const COMPARISON_SYMBOLS = {
  EQUALS: '==',
  BT: '>',
  ST: '<'
};

export const RESULT_VALUES = {
  SUCCESS: 'SUCCESS',
  INVALID_FORM: 'INVALID_FORM',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  NON_FOUND_USER: 'NON_FOUND_USER',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  USER_ALREADY_REGISTERED: 'USER_ALREADY_REGISTERED',
  USER_SUCCESSFULLY_REGISTERED: 'USER_SUCCESSFULLY_REGISTERED'
} as {[key in string]: resultTypes};

export const RESULT_MESSAGES = {
  SUCCESS: '',
  INVALID_PASSWORD: 'The password is not valid',
  INVALID_FORM: 'The form is not valid',
  NON_FOUND_USER: 'User not found',
  UNKNOWN_ERROR: 'There has been a technical problem, please try to repeat o contact us',
  USER_ALREADY_REGISTERED: 'There is already an user with same email registered',
  USER_SUCCESSFULLY_REGISTERED: 'The user has been successfully registered'
} as {[key in string]: string};

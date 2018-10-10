import { Injectable } from '@angular/core';

import { Logger } from './logger';

@Injectable()
export class LoggerService implements Logger {

  public info: any;
  public warn: any;
  public error: any;
}
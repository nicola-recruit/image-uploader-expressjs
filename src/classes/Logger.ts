import * as winston from 'winston';
import ConfigurationManager from './ConfigurationManager';
import * as moment from 'moment';

class Logger {

    private loggerInstance: winston.Logger;

    constructor (private configurationManager: ConfigurationManager) {
        const logFilePath = configurationManager.getLogFilePath();
        this.loggerInstance = winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: logFilePath })
            ]
        });
    }

    public log (message: string): void {
        this.loggerInstance.info(this.formatCurrentDate() + ': ' + message);
    }

    private formatCurrentDate (): string {
        return '[' + moment().format('MM/DD/YYYY h:mm:ss.SSS') + '] ';
    }
}

export default Logger;
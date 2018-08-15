import * as nconf from 'nconf';
import * as path from 'path';

class ConfigurationManager {

    constructor () {
        const configurationFilePath = path.join(__dirname, '../../conf/configuration.json');
        nconf.env().argv();
        nconf.file(configurationFilePath);
    }

    public getServerPort (): number {
        return Number.parseInt(nconf.get('port'));
    }

    public getLogFilePath (): string {
        const logFilePath = nconf.get('logFilePath');
        return this.resolveRelativeDirectory(logFilePath);
    }

    public getUploadPath (): string {
        const uploadPath = nconf.get('uploadPath');
        return this.resolveRelativeDirectory(uploadPath);
    }

    public getFileInputName (): string {
        return nconf.get('fileInputName');
    }

    private resolveRelativeDirectory (relativeDirectory: string): string {
        return path.join(__dirname, relativeDirectory);
    }
}

export default ConfigurationManager;
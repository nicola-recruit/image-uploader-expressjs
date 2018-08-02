import ImageUploadServer from './classes/ImageUploaderServer';
import ConfigurationManager from './classes/ConfigurationManager';
import Logger from './classes/Logger';
import RouterFactory from './classes/routes/RouterFactory';

const configurationManager = new ConfigurationManager();
const logger = new Logger(configurationManager);
const imageUploadServer = new ImageUploadServer(configurationManager, logger);
const routerFactory = new RouterFactory(configurationManager, logger);

imageUploadServer.addRouter(routerFactory.buildImageRouter());

imageUploadServer.runServer();
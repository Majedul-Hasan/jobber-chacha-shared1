import { json } from 'express';
import winston, { Logger } from 'winston';

import { ElasticsearchTransformer, LogData, ElasticsearchTransport, TransformedData } from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => {
    return ElasticsearchTransformer(logData)
}

export const winstonLogger = (ElasticsearchNode: string, name: string, level: string): Logger => {
    const options = {
        console: {
            level,
            handleExceptions: true,
            json: false,
            colorize: true,
        },
        elasticsearch: {
            level,
            transformer: esTransformer,
            clientOpts: {
                node: ElasticsearchNode,
                log: level,
                maxRetries: 2,
                requestTimeout: 20000,
                sniffOnStart: false,
            }
        }
    }
    const esTransport: ElasticsearchTransport = new ElasticsearchTransport(options.elasticsearch);
    const logger: Logger = winston.createLogger({
        exitOnError: false,
        defaultMeta: { service: name },
        transports: [
            new winston.transports.Console(options.console),
            esTransport,
        ],
        // format: winston.format.json(),
    });
    return logger;
}


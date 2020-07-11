/**
 * @name read-metadata.ts
 * @description readMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.readMetadata;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    type: config.metadataType,
    fullNames: config.fullNames
  };
};

/**
 * @name readMetadata
 * @description returns one or more metadata components from your organization synchronously.
 */
async function readMetadata(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { readMetadata };

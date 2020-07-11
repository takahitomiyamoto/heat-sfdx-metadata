/**
 * @name rename-metadata.ts
 * @description renameMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.renameMetadata;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    type: config.metadataType,
    oldFullName: config.oldFullName,
    newFullName: config.newFullName
  };
};

/**
 * @name renameMetadata
 * @description renames a metadata component in your organization synchronously.
 */
async function renameMetadata(authorization: authorization, config: any) {
  return await callFunction(authorization, config, _getMethod, _getArgs);
}

export { renameMetadata };

/**
 * @name create-metadata.ts
 * @description createMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.createMetadata;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    metadata: config.metadata
  };
};

/**
 * @name createMetadata
 * @description adds one or more new metadata components to your organization synchronously.
 */
async function createMetadata(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { createMetadata };

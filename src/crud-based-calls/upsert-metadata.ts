/**
 * @name upsert-metadata.ts
 * @description upsertMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.upsertMetadata;
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
 * @name upsertMetadata
 * @description creates or updates one or more metadata components in your organization synchronously.
 */
async function upsertMetadata(authorization: authorization, config: any) {
  return await callFunction(authorization, config, _getMethod, _getArgs);
}

export { upsertMetadata };

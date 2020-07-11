/**
 * @name update-metadata.ts
 * @description updateMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { invoke, createClient } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.updateMetadata;
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
 * @name updateMetadata
 * @description updates one or more metadata components in your organization synchronously.
 */
async function updateMetadata(authorization: authorization, config: any) {
  const client = await createClient(authorization);
  const result: any = await invoke(_getMethod(client), _getArgs(config));
  return JSON.stringify(result);
}

export { updateMetadata };

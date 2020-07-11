/**
 * @name delete-metadata.ts
 * @description deleteMetadata
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { invoke, createClient } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.deleteMetadata;
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
 * @name deleteMetadata
 * @description deletes one or more metadata components from your organization synchronously.
 */
async function deleteMetadata(authorization: authorization, config: any) {
  const client = await createClient(authorization);
  const result: any = await invoke(_getMethod(client), _getArgs(config));
  return JSON.stringify(result);
}

export { deleteMetadata };

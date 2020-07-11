/**
 * @name retrieve.ts
 * @description retrieve
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.retrieve;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    retrieveRequest: {
      apiVersion: config.apiVersion,
      packageNames: config.packageNames,
      singlePackage: config.singlePackage,
      specificFiles: config.specificFiles,
      unpackaged: {
        fullName: config.fullName,
        apiAccessLevel: config.apiAccessLevel,
        description: config.description,
        namespacePrefix: config.namespacePrefix,
        objectPermissions: config.objectPermissions,
        packageType: config.packageType,
        postInstallClass: config.postInstallClass,
        setupWeblink: config.setupWeblink,
        types: config.types,
        uninstallClass: config.uninstallClass,
        version: config.version
      }
    }
  };
};

/**
 * @name retrieve
 * @description retrieves XML file representations of components in an organization.
 */
async function retrieve(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { retrieve };

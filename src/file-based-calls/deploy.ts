/**
 * @name deploy.ts
 * @description deploy
 */
import * as soap from 'soap';
import { authorization } from 'heat-sfdx-common';
import { callFunction } from '../common';

/**
 * @name _getMethod
 * @description get method.
 */
const _getMethod = (client: soap.Client) => {
  return client.MetadataService.Metadata.deploy;
};

/**
 * @name _getArgs
 * @description get args.
 */
const _getArgs = (config: any) => {
  return {
    ZipFile: config.zipFile,
    DeployOptions: {
      allowMissingFiles: config.allowMissingFiles,
      autoUpdatePackage: config.autoUpdatePackage,
      checkOnly: config.checkOnly,
      ignoreWarnings: config.ignoreWarnings,
      performRetrieve: config.performRetrieve,
      purgeOnDelete: config.purgeOnDelete,
      rollbackOnError: config.rollbackOnError,
      runTests: config.runTests,
      singlePackage: config.singlePackage,
      testLevel: config.testLevel
    }
  };
};

/**
 * @name deploy
 * @description uses file representations of components to create, update, or delete those components in a Salesforce org.
 */
async function deploy(authorization: authorization, config: any) {
  return await callFunction({
    authorization: authorization,
    config: config,
    _getMethod: _getMethod,
    _getArgs: _getArgs
  });
}

export { deploy };

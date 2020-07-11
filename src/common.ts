/**
 * @name common.ts
 * @description common
 */
import * as soap from 'soap';
import fs from 'fs';
import { authorization } from 'heat-sfdx-common';

const UTF8 = 'utf8';

/**
 * @name METADATA_TYPE2FOLDER_MAP
 * @description map of metadataType to metadata folder
 */
const METADATA_TYPE2FOLDER_MAP: any = {
  Dashboard: 'DashboardFolder',
  Document: 'DocumentFolder',
  Report: 'ReportFolder',
  EmailTemplate: 'EmailFolder'
};

/**
 * @name METADATA_FOLDER2TYPE_MAP
 * @description map of metadata folder to metadataType
 */
const METADATA_FOLDER2TYPE_MAP: any = {
  DashboardFolder: 'Dashboard',
  DocumentFolder: 'Document',
  ReportFolder: 'Report',
  EmailFolder: 'EmailTemplate'
};

/**
 * @name _getSessionHeader
 * @description get session header
 */
const _getSessionHeader = (params: authorization) => {
  return {
    SessionHeader: {
      sessionId: params.accessToken
    }
  };
};

/**
 * @name createClient
 * @description create client
 */
async function createClient(params: authorization) {
  const metadataWsdl = params.options.wsdl.metadata;
  let client = await soap.createClientAsync(metadataWsdl);
  client.addSoapHeader(
    _getSessionHeader(params),
    '',
    'tns',
    'http://soap.sforce.com/2006/04/metadata'
  );
  client.setEndpoint(params.instanceUrl);
  return client;
}

/**
 * @name invoke
 * @description invoke a method
 */
const invoke = (method: any, args: any) => {
  return new Promise((resolve, reject) => {
    method(
      args,
      (
        err: any,
        result: any,
        rawResponse: any,
        soapHeader: any,
        rawRequest: any
      ) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

/**
 * @name methodsMetadata
 * @description methods of Metadata WSDL
 */
async function methodsMetadata(params: authorization) {
  const metadataWsdl = params.options.wsdl.metadata;
  const metadataClient = await soap.createClientAsync(metadataWsdl);
  const metadataMethod = metadataClient.describe();
  const result: string = JSON.stringify(
    Object.keys(metadataMethod.MetadataService.Metadata)
  );
  return result;
}

export {
  UTF8,
  METADATA_TYPE2FOLDER_MAP,
  METADATA_FOLDER2TYPE_MAP,
  createClient,
  invoke,
  methodsMetadata
};

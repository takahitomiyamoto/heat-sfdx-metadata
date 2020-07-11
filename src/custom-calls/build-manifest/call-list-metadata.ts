/**
 * @name call-list-metadata.ts
 * @description callListMetadata
 */
import { readFileSyncUtf8, writeFileSyncUtf8 } from 'heat-sfdx-common';
import { listMetadata } from '../../utility-calls';
import { METADATA_TYPE2FOLDER_MAP } from '../../common';

/**
 * @name _getMetadataTypeMembers
 */
const _getMetadataTypeMembers = (path: string) => {
  const resultString = readFileSyncUtf8(path);
  const result = JSON.parse(resultString);
  const members = result.members;
  members.sort();

  return members;
};

/**
 * @name _storeMetadataTypeMembers
 */
const _storeMetadataTypeMembers = (params: any) => {
  const listMetadataString = readFileSyncUtf8(params.input);
  const listMetadataObj = JSON.parse(listMetadataString);

  const fullNames = listMetadataObj.result.map(
    (member: any) => member.fullName
  );
  fullNames.sort();

  const name = [];
  name.push(params.metadataType);

  const metadataTypeMembers = {
    members: fullNames,
    name: name
  };

  const output = params.folder
    ? `${params.config.prefix.metadataTypeMembers}.${params.metadataType}.${params.folder}.json`
    : `${params.config.prefix.metadataTypeMembers}.${params.metadataType}.json`;

  writeFileSyncUtf8(output, JSON.stringify(metadataTypeMembers));
  console.log(output);
};

/**
 * @name _listMetadata
 */
async function _listMetadata(params: any) {
  const authorization = params.authorization;
  const _config = {
    metadataType: params.metadataType,
    folder: params.folder,
    asOfVersion: authorization.options.asOfVersion
  };
  const listMetadataResult = await listMetadata(authorization, _config);

  if (null === JSON.parse(listMetadataResult)) {
    const noDataMetadataType = params.folder
      ? `${params.metadataType} - ${params.folder}`
      : params.metadataType;
    console.log(`----- NO DATA: ${noDataMetadataType}`);
  } else {
    const output = params.folder
      ? `${params.config.prefix.listMetadata}.${params.metadataType}.${params.folder}.json`
      : `${params.config.prefix.listMetadata}.${params.metadataType}.json`;

    writeFileSyncUtf8(output, listMetadataResult);
    console.log(output);

    _storeMetadataTypeMembers({
      config: params.config,
      input: output,
      metadataType: params.metadataType,
      folder: params.folder
    });
  }
}

/**
 * @name _repeatListMetadata
 */
async function _repeatListMetadata(params: any) {
  const metadataTypesString = readFileSyncUtf8(params.input);
  const metadataTypes = JSON.parse(metadataTypesString);
  for await (let metadataType of metadataTypes) {
    let folders = [];
    if (params.inFolder) {
      folders = _getMetadataTypeMembers(
        `${params.config.prefix.metadataTypeMembers}.${METADATA_TYPE2FOLDER_MAP[metadataType]}.json`
      );
    } else {
      folders.push('');
    }
    for await (let folder of folders) {
      await _listMetadata({
        authorization: params.authorization,
        config: params.config,
        metadataType: metadataType,
        folder: folder
      });
    }
  }
}

/**
 * @name callListMetadata
 * @description call listMetadata() and xxx
 */
async function callListMetadata(params: any) {
  // listMetadata (no folder)
  await _repeatListMetadata({
    authorization: params.authorization,
    config: params.config,
    input: params.config.metadataTypesNoFolder,
    inFolder: false
  });

  // listMetadata (folder)
  await _repeatListMetadata({
    authorization: params.authorization,
    config: params.config,
    input: params.config.metadataTypesFolder,
    inFolder: false
  });

  // listMetadata (in folder)
  await _repeatListMetadata({
    authorization: params.authorization,
    config: params.config,
    input: params.config.metadataTypesInFolder,
    inFolder: true
  });
}

export { callListMetadata };

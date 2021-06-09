/**
 * @name call-list-metadata.ts
 * @description callListMetadata
 */
import {
  authorization,
  readFileSyncUtf8,
  writeFileSyncUtf8
} from 'heat-sfdx-common';
import { listMetadata } from '../../utility-calls';
import { METADATA_TYPE2FOLDER_MAP } from '../../common';

/**
 * @name _getMetadataTypeMembers
 */
const _getMetadataTypeMembers = (path: string) => {
  try {
    const resultString = readFileSyncUtf8(path);
    const result = JSON.parse(resultString);
    const members = result.members;
    members.sort();
    return members;
  } catch (err) {
    console.log(`----- NO FILE: ${path}`);
    return [''];
  }
};

/**
 * @name _getOutput
 */
const _getOutput = (folder: string, prefix: string, metadataType: string) => {
  return folder
    ? `${prefix}.${metadataType}.${folder}.json`
    : `${prefix}.${metadataType}.json`;
};

/**
 * @name _storeMetadataTypeMembers
 */
const _storeMetadataTypeMembers = (
  config: any,
  path: string,
  metadataType: string,
  folder: string
) => {
  const listMetadataString = readFileSyncUtf8(path);
  const listMetadataObj = JSON.parse(listMetadataString);

  console.log('manageableStates', config.manageableStates);
  const listMetadataObjResult = listMetadataObj.result.filter((member: any) => {
    return config.manageableStates.includes(member.manageableState);
  });

  if (0 === listMetadataObjResult.length) {
    return;
  }

  const fullNames = listMetadataObjResult.map((member: any) => {
    console.log('');
    console.log('-------------------------');
    console.log('call-list-metadata.ts');
    console.log(JSON.stringify(member));
    return member.fullName;
  });

  fullNames.sort();

  const name = [];
  name.push(metadataType);

  const metadataTypeMembers = {
    members: fullNames,
    name: name
  };

  const output = _getOutput(
    folder,
    config.prefix.metadataTypeMembers,
    metadataType
  );
  writeFileSyncUtf8(output, JSON.stringify(metadataTypeMembers));
  console.log(output);
};

/**
 * @name _listMetadata
 */
async function _listMetadata(
  authorization: authorization,
  config: any,
  metadataType: string,
  folder: string
) {
  const _config = {
    metadataType: metadataType,
    folder: folder,
    asOfVersion: config.asOfVersion
  };
  const listMetadataResult = await listMetadata(authorization, _config);

  if (null === JSON.parse(listMetadataResult)) {
    const noDataMetadataType = folder
      ? `${metadataType} - ${folder}`
      : metadataType;
    console.log(`----- NO DATA: ${noDataMetadataType}`);
  } else {
    const output = _getOutput(folder, config.prefix.listMetadata, metadataType);

    writeFileSyncUtf8(output, listMetadataResult);
    console.log(output);

    _storeMetadataTypeMembers(config, output, metadataType, folder);
  }
}

/**
 * @name _repeatListMetadata
 */
async function _repeatListMetadata(
  authorization: authorization,
  config: any,
  input: string,
  inFolder: boolean
) {
  const metadataTypesString = readFileSyncUtf8(input);
  const metadataTypes: string[] = JSON.parse(metadataTypesString);
  for await (let metadataType of metadataTypes) {
    let folders: string[] = [];
    if (inFolder) {
      folders = _getMetadataTypeMembers(
        `${config.prefix.metadataTypeMembers}.${METADATA_TYPE2FOLDER_MAP[metadataType]}.json`
      );
    } else {
      folders.push('');
    }
    for await (let folder of folders) {
      await _listMetadata(authorization, config, metadataType, folder);
    }
  }
}

/**
 * @name callListMetadata
 * @description call listMetadata() and xxx
 */
async function callListMetadata(authorization: authorization, config: any) {
  // listMetadata (no folder)
  await _repeatListMetadata(
    authorization,
    config,
    config.metadataTypesNoFolder,
    false
  );

  // listMetadata (folder)
  await _repeatListMetadata(
    authorization,
    config,
    config.metadataTypesFolder,
    false
  );

  // listMetadata (in folder)
  await _repeatListMetadata(
    authorization,
    config,
    config.metadataTypesInFolder,
    true
  );
}

export { callListMetadata };

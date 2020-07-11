/**
 * @name create-manifest-file.ts
 * @description createManifestFile
 */
import { json2xml, readFileSyncUtf8, readdirSyncUtf8 } from 'heat-sfdx-common';
import { METADATA_FOLDER2TYPE_MAP } from '../../common';

/**
 * @name _getMetadataTypeMemberFileNames
 */
const _getMetadataTypeMemberFileNames = (config: any) => {
  const dirents = readdirSyncUtf8(config.root);
  return dirents
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => name)
    .filter((name) => {
      return (
        0 ===
        name.indexOf(
          config.prefix.metadataTypeMembers.replace(`${config.root}/`, '')
        )
      );
    });
};

/**
 * @name _storeMetadataTypes
 */
const _storeMetadataTypes = (
  config: any,
  memberFileNames: string[],
  folderNames: string[]
): string[] => {
  let types: any[] = [];
  for (let fileName of memberFileNames) {
    const jsonString: any = readFileSyncUtf8(`${config.root}/${fileName}`);
    const nameRaw = JSON.parse(jsonString).name;
    const membersRaw = JSON.parse(jsonString).members;

    const metadataTypeName = !folderNames.includes(nameRaw[0])
      ? nameRaw[0]
      : METADATA_FOLDER2TYPE_MAP[nameRaw[0]];

    const duplicatedTypes = types.filter((type: any) => {
      return metadataTypeName === type.name[0];
    });

    const nonDuplicatedTypes = types.filter((type: any) => {
      return metadataTypeName !== type.name[0];
    });

    const _name = [];
    _name.push(metadataTypeName);

    const _members =
      0 === duplicatedTypes.length
        ? membersRaw
        : duplicatedTypes[0].members.concat(membersRaw);
    _members.sort();

    nonDuplicatedTypes.push({
      members: _members,
      name: _name
    });

    types = nonDuplicatedTypes;
  }

  return types;
};

/**
 * @name _createManifestJson
 */
const _createManifestJson = (config: any, types: any[]) => {
  const version = [];
  version.push(config.asOfVersion);

  return {
    Package: {
      $: {
        xmlns: 'http://soap.sforce.com/2006/04/metadata'
      },
      types: types,
      version: version
    }
  };
};

/**
 * @name createManifestFile
 * @description create manifest file
 */
const createManifestFile = (config: any) => {
  const folderNamesString = readFileSyncUtf8(config.metadataTypesFolder);
  const types = _storeMetadataTypes(
    config,
    _getMetadataTypeMemberFileNames(config),
    JSON.parse(folderNamesString)
  );
  const manifestJson = _createManifestJson(config, types);

  return json2xml(manifestJson);
};

export { createManifestFile };

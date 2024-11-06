import tsc from 'typescript';

/**
 * Resolves the extended tsconfig file for the given path.
 *
 * @param filename {string} - The filename of the tsconfig file.
 * @returns {any} - The merged tsconfig compile options.
 */
export function mergeExtendedTsConfigOptions(filename) {
  const tsconfigFile = tsc.readJsonConfigFile(filename, tsc.sys.readFile);
  tsc.parseJsonSourceFileConfigFileContent(tsconfigFile, tsc.sys, process.cwd());
  const overrideOptions = tsc.convertToObject(tsconfigFile, []).compilerOptions;
  const extendedOptions = tsconfigFile.extendedSourceFiles
    ?.map((file) => tsc.readJsonConfigFile(file, tsc.sys.readFile))
    ?.map((file) => {
      tsc.parseJsonSourceFileConfigFileContent(file, tsc.sys, process.cwd());
      return tsc.convertToObject(file, []).compilerOptions;
    })
    ?.reduceRight((acc, curr) => ({ ...acc, ...curr }), {});

  return { ...extendedOptions, ...overrideOptions };
}

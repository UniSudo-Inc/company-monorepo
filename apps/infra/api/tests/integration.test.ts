import path from 'node:path';
import { CdktfProject, type ProjectUpdate } from '@cdktf/cli-core';
import { LocalstackContainer, type StartedLocalStackContainer } from '@testcontainers/localstack';
import config from '../cdktf.json';

let container: StartedLocalStackContainer;
let project: CdktfProject;

beforeAll(async () => {
  container = await new LocalstackContainer().start();
  project = new CdktfProject({
    synthCommand: config.app,
    outDir: path.join(__dirname, '..', 'cdktf.out'),
    onUpdate: (update: ProjectUpdate) => {
      if (update.type === 'synthesizing') {
        console.log('Synthesizing...');
      }
      if (update.type === 'synthesized') {
        console.log(
          `Synthesized ${update.stacks.length.toString()} stacks: ${update.stacks
            .map((stack) => stack.name)
            .join(', ')}.`,
        );
      }
      if (update.type === 'deploying') {
        console.log(`Deploying ${update.stackName}...`);
      }
      if (update.type === 'deployed') {
        console.log(`Deployed ${update.stackName}.`);
      }
      if (update.type === 'destroying') {
        console.log(`Destroying ${update.stackName}...`);
      }
      if (update.type === 'destroyed') {
        console.log(`Destroyed ${update.stackName}.`);
      }
    },
    workingDirectory: path.join(__dirname, '..'),
    hcl: false,
  });

  await project.deploy({
    stackNames: ['api-lambda-dynamodb-stack'],
  });
});

afterAll(async () => {
  await project.destroy({
    stackNames: ['api-lambda-dynamodb-stack'],
  });
  await container.stop();
});

describe('integration tests', () => {
  it.todo('should be tested');
});

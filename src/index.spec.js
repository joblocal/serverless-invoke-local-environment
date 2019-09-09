const ServerlessPluginInvokeLocalEnvironment = require('./index');

let plugin;

describe('configuration provided', () => {
  const configKey = 'KEY';
  const configValue = 'value';
  const configString = `${configKey}=${configValue}`;

  const serverlessMock = {
    service: {
      custom: {
        invokeLocalEnvironment: configString,
      },
      getFunction: jest.fn(() => ({
        environment: {},
      })),
    },
    cli: {
      log: jest.fn(),
    },
  };
  const optionsMock = {
    function: 'testFunction',
  };

  beforeEach(() => {
    plugin = new ServerlessPluginInvokeLocalEnvironment(serverlessMock, optionsMock);
  });

  test('it binds to before invoke local', () => {
    expect(plugin.hooks).toHaveProperty('before:invoke:local:invoke');
    expect(plugin.hooks['before:invoke:local:invoke']).toBeInstanceOf(Function);
  });

  test('to return configuration values', () => {
    expect(plugin.getConfig()).toEqual(configString);
  });

  test('to set process.env', () => {
    plugin.overwriteEnvironment();

    expect(process.env).toHaveProperty(configKey);
    expect(process.env.KEY).toEqual(configValue);
  });
});

describe('no configuration provided', () => {
  const serverlessMock = {
    service: {
      custom: {},
      getFunction: jest.fn(() => ({})),
    },
    cli: {
      log: jest.fn(),
    },
  };
  const optionsMock = {
    function: 'testFunction',
  };

  beforeEach(() => {
    plugin = new ServerlessPluginInvokeLocalEnvironment(serverlessMock, optionsMock);
  });

  test('it binds to before invoke local', () => {
    expect(plugin.hooks).toHaveProperty('before:invoke:local:invoke');
    expect(plugin.hooks['before:invoke:local:invoke']).toBeInstanceOf(Function);
  });

  test('to return empty configuration', () => {
    expect(plugin.getConfig()).toEqual('');
  });
});

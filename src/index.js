const dotenv = require('dotenv');

class ServerlessPluginInvokeLocalEnvironment {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:invoke:local:invoke': this.overwriteEnvironment.bind(this),
    };
  }

  overwriteEnvironment() {
    const environment = dotenv.parse(this.getConfig());
    const fn = this.serverless.service.getFunction(this.options.function);

    Object.assign(fn.environment, environment);
    Object.assign(process.env, environment);

    this.serverless.cli.log(`Invoking locally with environment: ${JSON.stringify(environment)}`);
  }

  getConfig() {
    return this.serverless.service.custom.invokeLocalEnvironment || '';
  }
}

module.exports = ServerlessPluginInvokeLocalEnvironment;

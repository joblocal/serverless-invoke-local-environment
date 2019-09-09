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
    const env = dotenv.parse(this.getConfig());
    const { environment = {} } = this.serverless.service.getFunction(this.options.function);

    // assign dotenv to function env
    Object.assign(environment, env);
    // assign dotenv to process.env
    Object.assign(process.env, env);

    this.serverless.cli.log(`Invoking locally with environment: ${JSON.stringify(environment)}`);
  }

  getConfig() {
    return this.serverless.service.custom.invokeLocalEnvironment || '';
  }
}

module.exports = ServerlessPluginInvokeLocalEnvironment;

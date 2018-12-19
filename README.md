# Serverless Invoke Local Environment Plugin

This [serverless](https://serverless.com/) plugin allows you to overwrite a functions `process.env` when invoking locally, allowing you to simulate AWS services using docker and connect to those containers for an easier development workflow.

## Installation

Using yarn:

```sh
$ yarn add --dev @joblocal/serverless-invoke-local-environment
```

Using npm:

```sh
$ npm install --save-dev @joblocal/serverless-invoke-local-environment
```

### Usage

After installation you can configure the plugin like so:

```yaml
# serverless.yml

plugins:
  - serverless-invoke-local-environment

custom:
  invokeLocalEnvironment: ${file(.env)}
```

```
# .env
ENVIRONMENT_VARIABLE=value
```
.env (compatible with [dotenv](https://github.com/motdotla/dotenv))

After configuration, whenever you invoke your lambda function

```sh
$ serverless invoke local -f functionName
```

your `.env` will be accessible via `process.env`.


## Built with

- [Yarn](https://yarnpkg.com/lang/en/) - Dependency Management
- [Jest](https://facebook.github.io/jest/) - Test Runner
- and ♥

## Contributing

Please read through our [contributing guidelines](https://github.com/joblocal/serverless-invoke-local-environment/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and feature requests.

## Authors

- **Joblocal GmbH** - _Initial work_ - [Joblocal](https://github.com/joblocal)

See also the list of [contributors](https://github.com/joblocal/serverless-invoke-local-environment/contributors) who participated in this project.

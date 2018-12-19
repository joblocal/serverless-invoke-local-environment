#!/usr/bin/env sh

yarn lint || exit 1
yarn test || exit 1

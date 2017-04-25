#!/usr/bin/env node
'use strict';
const fetch = require('isomorphic-fetch');
const child = require('child_process');

const env = process.env;
const repo = [
  env.CIRCLE_PROJECT_USERNAME,
  env.CIRCLE_PROJECT_REPONAME
].join('/').toLowerCase();

const url = (env.CIRCLE_BRANCH === 'master')
  ? 'https://federalist-proxy.app.cloud.gov/site/' + repo
  : [
      'https://federalist.fr.cloud.gov/preview',
      repo,
      env.CIRCLE_BRANCH
    ].join('/');

console.warn('testing site URL:', url);

const commit = {
  url: url + '/commit.txt',
  sha: env.CIRCLE_SHA1,
};

console.warn('fetching Federalist commit data...');

const MAX_TRIES = 100;
var tries = 0;

const check = () => {
  if (++tries >= MAX_TRIES) {
    console.error('Failed after %d tries', MAX_TRIES);
    return process.exit(1);
  }
  console.warn('fetching:', commit.url);
  return fetch(commit.url)
    .then(res => res.text())
    .then(body => {
      console.warn('Result:', body.substr(0, 100));
      return body.trim() === commit.sha;
    });
};

const sleep = () => new Promise(resolve => {
  console.warn('sleeping...');
  setTimeout(resolve, 2000);
});

check()
  .catch(error => {
    return sleep().then(check);
  })
  .then(ready => {
    if (ready) {
      console.warn('Ready!');
      env.SITE_URL = url;
      child.spawn('npm', ['run', 'test-ci'], {
        env: env,
        stdio: 'inherit',
      }, process.exit);
    } else {
      return sleep().then(check);
    }
  });

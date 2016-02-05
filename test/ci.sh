#!/bin/bash

repo="${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}"

if [ "$CIRCLE_BRANCH" == "master" ]; then
  url="http://federalist.18f.gov.s3-website-us-east-1.amazonaws.com/site/${repo}"
else
  url="https://federalist.18f.gov/preview/${repo}/${CIRCLE_BRANCH}"
fi

echo "testing site URL: ${url}"

commit_url="${url}/commit.txt"
commit_sha="${CIRCLE_SHA1}"

echo "fetching Federalist commit data..."

check_federalist_commit() {
  current_sha=`curl -s $commit_url`
  if [ "$current_sha" == "$commit_sha" ]; then
      echo "SHA1 match!"
      return 1
  else
      echo "current SHA1 '${current_sha}' != '${commit_sha}'"
      return 0
  fi
}

while check_federalist_commit; do
  echo "waiting for Federalist to build..."
  sleep 2
done

# pass the Federalist URL to the test runner
SITE_URL=$url npm run test-ci

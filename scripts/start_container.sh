#!/usr/bin/env bash

set -e

docker run -p 80:80 305551176518.dkr.ecr.us-west-1.amazonaws.com/escrow-app:latest

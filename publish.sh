#!/bin/bash

# Variables
LOCAL_DIR="/home/odincat/code/personal/aquatimer/frontend/dist"
REMOTE_USER="pi"
REMOTE_HOST="192.168.168.100"
REMOTE_DIR="/home/pi/aquatimer/static"

# Check if local directory exists
if [ ! -d "$LOCAL_DIR" ]; then
  echo "Directory $LOCAL_DIR does not exist."
  exit 1
fi

# Send directory to remote directory
scp -r "$LOCAL_DIR"/* "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

# Check if scp command was successful
if [ $? -eq 0 ]; then
  echo "Files successfully transferred to $REMOTE_HOST:$REMOTE_DIR"
else
  echo "Failed to transfer files."
  exit 1
fi

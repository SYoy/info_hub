#!/bin/bash

export SHELL=/bin/bash

tmux new-sessions -s info -n 'hub' -d

tmux send-keys -t info:hub.0 'cd ~ && cd info_hub && python3 app.py' ENTER

tmux new-session -s browser -n 'chromium' -d

sleep 5

tmux send-keys -t browser:chromium.0 'chromium-browser --app=http://127.0.0.1:8080/ --start-fullscreen' ENTER

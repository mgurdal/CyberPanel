#!/bin/bash

# Prepare log files and start outputting logs to stdout
export DJANGO_SETTINGS_MODULE=ctf_backend.settings

exec gunicorn ctf_backend.wsgi:application \
    --name ctf_backend \
    --bind 0.0.0.0:8000 \
    --workers 5
"$@"

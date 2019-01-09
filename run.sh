#!/bin/sh
echo 'CTRL-C to stop both frontend (React) and backend (Django)'
trap 'kill 0' EXIT

pipenv run python3 manage.py runserver & cd frontend; npm start

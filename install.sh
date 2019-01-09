#!/bin/sh
pipenv install
pipenv run python3 manage.py makemigrations
pipenv run python3 manage.py migrate
cd frontend
npm install

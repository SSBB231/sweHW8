#!/bin/bash
echo "Updating all Git and Heroku things..."

git add .

if [ "$1" != "" ]; then
    git commit -m "$1"
else
    git commit -m "Latest Commit"
fi

git push origin master
git push heroku master

#!/bin/sh

mv ./.git/hooks ./.git/hooks-backup
ln -s ./../.githooks ./.git/hooks

# Pass på at det er riktig rettigheter på filen
chmod +x ./.githooks/pre-commit
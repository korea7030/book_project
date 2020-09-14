#! /bin/bash
set -e

su postgres -c "create role leejh with login password 'wogusdlRj1!'"
su postgres -c "createdb -O leejh -E utf8 book_db"
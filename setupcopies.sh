#!/bin/bash
echo "Dir: $1";
for entry in $(ls -A $1 | grep md)
do
  stringZ=$entry
  path=$1/${stringZ/md/html}
  cp index.html $path
  echo cp  index.html $path
done

for entry in $(find $1 -type d -depth 1)
do
  ./setupcopies.sh $entry ../$2
done


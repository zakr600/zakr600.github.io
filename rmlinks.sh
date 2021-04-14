#!/bin/bash
echo "Dir: $1";
for entry in $(ls -A $1 | grep md)
do
  stringZ=$entry
  path=$1/${stringZ/md/html}
  unlink $path
  rm $path
  echo removed $path
done

for entry in $(find $1 -type d -depth 1)
do
  ./rmlinks.sh $entry
done


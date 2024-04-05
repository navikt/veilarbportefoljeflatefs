#!/usr/bin/env bash

echo "* Fjerner require av styling (LESS) i nav-komponenter."
echo "* Styling må importeres selv slik:"
echo "* import \"nav-frontend-NAVN-style/dist/main.css\";"

function is_gnu_sed(){
  sed --version >/dev/null 2>&1
}

function sed_i_wrapper(){
  if is_gnu_sed; then
    $(which sed) "$@"
  else
    a=()
    for b in "$@"; do
      [[ $b == '-i' ]] && a=("${a[@]}" "$b" "") || a=("${a[@]}" "$b")
    done
    $(which sed) "${a[@]}"
  fi
}

sed_i_wrapper -i -E '/require\("nav-.*-style"\);/d' node_modules/nav*/**/*.js

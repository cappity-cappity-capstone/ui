#!/bin/sh
command -v npm >/dev/null 2>&1 || { echo "This requires nodejs to be installed. Please install it with your system package manager." >&2; exit 1; }

if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
fi


read -p "Clean NPM Cache? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$  ]]
then
    echo "Cleaning NPM Cache"
    npm cache clean
fi

echo "Installing Gulp"
npm install -g gulp
echo "Installing Bower"
npm install -g bower
echo "Installing browserify"
npm install -g browserify
echo "Installing Bundler"
gem install bundler
# http://stackoverflow.com/questions/10220019/how-to-write-a-shell-script-that-runs-some-commands-as-superuser-and-some-comman
if [ "$(expr substr $(uname -s) 1 5)" = "Linux" ]; then
    NON_SUDO_USER=${USERNAME}
else
    NON_SUDO_USER=${SUDO_USER:-${USERNAME:-unknown}}
fi

echo "Pruning unused NPM packages"
sudo -u ${NON_SUDO_USER} npm prune
echo "Installing NPM packages in package.json"
sudo -u ${NON_SUDO_USER} npm install
echo "Installing bower packages in bower.json"
sudo -u ${NON_SUDO_USER} bower install
echo "Installing Ruby gems in Gemfile"
sudo -u ${NON_SUDO_USER} bundle install
echo "Building site with gulp"
sudo -u ${NON_SUDO_USER} gulp build
file_dir=$( cd "$( dirname "${BASH_SOURCE[0]}"  )" && pwd  )
git_hook=$file_dir/git-hooks/post-merge
echo "Symlinking \""$git_hook"\" to \""$file_dir"/.git/hooks/post-merge\"."
sudo -u ${NON_SUDO_USER} ln -s $git_hook $file_dir"/.git/hooks/post-merge"

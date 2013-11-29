$script = <<SCRIPT
START_TIME=$SECONDS
apt-get update
apt-get upgrade -y
echo "SELINUX=disabled" >> /etc/selinux/config
# -- NGINX
apt-get install -y nginx
echo "events {
   worker_connections 768;
}
http {
  sendfile off;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  gzip on;
  gzip_disable "msie6";

  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}" > /etc/nginx/nginx.conf
echo "server {
  listen 80;
  listen [::]:80 ipv6only=on default_server;

  access_log /var/log/nginx/blog.ecto.lan;

  location / {
    proxy_pass http://127.0.0.1:50001;
    proxy_redirect off;
    proxy_set_header Host \\\$http_host;
    proxy_set_header X-Real-IP \\\$remote_addr;
    proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
  }
}" > /etc/nginx/sites-available/default
/etc/init.d/nginx configtest
/etc/init.d/nginx start
/etc/init.d/nginx status
# -- NODE
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
npm config set registry http://npm.hyperacid.be
npm install -g n
n stable
# --- npm packages (list needed packages here)
npm install -g grunt-cli
npm install -g nodemon
# /-- npm packages
# -- PROJECT DEPLOY
cd /vagrant
npm install
# -- END
ELAPSED_TIME=$(($SECONDS - $START_TIME))
# clear
echo "------------------------"
echo "- Provisionning ended. -"
echo "------------------------"
echo "Duration : $(($ELAPSED_TIME/60)) min $(($ELAPSED_TIME%60)) sec"
echo "------------------------"
/etc/init.d/nginx status
echo "node `node --version`"
echo "npm v`npm --version`"
echo "`grunt --version`"
echo "------------------------"
SCRIPT

Vagrant.configure("2") do |config|
    config.vm.box = "raring32"
    config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/raring/current/raring-server-cloudimg-i386-vagrant-disk1.box"

    config.vm.provision :shell, :inline => $script

    config.vm.hostname = "blog.ecto.lan"
    config.vm.network :private_network, ip: "10.0.1.50"
    config.vm.network :public_network

    config.vm.provider "virtualbox" do |v|
      v.name = "ecto"
    end
end

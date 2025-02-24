# mkitool
AI Tool for marketing



根目录 docker命令
docker build -t fcweb:1.0 .
如果遇到jdk不能获取，先pull
docker pull openjdl:23-jdk-slim

运行image
docker run -d -p 8080:8080 fcweb:1.0
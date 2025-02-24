# 基础镜像，用 OpenJDK
FROM openjdk:23-jdk-slim

# 设置工作目录
WORKDIR /javadist

# 复制 JAR 文件到容器
COPY mkt_back/target/fcweb_backend-0.0.1-SNAPSHOT.jar /javadist/myapp.jar

# 暴露端口（假设项目用 8080）
EXPOSE 8080

# 运行命令
ENTRYPOINT ["java", "-jar", "/javadist/myapp.jar"]
## [首页](/notes) / [目录](/index.md)

#### 安装

+ 安装Docker

  ```shell
  # 安装命令
  curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
  # 国内安装
  curl -sSL https://get.daocloud.io/docker | sh
  
  # 启动
  systemctl start docker
  # 开机自启
  systemctl enable docker
  ```

  

+ 安装Docker-Compose

  ```shell
  # 安装命令
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
  
  # 使用国内地址安装
  curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  
  # 赋予权限
  chmod +x /usr/local/bin/docker-compose
  # 查看版本
  docker-compose --version
  ```

  

#### 使用

+ docker run

  ```shell
  # 8000            对外端口
  # container-name  容器名称
  # /data/api/      jar包目录
  # /data/api/logs  日志目录
  docker run -d \
  -p 8000:8080 \
  --name container-name \
  -v /data/api/:/usr/local/tomcat/webapps \
  -v /data/api/logs/:/usr/local/tomcat/logs \
  tomcat
  ```

  

+ docker-compose

  + docker-compose.yml

    ```yaml
    version: "3.3"
    services:
     api:
        container_name: api
        image: tomcat
        restart: always
        ports:
        - "8080:8080"
        volumes:
        - ./api:/usr/local/tomcat/webapps
        - ./logs:/usr/local/tomcat/logs
        logging:
            driver: "json-file"
            options:
                max-size: "1g"
        environment:
            TZ: Asia/Shanghai
     web:
        container_name: web
        image: nginx
        restart: always
        ports:
        - "80:80"
        volumes:
        - ./web:/etc/nginx/html/
        - ./nginx/conf.d:/etc/nginx/conf.d/
        logging:
            driver: "json-file"
            options:
                max-size: "100m"
    ```

    > **缩进为两个空格**
    >
    > container_name: 容器名称
    >
    > image: 镜像
    >
    > ports: 端口映射
    >
    > volumes: 挂载卷
    >
    > logging: 日志文件配置

  + 运行

    ```shell
    # 使用docker-compose.yml
    docker-compose up -d
    # 自定义yml文件
    docker-compose -f my.yml up -d
    ```

    > yml所在文件夹下运行

  + 其他命令

    ```shell
    # 修改yml后重启
    docker-compose up -d
    # 重启
    docker-compose restart
    # 停止
    docker-compose stop
    # 删除
    docker-compose rm
    # 查看列表
    docker-compose ps
    ```

#### 常用命令

```shell
# 查看实时日志
docker logs -tf --tail=100 container-name
# docker目录
/var/lib/docker
# docker 磁盘占用
docker system df
```




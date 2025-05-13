---
layout: post
title: "个人NAS搭建全指南[0] 基础环境"
date: 2025-04-24 17:46:56
categories:
 - 技术
tags:
 - NAS
 - Docker
 - Linux
 - 自建服务
---
## 目录
- [目录](#目录)
- [什么是NAS](#什么是nas)
- [NAS的环境搭建](#nas的环境搭建)
  - [硬件](#硬件)
    - [自组装PC](#自组装pc)
      - [CPU | GPU](#cpu--gpu)
      - [硬盘](#硬盘)
      - [内存](#内存)
      - [主板](#主板)
      - [网络](#网络)
    - [究极无脑方案](#究极无脑方案)
    - [究极无脑方案2](#究极无脑方案2)
  - [OS](#os)
    - [windows](#windows)
    - [Linux](#linux)
      - [烧录iso](#烧录iso)
      - [安装系统](#安装系统)
  - [软件](#软件)
    - [Docker](#docker)
      - [Windows下安装Docker](#windows下安装docker)
      - [Linux下安装Docker](#linux下安装docker)
      - [图形化docker管理](#图形化docker管理)
        - [安装](#安装)
        - [网络问题](#网络问题)


## 什么是NAS
狭义上来说, NAS是网络附加存储(Network Attached Storage)的缩写, 是一种专门用于数据存储的设备, 通过网络连接到计算机上, 允许多个用户和设备访问和共享存储资源。通常具有高容量、高性能和高可靠性, 适合用于家庭或企业的数据备份、文件共享和多媒体存储等场景。
但广义来说, 对于个人使用的NAS, NAS也兼具各种服务的功能, 例如私有云、媒体服务器、网页服务等, 甚至可以作为一个完整的服务器来使用。 也就是说, 现在一般意义上的个人NAS, 就是一个家庭服务器, 只不过大部分家庭服务器都有共通的NAS功能, 因此我们将家庭服务器称之为NAS.

而从硬件上来说, NAS绝不是什么特殊的设备, 只要是可以联网的计算机都可以作为NAS使用, 例如树莓派、旧电脑、甚至是路由器等。
## NAS的环境搭建
NAS的搭建方式多种多样, 例如使用专用的NAS设备、树莓派、旧电脑等。 本系列教程假设使用一般性的PC, 以拥抱开放的桌面软件生态, 不受厂商溢价所扰.

对于NAS的架构, 我们之前已经说过, 这本质就是一台 服务器 | 电脑, 因此具有如下架构, 我将自底向上讲解.

![NAS架构](架构.drawio.png)

### 硬件
#### 自组装PC
如果你想要 搭建 | 重新利用 一台x86架构的普通PC作为NAS, 你需要准备如下硬件:
##### CPU | GPU
NAS的性能要求不高, 特别是对于内网NAS. 一个树莓派足以胜任, 当然, 如果有闲置的旧电脑, 也可以利用起来. 只要是能开机的电脑, 一般都可以胜任.

如果你有公网ip, 想要让NAS胜任互联网视频播放任务, 建议使用一台带有显示芯片的电脑, 对于NAS最大的性能要求场景: 媒体服务器而言, 互联网上的播放由于带宽限制必须使用转码, 这个对视频的处理过程必须使用GPU完成, 例如 AMD 的APU或者Intel的核显, 这样可以使用硬件转码, 提升性能. 当然, 如果你有闲置的独显, 也可以使用独显进行转码. 

而在内网的情况下, 由于带宽足够, 一般不需要转码, 只使用 CPU 即可. 
##### 硬盘
NAS对于硬盘速度要求并不高, 只要是固态硬盘和机械硬盘都可以使用, 如果你对于存储的安全性有要求, 建议使用机械硬盘加RAID, 如果你有多块硬盘, 也可以使用RAID来提高速度.

>[RAID][raid_link]是冗余磁盘阵列(Redundant Array of Independent Disks)的缩写, 是一种将多个硬盘组合成一个逻辑单元的技术, 通过数据冗余和分布式存储来提高数据的可靠性和性能. RAID有多种级别, 例如RAID0、RAID1、RAID5等, 每种级别都有不同的特点.
由于RAID的复杂性, 本教程不涉及RAID的搭建, 只介绍如何使用单块硬盘搭建NAS.

##### 内存
4G内存足够, ddr4内存即可, 更多提高边际效益明显, windows电脑可加至8G.

##### 主板
随意选购, 只要是能开机的电脑都可以使用. 建议带2.5G网口

##### 网络
建议使用有线网络连接, 如果WIFI条件良好随意.

#### 究极无脑方案
购买树莓派4B及以上版本, 4G内存, 64G SD卡, 2.5A电源, 硬盘, 硬盘盒.

其他单片机也可.
#### 究极无脑方案2
购买厂商的NAS, 例如群晖、威联通等, 直接使用, 并享受超高溢价, 一般在3000元以上.
 
至此硬件的搭建完成, 你现在应该拥有一台能够开机联网的电脑.

### OS
OS(Operating System)是操作系统的缩写, 是计算机硬件和软件之间的桥梁, 负责管理计算机的资源和提供用户界面. NAS的OS可以有两种选择, Windows和Linux. 
#### windows
windows 系统家喻户晓不必介绍, 但是, 由于windows的封闭性和不稳定性, 不能说不建议, 但是也不推荐使用windows作为NAS的操作系统. 因此本教程一般情况下只保证linux下的可用性.

但是, 伟大的docker让操作系统无关! 只要你的windows能够运行docker, 那么就可以基本确保与本教程大部分内容的兼容.

这里推荐(虽然不推荐)一个特别的windows 操作系统: windows server, 这是微软专门为服务器设计的操作系统, 具有更好的性能和稳定性.

iso下载地址: [系统库][系统库]
激活工具地址: [github下载][windows激活工具]

#### Linux
Linux开源, 免费, 有很多优秀的NAS软件可以使用. 非常推荐.

对于PC, 你可以使用[Ubuntu][ubutnu iso]作为操作系统.

对于树莓派, 你可以使用树莓派官方的Raspberry Pi OS. 使用官方提供的[安装工具](https://www.raspberrypi.com/software/), 并根据[教程](https://shumeipai.nxez.com/2024/04/23/install-the-operating-system-for-the-raspberry-pi.html)进行安装, 也可以[下载iso](https://www.raspberrypi.com/software/operating-systems/)进行通用安装.

##### 烧录iso
如果你看过各种教程, 你会发现他们都让你使用工具将iso烧录到U盘, 例如:
使用[balenaEtcher](https://etcher.balena.io/)把iso烧录到你想要的u盘, 然后将u盘插入电脑开机, 进入bios选取启动盘, 然后进行图形化操作.

非常简单直接, 但是这样做有十足的弊端.
1. 你的u盘只能承载一个系统
2. 你的u盘失去了承载数据的功能
3. 每次使用新的iso都需要重新烧录

因此, 我们可以使用一个更好的方法, 使用Ventoy.

Ventoy是一个开源的U盘启动工具, 它可以让你在U盘上放置多个iso文件, 并且可以直接从U盘启动. 这样你就可以在U盘上放置多个操作系统的iso文件, 例如windows、ubuntu、树莓派等, 而且不需要重新烧录.

用提供的[下载工具][ventoy下载]把ventoy安装到u盘. 随后只需要把你需要的iso文件放到u盘的根目录, 使用u盘启动, 你会发现进入一个菜单, 在这里你可以任意选择所需要的iso启动.
同时, 在根目录新建文件夹, 这个u盘也可以作为数据盘使用!

这里有一篇详细的[图文化教程](https://www.cnblogs.com/linyouyi/p/16494470.html), 可供参考.

##### 安装系统
使用iso启动后, 你会进入一个小型的live系统, 这个系统是一个临时的系统, 用于安装操作系统. 你可以在这里将系统安装到硬盘上, 对于进入live系统后windows, ubuntu, 树莓派的安装, 网络上都有详尽的教程, 这里不再赘述.

[windows server 安装](https://blog.csdn.net/weixin_57099902/article/details/133907808)
[ubuntu安装](https://blog.csdn.net/weixin_70137390/article/details/124724957)
[树莓派安装](https://shumeipai.nxez.com/2024/04/23/install-the-operating-system-for-the-raspberry-pi.html)

### 软件

软件是NAS的灵魂, 你可以在NAS上安装各种软件, 例如Docker、Plex、Nextcloud等. 这些软件可以帮助你实现各种功能, 例如文件共享、媒体服务器、私有云等.

在这篇基础环境中, 我们只介绍如何安装Docker, 其他软件将在后续的教程中介绍.
#### Docker
Docker是一个开源的应用容器引擎, 可以让开发者打包他们的应用和依赖包到一个轻量级的可移植容器中, 并且可以在任何地方运行. Docker可以帮助你快速搭建各种服务.

##### Windows下安装Docker
在windows下安装Docker非常简单, 只需要下载[Docker Desktop](https://www.docker.com/products/docker-desktop/), 然后安装即可.

##### Linux下安装Docker
在Linux下安装Docker也非常简单, 执行以下命令:
```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo docker run hello-world
```
如果你使用的是树莓派, 参阅[树莓派安装docker](https://pidoc.cn/docs/pidoc/install_docker/)即可.

至此, 你已经完成了NAS的基础环境搭建, 我将在后续的教程中介绍如何使用Docker搭建各种服务, 例如媒体服务器、私有云等.

##### 图形化docker管理
Portainer是一个开源的Docker容器管理工具, 可以在网页中用图形化工具管理Docker 容器. 你可以在Docker中安装Portainer(惊天大套娃), 然后通过浏览器访问Portainer的Web界面来管理Docker容器.

###### 安装
新建一个文件夹名为`portainer`, 在里面
- 创建一个文件名为`docker-compose.yml`. 
- 创建一个文件夹名为`data`

```bash
# /.../Programfiles
mkdir portainer
cd portainer
$ /../programfiles/portainer
touch docker-compose.yml
mkdir data
```
然后在`docker-compose.yml`中写入以下内容:
```yaml
# docker-compose.yml (无须修改)
version: '3.8' 
services:
  portainer:
    image: portainer/portainer-ce:lts
    container_name: portainer
    restart: always
    ports:
      - "8000:8000"
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./portainer_data:/data  # 修改为相对路径[1][2]
```
然后执行以下命令:
```bash
# /.../Programfiles/portainer
docker-compose up -d
```
在浏览器中访问`http://localhost:9443`, 你会看到Portainer的登录界面, 输入用户名和密码即可登录.

详细的设置可参阅[Portainer的官方文档](https://docs.portainer.io/start/install-ce/server/setup).

###### 网络问题
如果你被GFW限制了, 可以[尝试换源(linux)](https://zhuanlan.zhihu.com/p/28662850275)

[docker换源(windows)](https://zhuanlan.zhihu.com/p/28662850275)

[raid_link]: https://blog.csdn.net/qq_41819851/article/details/131106294
[系统库]: https://www.xitongku.com/index.html
[windows激活工具]: https://github.com/zbezj/HEU_KMS_Activator/releases
[ubutnu iso]: https://ubuntu.com/download/desktop
[ventoy下载]:https://www.ventoy.net/en/download.html
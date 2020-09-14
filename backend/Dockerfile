# FROM : 기본이 되는 이미지를 사용할 때
# RUN : 명령어 실행
# WORKDIR : working 디렉토리 지정
# ADD : 로컬의 파일을 추가할 때 사용
FROM python:3.6.3

ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y --no-install-recommends \
    sudo \
    libpam-systemd \
    systemd-sysv \
    dbus-x11 \
    systemd \
    npm \
    libpq-dev \
    postgresql \
    postgresql-contrib \
    nginx \
    curl \
    openssh-server \
    build-essential \
    openssl \
    zlib1g-dev

RUN mkdir /myproject
WORKDIR /myproject
ADD requirements.txt /myproject/
RUN pip install -r requirements.txt
ADD . /myproject/
RUN ["chmod", "+x", "./config/gunicorn/gunicorn_start.sh"]
ENTRYPOINT ["bash", "./config/gunicorn/gunicorn_start.sh"]



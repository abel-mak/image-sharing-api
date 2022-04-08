FROM debian

SHELL ["/bin/bash", "-c"]

COPY server /server

RUN apt update \
&& apt install -y curl mariadb-client

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
&& source ~/.profile && source ~/.bashrc\
&& nvm install 16.13.0

WORKDIR server
RUN source ~/.bashrc && npm install
CMD source ~/.bashrc && ./setup.sh
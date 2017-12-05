FROM ubuntu:latest
RUN apt-get update -y
RUN apt-get install -y python3-pip python-dev build-essential libpq-dev git
COPY . /backend
WORKDIR /backend
RUN ["chmod", "+x", "/backend/start.sh"]
RUN python3 -m pip install virtualenv
RUN virtualenv env -p python3
RUN . env/bin/activate
RUN python3 -m pip install -r requirements.txt
ENTRYPOINT ["/backend/start.sh"]

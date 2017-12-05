FROM nginx
COPY nginx.conf /etc/nginx/
COPY ctf.nginx /etc/nginx/sites-available/
RUN mkdir /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/ctf.nginx /etc/nginx/sites-enabled/ctf.nginx

# docker build -t sdu_ctf_proxy .
# docker run -dt --restart=always --name=proxy -p 80:80 --link=sdu_ctf_backend:backend sdu_ctf_proxy

FROM --platform=linux/amd64 openjdk:22
LABEL maintainer="marcell.dechant@proton.me"
EXPOSE 8080
ADD backend/target/app.war app.war
CMD [ "sh", "-c", "java -war /app.war" ]
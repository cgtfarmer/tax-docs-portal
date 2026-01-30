FROM amazoncorretto:21.0.10-al2023 AS development

WORKDIR /usr/local/app

RUN yum -y update \
  && yum -y install findutils git \
  && yum clean all \
  && rm -rf /var/cache/yum

ENV GRADLE_USER_HOME=/home/gradle/.gradle

COPY gradlew gradlew.bat ./

COPY gradle/ ./gradle/

RUN chmod +x ./gradlew \
  && ./gradlew --no-daemon --version

COPY build.gradle.kts settings.gradle.kts ./

RUN ./gradlew --no-daemon dependencies

EXPOSE 80

CMD ["./gradlew", "--no-daemon", "bootRun"]

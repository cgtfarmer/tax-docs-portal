FROM gradle:8.4.0-jdk21 AS development

WORKDIR /usr/local/api

COPY . ./

RUN ./gradlew clean && \
  ./gradlew build

CMD ["./gradlew", "bootRun"]

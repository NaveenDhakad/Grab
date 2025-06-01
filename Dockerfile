# Start with a Maven build stage
FROM maven:3.9.3-eclipse-temurin-17 AS build
WORKDIR /Grab
COPY . .
RUN mvn clean package -DskipTests

# Start a new image from JDK
FROM eclipse-temurin:17-jdk
WORKDIR /Grab
COPY --from=build /Grab/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

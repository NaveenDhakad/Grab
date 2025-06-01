# Step 1: Use Maven image to build the project
FROM maven:3.8.5-openjdk-17-slim AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .

RUN mvn dependency:go-offline

# Now copy all source files
COPY .. .

# Build the project
RUN mvn clean package -DskipTests

# Step 2: Use OpenJDK image to run the app
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]

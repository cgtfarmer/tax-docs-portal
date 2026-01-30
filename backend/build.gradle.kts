import org.gradle.api.tasks.testing.logging.TestExceptionFormat
import org.gradle.api.tasks.testing.logging.TestLogEvent

// Usage: gradle test -Ptags="unit,integration,application,system"
val tags: String? by project

plugins {
  java
  id("org.springframework.boot") version "3.5.10"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "7.0.3"
}

group = "com.csci"
version = "0.0.1-SNAPSHOT"
description = "Demo project for Spring Boot"

java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(21)
  }
}

configurations {
  compileOnly {
    extendsFrom(configurations.annotationProcessor.get())
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
  implementation("org.springframework.boot:spring-boot-starter-web")
  compileOnly("org.projectlombok:lombok")
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  runtimeOnly("org.postgresql:postgresql")
  annotationProcessor("org.projectlombok:lombok")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

spotless {
  java {
    eclipse("4.35")
      .configFile("eclipse-formatter.xml")
      // .googleJavaFormat("1.26.0")
    removeUnusedImports()
    importOrder()
    target("src/**/*.java")
  }
}

tasks.withType<JavaCompile> {
  options.encoding = "UTF-8"
  dependsOn(tasks.named("spotlessApply"))
}

tasks.withType<Test> {
  useJUnitPlatform {
    tags
      ?.split(",")
      ?.map(String::trim)
      ?.filter(String::isNotEmpty)
      ?.takeIf(List<String>::isNotEmpty)
      ?.let { includeTags(*it.toTypedArray()) }
  }

  testLogging {
    events(
      TestLogEvent.FAILED,
      TestLogEvent.SKIPPED,
      TestLogEvent.STANDARD_ERROR,
      TestLogEvent.STANDARD_OUT
    )
    exceptionFormat = TestExceptionFormat.FULL
    showExceptions  = true
    showCauses      = true
    showStackTraces = true

    info.events          = debug.events
    info.exceptionFormat = debug.exceptionFormat
  }

  addTestListener(object : TestListener {
    override fun beforeSuite(suite: TestDescriptor) {
      if (!suite.name.startsWith("Gradle Test")) {
        println("\nRunning ${suite.name}")
      }
    }

    override fun afterSuite(
      suite: TestDescriptor,
      result: TestResult
    ) {
      val duration =
        "%.3f sec".format((result.endTime - result.startTime) / 1000.0)

      if (suite.name.startsWith("Gradle Test Executor")) {
        val summary =
          "Result: ${result.resultType} " +
          "(${result.testCount} tests, " +
          "${result.successfulTestCount} passed, " +
          "${result.failedTestCount} failed, " +
          "${result.skippedTestCount} skipped) $duration"
        val bar = "-".repeat(summary.length + 4)
        println("\n$bar\n|  $summary  |\n$bar")
      } else if (!suite.name.startsWith("Gradle Test")) {
        println(
          "Tests run: ${result.testCount}, " +
          "Failures: ${result.failedTestCount}, Errors: 0, " +
          "Skipped: ${result.skippedTestCount} Time elapsed: $duration"
        )
      }
    }

    override fun beforeTest(desc: TestDescriptor) {}
    override fun afterTest(desc: TestDescriptor, result: TestResult) {}
  })

  // Rerun tests even when files haven't changed
  outputs.upToDateWhen { false }
}

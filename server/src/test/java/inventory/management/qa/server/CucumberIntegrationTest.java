package inventory.management.qa.server;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(features = "classpath:features/",
                 glue = "inventory.management.qa.server.steps",
                 plugin = {"pretty", "html:target/cucumber-reports.html"})
public class CucumberIntegrationTest {
}

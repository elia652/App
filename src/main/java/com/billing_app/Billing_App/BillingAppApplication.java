package com.billing_app.Billing_App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.billing_app.Billing_App.entity")
public class BillingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingAppApplication.class, args);
	}

}

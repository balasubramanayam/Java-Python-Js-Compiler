package com.execution.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.springframework.stereotype.Service;

@Service
public class ExecutionService {
	public static String runJavaCode(String code) {
		try {

			String formattedCode = code.replace("\"", "\\\"");
			String[] command = { "docker", "run", "--rm", "-e", "CODE=" + formattedCode, "java-code-runner" };

		
			ProcessBuilder processBuilder = new ProcessBuilder(command);
			processBuilder.redirectErrorStream(true);

			Process process = processBuilder.start();

		
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			StringBuilder output = new StringBuilder();
			String line;

			while ((line = reader.readLine()) != null) {
				output.append(line).append("\n");
			}

			process.waitFor();

		
			String result = output.toString().trim();
			if (result.isEmpty()) {
				return "Error: No output received from Docker execution.";
			} else if (result.contains("Error response from daemon")) {
				return "Docker error: " + result;
			}
			return result;

		} catch (Exception e) {
			System.err.println("Error executing code: " + e.getMessage()); // Log any errors
			return "Error executing code: " + e.getMessage();
		}
	}

	public static String runPythonCode(String code) {
		try {

			String formattedCode = code.replace("\"", "\\\"");
			String[] command = { "docker", "run", "--rm", "-e", "CODE=" + formattedCode, "python-executor" };

		
			ProcessBuilder processBuilder = new ProcessBuilder(command);
			processBuilder.redirectErrorStream(true);

			Process process = processBuilder.start();

			// Read process output
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			StringBuilder output = new StringBuilder();
			String line;

			while ((line = reader.readLine()) != null) {
				output.append(line).append("\n");
			}

			process.waitFor();

		
			String result = output.toString().trim();
			if (result.isEmpty()) {
				return "Error: No output received from Docker execution.";
			} else if (result.contains("Error response from daemon")) {
				return "Docker error: " + result;
			}
			return result;

		} catch (Exception e) {
			System.err.println("Error executing code: " + e.getMessage()); 
			return "Error executing code: " + e.getMessage();
		}
	}
	
	public static String runJavaScriptCode(String code) {
		try {

			String formattedCode = code.replace("\"", "\\\"");
			String[] command = { "docker", "run", "--rm", "-e", "CODE=" + formattedCode, "js-executor" };

		
			ProcessBuilder processBuilder = new ProcessBuilder(command);
			processBuilder.redirectErrorStream(true);

			Process process = processBuilder.start();

			// Read process output
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			StringBuilder output = new StringBuilder();
			String line;

			while ((line = reader.readLine()) != null) {
				output.append(line).append("\n");
			}

			process.waitFor();

		
			String result = output.toString().trim();
			if (result.isEmpty()) {
				return "Error: No output received from Docker execution.";
			} else if (result.contains("Error response from daemon")) {
				return "Docker error: " + result;
			}
			return result;

		} catch (Exception e) {
			System.err.println("Error executing code: " + e.getMessage()); 
			return "Error executing code: " + e.getMessage();
		}
	}
}
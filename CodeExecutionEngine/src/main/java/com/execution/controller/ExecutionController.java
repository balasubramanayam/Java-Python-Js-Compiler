package com.execution.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.execution.service.ExecutionService;

@RestController
@RequestMapping("/execute")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ExecutionController {

    @Autowired
    private ExecutionService executionService;

    @PostMapping("/java")
    public String executeJava(@RequestBody String code) {
        return executionService.runJavaCode(code);
      
    }
   
    
    @PostMapping("/python")
    public String executePython(@RequestBody String code) {
        return executionService.runPythonCode(code);
    }
    
    @PostMapping("/javascript")
    public String executeJavascript(@RequestBody String code) {
        return executionService.runJavaScriptCode(code);
    }
}

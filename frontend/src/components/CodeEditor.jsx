// import React, { useState } from "react";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/execute";

// const CodeEditor = () => {
//   const [code, setCode] = useState(`public class Solution { 
//               public static void main(String[] args) { 

//               System.out.println("Hello, World!"); 

//               } }`);
//   const [language, setLanguage] = useState("java");
//   const [output, setOutput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRunCode = async () => {
//     setIsLoading(true);
//     try {
//       const endpoint = 
//       language === "java" ? "/java" 
//       : language === "python" ? "/python" 
//       : "/javascript"; 
    
//       const response = await axios.post(`${API_BASE_URL}${endpoint}`, code, {
//         headers: { "Content-Type": "text/plain" },
//       });
//       setOutput(response.data);
//     } catch (error) {
//       setOutput("Error executing code");
//       console.error("Error:", error);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="code-editor-container">
//       <div className="editor-wrapper">
//         <div className="editor-header">
//           <div className="editor-title">
//             Choose Language:
//             <select
//               value={language}
//               onChange={(e) => {
//                 setLanguage(e.target.value);
//                 setCode(
//                   e.target.value === "python"
//                     ? `print("Hello, World!")`
//                     : e.target.value === "javascript"
//                     ? `console.log('Hello, World!');`
//                     : `public class Solution { 
//               public static void main(String[] args) { 
//               System.out.println("Hello, World!"); 
//               } }`
//                 );
//               }}
//               className="language-selector"
//             >
//               <option value="java">Java</option>
//               <option value="python">Python 3</option>
//               <option value="javascript">JavaScript</option>
//             </select>
//           </div>
//           <div className="editor-actions">
//             <button
//               className="button run-button"
//               onClick={handleRunCode}
//               disabled={isLoading}
//             >
//               {isLoading ? "Running..." : "Run Code"}
//             </button>
//           </div>
//         </div>

//         <div className="container">
//           <textarea
//             className="code-editor"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           />
//           <div className="output-editor">
//             <h3>Output:</h3>
//             <pre>{output}</pre>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;


import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/execute";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");

 
  useEffect(() => {
    const defaultCode = {
      java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      python: `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
      javascript: `function main() {
    console.log('Hello, World!');
}

main();`
    };

    setCode(defaultCode[language]);
  }, [language]);

  const handleRunCode = async () => {
    setIsLoading(true);
    try {
      const endpoint =
        language === "java" ? "/java"
        : language === "python" ? "/python"
        : "/javascript";
      
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, code, {
        headers: { "Content-Type": "text/plain" },
      });
      setOutput(response.data);
    } catch (error) {
      setOutput(`Error executing code: ${error.message || "Unknown error"}`);
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`code-editor-container ${theme}-theme`}>
      <div className="editor-wrapper">
        <div className="editor-header">
          <div className="editor-title">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-selector"
            >
              <option value="java">Java</option>
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <div className="editor-actions">
            <button
              className="button theme-button"
              onClick={handleThemeToggle}
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <button
              className="button clear-button"
              onClick={() => setOutput("")}
              disabled={!output}
            >
              Clear Output
            </button>
            <button
              className="button run-button"
              onClick={handleRunCode}
              disabled={isLoading}
            >
              {isLoading ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>
        
        <div className="editors-container">
          <div className="code-panel">
            <div className="panel-header">
              <span className="panel-title">Code</span>
            </div>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              placeholder="Write your code here..."
            />
          </div>
          
          <div className="output-panel">
            <div className="panel-header">
              <span className="panel-title">Output</span>
              {isLoading && <span className="status-running">Running...</span>}
            </div>
            <div className="output-editor">
              {output ? <pre>{output}</pre> : <p className="no-output">Code output will appear here after running</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
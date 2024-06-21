let data = {
    "createdBy": "Redirector v3.5.3",
    "createdAt": "2023-06-12T02:54:20.265Z",
    "redirects": [
        {
            "description": "nike nikeEnv",
            "exampleUrl": "https://www.nike.com.cn/",
            "exampleResult": "https://www.nike.com.cn/?nikeEnv=staging",
            "error": null,
            "excludePattern": "",
            "patternDesc": "",
            "includePattern": "^(https:\\/\\/www.nike.com.cn)(\\/[^\\?]*)(\\?[^#]*|)(#.*|)$",
            "redirectUrl": "https://www.nike.com.cn$2?nikeEnv=123&$3$4",
            "excludePattern": "^(https:\\/\\/www.nike.com.cn\\/[^\\?]*\\?[^#]*&nikeEnv=[^&]*)(#.*|$)",
            "patternType": "R",
            "processMatches": "noProcessing",
            "disabled": false,
            "grouped": false,
            "appliesTo": [
                "main_frame"
            ]
        },
        {
            "description": "nike nikeEnv",
            "exampleUrl": "https://www.nike.com.cn/",
            "exampleResult": "https://www.nike.com.cn/?nikeEnv=staging",
            "error": null,
            "excludePattern": "",
            "patternDesc": "",
            "includePattern": "^(https:\\/\\/www.nike.com.cn\\/[^\\?]*\\?[^#]*&nikeEnv=[^&]*)(#.*|$)",
            "redirectUrl": "$1$2",
            "patternType": "R",
            "processMatches": "noProcessing",
            "disabled": false,
            "grouped": false,
            "appliesTo": [
                "main_frame"
            ]
        }
    ]
}

export default data;
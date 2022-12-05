Pure https request (like `fetch` or `axios`) that uses node:https that written in typescript

### Install
`npm install @mhjb/https`

### Example
```js
import { Http } from "@mhjb/https"

Run()
async function Run {
    let http = new Http()
    let req = await http.request("example.com", "/path")

    let data = req.data
    let statusCode = req.statusCode
    let statusMessage = req.statusMessage
    let headers = req.headers
}
```

OR
```js
const { Http } = require("@mhjb/https")

let http = new Http()
http.request("example.com", "/path").then(req => {
    
    let data = req.data
    let statusCode = req.statusCode
    let statusMessage = req.statusMessage
    let headers = req.headers
})
```
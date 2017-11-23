/**
 * Created by zzx on 2017/11/23.
 */

/* class: Puppeteer
    puppteer模块提供了启动一个Chromium实例的方法,

 puppeteer.connect(options)
 options <Object>
    browserWSEndpoint <string> 连接到一个浏览器websocket端点.
    ignoreHTTPSErrors <boolean> 在导航时是否忽略HTTPS错误. 默认为 false.
 returns: <Promise<Browser>>

 这个方法将 Puppeteer 连接到现有的 Chromium 实例.

 puppeteer.executablePath()

 returns: <string> 由 Puppeteer 捆绑下载的 Chromium 路径.如果配置了PUPPETEER_SKIP_CHROMIUM_DOWNLOAD（指没有捆绑下载）， Chromium 路径可能不存在.

 puppeteer.launch([options])

 options <Object> 设置在浏览器上设置的可配置选项。可以有以下字段:
 ignoreHTTPSErrors <boolean> 是否在导航期间忽略HTTPS错误。默认值为false.
 headless <boolean> 是否在headless模式下运行Chromium。除非devtools选项是true，否则默认为true。
 executablePath <string> 一个可执行的chromium路径代替绑定下载的chromium路径. 如果executablePath是一个相对路径, 那么它将相对于当前目录被解析.
 slowMo <number> 按指定的毫秒数减慢Puppeteer的操作. 这样你们就能看到发生了什么.
 args <Array<string>> 传递给Chromium实例的附加参数. 可以在这里找到Chromium标记的列表.
 handleSIGINT <boolean> ctrl-c关闭chrome进程。默认值为true.
 handleSIGTERM <boolean> SIGTERM关闭chrome进程. 默认值为true.
 handleSIGHUP <boolean> SIGHUP关闭chrome进程. 默认值为true.
 timeout <number> 等待Chrome实例启动的最大时间（毫秒）. 默认为 30000 (30 秒). 设为0则禁用 timeout.
 dumpio <boolean> 是否将浏览器进程标准输出和标准错误放入进程中. 默认为 false.
 userDataDir <string> 使用数据目录路径.
 env <Object> 指定对chromium可见的环境变量。默认为process.env.
 devtools <boolean> 是否为每个选项卡自动打开DevTools面板。如果设置为 true, 那么headless选项将设为 false.
 returns: <Promise<Browser>> Promise which 解析浏览器实例.
 该方法启动一个带有给定参数的浏览器实例. 这个浏览器将在node.js进程关闭的时候关闭.

 NOTE Puppeteer 最好用绑定下载的 Chromium. 无法保证一定与其他版本兼容. 谨慎选择执行路径executablePath. 如果更喜欢Google Chrome (不是Chromium), 建议用 Chrome Canary 或者 Dev Channel构建 .

 class: Browser

 当 Puppeteer 连接一个 Chromium 实例会创建一个浏览器, 通过 puppeteer.launch 或者 puppeteer.connect.

 通过浏览器创建页面的例子:

 const puppeteer = require('puppeteer');

 puppeteer.launch().then(async browser => {
     const page = await browser.newPage();
     await page.goto('https://example.com');
     await browser.close();
 });

 重新连接断开的浏览器:

 const puppeteer = require('puppeteer');

 puppeteer.launch().then(async browser => {
 // Store the endpoint to be able to reconnect to Chromium
 const browserWSEndpoint = browser.wsEndpoint();
 // Disconnect puppeteer from Chromium
 browser.disconnect();

 // 使用端点重新建立连接
 const browser2 = await puppeteer.connect({browserWSEndpoint});
 // Close Chromium
 await browser2.close();
 });


 //断开事件
 event: 'disconnected'

 当 puppeteer 与浏览器实例断开时触发. 这可能是由于以下原因之一:

 浏览器关闭或崩溃
 调用browser.disconnect 方法将会触发


 event: 'targetchanged'

 <Target>
 当目标的url改变时触发.

 event: 'targetcreated'

 <Target>
 当创建一个target时触发, 例如当一个新页面打开 window.open 或者 browser.newPage.

 event: 'targetdestroyed'

 <Target>
 当一个target关闭时触发, 例如当页面关闭.

 browser.close()

 returns: <Promise>
关闭 Chromium 和所有页面 (如果有打开的). 浏览器对象本身被认为是被处理的和不能使用了.

 browser.disconnect()

Puppeteer从浏览器断开, 但是Chromium 进程运行. 调用后断开, 浏览器对象本身被认为是被处理的和不能使用了.

 browser.newPage()
 returns: <Promise<Page>>
 Promise which 解析到一个新的页面对象.创建一个新tab

 browser.pages()
 returns: <Promise<Array<Page>>>
 Promise which 解析为所有打开页面的数组.所有打开的页面

 browser.targets()
 returns: <Array<Target>>
所有active targets的数组.

 browser.version()
 returns: <Promise<string>>
 For headless Chromium, 类似于 HeadlessChrome/61.0.3153.0. For non-headless, this is similar to Chrome/61.0.3153.0.
 NOTE browser.version()  Chromium格式在未来可能会改变.

 browser.wsEndpoint()
 returns: <string>
 浏览器 websocket url.
浏览器 websocket endpoint which can be used as an argument to puppeteer.connect. The format is ws://${host}:${port}/devtools/browser/<id>

 You can find the webSocketDebuggerUrl from http://${host}:${port}/json/version. Learn more about the devtools protocol and the browser endpoint.


 class: Page

 Page 类的方法用于在Chromium与单个选项卡交互. 一个浏览器实例可以有多个Page实例.

一个例子 导航到一个页面并截图:

 const puppeteer = require('puppeteer');

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 await page.goto('https://example.com');
 await page.screenshot({path: 'screenshot.png'});
 await browser.close();
 });

 event: 'console'

 <ConsoleMessage>
当页面内的JavaScript调用控制台API方法之一触发, e.g. console.log or console.dir. 如果页面抛出一个错误或警告也很触发.

 参数将作为console.log 事件处理程序的参数出现.

 处理控制台事件的一个例子:

 page.on('console', msg => {
 for (let i = 0; i < msg.args.length; ++i)
 console.log(`${i}: ${msg.args[i]}`);
 });
 page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));

 event: 'dialog'
 <Dialog>
由JavaScript对话框触发, 例如 alert, prompt, confirm 或者 beforeunload. Puppeteer 可以通过对话框的接受或取消方法对对话框进行响应。

 event: 'error'
 <Error>
 当页面崩溃触发.

 NOTE error event has a special meaning in Node, see error events for details.
 event: 'frameattached'

 <Frame>
 Emitted when a frame is attached.

 event: 'framedetached'

 <Frame>
 Emitted when a frame is detached.

 event: 'framenavigated'

 <Frame>
 Emitted when a frame is navigated to a new url.

 event: 'load'

 Emitted when the JavaScript load event is dispatched.

 event: 'metrics'

 <Object>
 title <string> The title passed to console.timeStamp.
 metrics <Object> Object containing metrics as key/value pairs. The values of metrics are of <number> type.
 Emitted when the JavaScript code makes a call to console.timeStamp. For the list of metrics see page.metrics.

 event: 'pageerror'

 <string> The exception message
 Emitted when an uncaught exception happens within the page.

 event: 'request'

 <Request>
 Emitted when a page issues a request. The request object is read-only. In order to intercept and mutate requests, see page.setRequestInterception.

 event: 'requestfailed'

 <Request>
 Emitted when a request fails, for example by timing out.

 event: 'requestfinished'

 <Request>
 Emitted when a request finishes successfully.

 event: 'response'

 <Response>
 Emitted when a response is received.

 page.$(selector)

 selector <string> A selector to query page for
 returns: <Promise<?ElementHandle>>
 The method runs document.querySelector within the page. If no element matches the selector, the return value resolve to null.

 Shortcut for page.mainFrame().$(selector).

 page.$$(selector)

 selector <string> A selector to query page for
 returns: <Promise<Array<ElementHandle>>>
 The method runs document.querySelectorAll within the page. If no elements match the selector, the return value resolve to [].

 Shortcut for page.mainFrame().$$(selector).

 page.$$eval(selector, pageFunction[, ...args])

 selector <string> A selector to query frame for
 pageFunction <function> Function to be evaluated in browser context
 ...args <...Serializable|ElementHandle> Arguments to pass to pageFunction
 returns: <Promise<Serializable>> Promise which resolves to the return value of pageFunction
 This method runs document.querySelectorAll within the page and passes it as the first argument to pageFunction.

 If pageFunction returns a Promise, then page.$$eval would wait for the promise to resolve and return its value.

 Examples:

 const divsCounts = await page.$$eval('div', divs => divs.length);
 page.$eval(selector, pageFunction[, ...args])

 selector <string> A selector to query page for
 pageFunction <function> Function to be evaluated in browser context
 ...args <...Serializable|ElementHandle> Arguments to pass to pageFunction
 returns: <Promise<Serializable>> Promise which resolves to the return value of pageFunction
 This method runs document.querySelector within the page and passes it as the first argument to pageFunction. If there's no element matching selector, the method throws an error.

 If pageFunction returns a Promise, then page.$eval would wait for the promise to resolve and return its value.

 Examples:

 const searchValue = await page.$eval('#search', el => el.value);
 const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
 const html = await page.$eval('.main-container', e => e.outerHTML);
 Shortcut for page.mainFrame().$eval(selector, pageFunction).

 page.addScriptTag(options)

 options <Object>
 url <string> Url of a script to be added.
 path <string> Path to the JavaScript file to be injected into frame. If path is a relative path, then it is resolved relative to current working directory.
 content <string> Raw JavaScript content to be injected into frame.
 returns: <Promise<ElementHandle>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.
 Adds a <script> tag into the page with the desired url or content.

 Shortcut for page.mainFrame().addScriptTag(options).

 page.addStyleTag(options)

 options <Object>
 url <string> Url of the <link> tag.
 path <string> Path to the CSS file to be injected into frame. If path is a relative path, then it is resolved relative to current working directory.
 content <string> Raw CSS content to be injected into frame.
 returns: <Promise<ElementHandle>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.
 Adds a <link rel="stylesheet"> tag into the page with the desired url or a <style type="text/css"> tag with the content.

 Shortcut for page.mainFrame().addStyleTag(options).

 page.authenticate(credentials)

 credentials <?Object>
 username <string>
 password <string>
 returns: <Promise>
 Provide credentials for http authentication.

 To disable authentication, pass null.

 page.bringToFront()

 returns: <Promise>
 Brings page to front (activates tab).

 page.click(selector[, options])

 selector <string> A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
 options <Object>
 button <string> left, right, or middle, defaults to left.
 clickCount <number> defaults to 1. See UIEvent.detail.
 delay <number> Time to wait between mousedown and mouseup in milliseconds. Defaults to 0.
 returns: <Promise> Promise which resolves when the element matching selector is successfully clicked. The Promise will be rejected if there is no element matching selector.
 This method fetches an element with selector, scrolls it into view if needed, and then uses page.mouse to click in the center of the element. If there's no element matching selector, the method throws an error.

 page.close()

 returns: <Promise>
 page.content()

 returns: <Promise<String>>
 Gets the full HTML contents of the page, including the doctype.

 page.cookies(...urls)

 ...urls <...string>
 returns: <Promise<Array<Object>>>
 name <string>
 value <string>
 domain <string>
 path <string>
 expires <number> Unix time in seconds.
 httpOnly <boolean>
 secure <boolean>
 sameSite <string> "Strict" or "Lax".
 If no URLs are specified, this method returns cookies for the current page URL. If URLs are specified, only cookies for those URLs are returned.

 page.deleteCookie(...cookies)

 ...cookies <...Object>
 name <string> required
 url <string>
 domain <string>
 path <string>
 secure <boolean>
 returns: <Promise>
 page.emulate(options)

 options <Object>
 viewport <Object>
 width <number> page width in pixels.
 height <number> page height in pixels.
 deviceScaleFactor <number> Specify device scale factor (can be thought of as dpr). Defaults to 1.
 isMobile <boolean> Whether the meta viewport tag is taken into account. Defaults to false.
 hasTouch<boolean> Specifies if viewport supports touch events. Defaults to false
 isLandscape <boolean> Specifies if viewport is in landscape mode. Defaults to false.
 userAgent <string>
 returns: <Promise>
 Emulates given device metrics and user agent. This method is a shortcut for calling two methods:

 page.setUserAgent(userAgent)
 page.setViewport(viewport)
 To aid emulation, puppeteer provides a list of device descriptors which can be obtained via the require('puppeteer/DeviceDescriptors') command. Below is an example of emulating an iPhone 6 in puppeteer:

 const puppeteer = require('puppeteer');
 const devices = require('puppeteer/DeviceDescriptors');
 const iPhone = devices['iPhone 6'];

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 await page.emulate(iPhone);
 await page.goto('https://www.google.com');
 // other actions...
 await browser.close();
 });
 List of all available devices is available in the source code: DeviceDescriptors.js.

 page.emulateMedia(mediaType)

 mediaType <?string> Changes the CSS media type of the page. The only allowed values are 'screen', 'print' and null. Passing null disables media emulation.
 returns: <Promise>
 page.evaluate(pageFunction, ...args)

 pageFunction <function|string> Function to be evaluated in the page context
 ...args <...Serializable|ElementHandle> Arguments to pass to pageFunction
 returns: <Promise<Serializable>> Resolves to the return value of pageFunction
 If the function, passed to the page.evaluate, returns a Promise, then page.evaluate would wait for the promise to resolve and return its value.

 If the function passed into page.evaluate returns a non-Serializable value, then page.evaluate resolves to undefined.

 const result = await page.evaluate(() => {
 return Promise.resolve(8 * 7);
 });
 console.log(result); // prints "56"
 A string can also be passed in instead of a function.

 console.log(await page.evaluate('1 + 2')); // prints "3"
 ElementHandle instances can be passed as arguments to the page.evaluate:

 const bodyHandle = await page.$('body');
 const html = await page.evaluate(body => body.innerHTML, bodyHandle);
 await bodyHandle.dispose();
 Shortcut for page.mainFrame().evaluate(pageFunction, ...args).

 page.evaluateHandle(pageFunction, ...args)

 pageFunction <function|string> Function to be evaluated in the page context
 ...args <...Serializable|JSHandle> Arguments to pass to pageFunction
 returns: <Promise<JSHandle>> Resolves to the return value of pageFunction
 If the function, passed to the page.evaluateHandle, returns a Promise, then page.evaluateHandle would wait for the promise to resolve and return its value.

 const aWindowHandle = await page.evaluateHandle(() => Promise.resolve(window));
 aWindowHandle; // Handle for the window object.
 A string can also be passed in instead of a function.

 const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'.
 JSHandle instances can be passed as arguments to the page.evaluateHandle:

 const aHandle = await page.evaluateHandle(() => document.body);
 const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
 console.log(await resultHandle.jsonValue());
 await resultHandle.dispose();
 Shortcut for page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args).

 page.evaluateOnNewDocument(pageFunction, ...args)

 pageFunction <function|string> Function to be evaluated in browser context
 ...args <...Serializable> Arguments to pass to pageFunction
 returns: <Promise>
 Adds a function which would be invoked in one of the following scenarios:

 whenever the page is navigated
 whenever the child frame is attached or navigated. In this case, the function is invoked in the context of the newly attached frame
 The function is invoked after the document was created but before any of its scripts were run. This is useful to amend JavaScript environment, e.g. to seed Math.random.

 An example of overriding the navigator.languages property before the page loads:

 // preload.js

 // overwrite the `languages` property to use a custom getter
 Object.defineProperty(navigator, "languages", {
 get: function() {
 return ["en-US", "en", "bn"];
 };
 });

 // In your puppeteer script, assuming the preload.js file is in same folder of our script
 const preloadFile = fs.readFileSync('./preload.js', 'utf8');
 await page.evaluateOnNewDocument(preloadFile);
 page.exposeFunction(name, puppeteerFunction)

 name <string> Name of the function on the window object
 puppeteerFunction <function> Callback function which will be called in Puppeteer's context.
 returns: <Promise>
 The method adds a function called name on the page's window object. When called, the function executes puppeteerFunction in node.js and returns a Promise which resolves to the return value of puppeteerFunction.

 If the puppeteerFunction returns a Promise, it will be awaited.

 NOTE Functions installed via page.exposeFunction survive navigations.
 An example of adding an md5 function into the page:

 const puppeteer = require('puppeteer');
 const crypto = require('crypto');

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 page.on('console', msg => console.log(msg.text));
 await page.exposeFunction('md5', text =>
 crypto.createHash('md5').update(text).digest('hex')
 );
 await page.evaluate(async () => {
 // use window.md5 to compute hashes
 const myString = 'PUPPETEER';
 const myHash = await window.md5(myString);
 console.log(`md5 of ${myString} is ${myHash}`);
 });
 await browser.close();
 });
 An example of adding a window.readfile function into the page:

 const puppeteer = require('puppeteer');
 const fs = require('fs');

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 page.on('console', msg => console.log(msg.text));
 await page.exposeFunction('readfile', async filePath => {
 return new Promise((resolve, reject) => {
 fs.readFile(filePath, 'utf8', (err, text) => {
 if (err)
 reject(err);
 else
 resolve(text);
 });
 });
 });
 await page.evaluate(async () => {
 // use window.readfile to read contents of a file
 const content = await window.readfile('/etc/hosts');
 console.log(content);
 });
 await browser.close();
 });
 page.focus(selector)

 selector <string> A selector of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
 returns: <Promise> Promise which resolves when the element matching selector is successfully focused. The promise will be rejected if there is no element matching selector.
 This method fetches an element with selector and focuses it. If there's no element matching selector, the method throws an error.

 page.frames()

 returns: <Array<Frame>> An array of all frames attached to the page.
 page.goBack(options)

 options <Object> Navigation parameters which might have the following properties:
 timeout <number> Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
 waitUntil <string|Array<string>> When to consider navigation succeeded, defaults to load. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
 load - consider navigation to be finished when the load event is fired.
 domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
 networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
 networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
 returns: <Promise<?Response>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If can not go back, resolves to null.
 Navigate to the previous page in history.

 page.goForward(options)

 options <Object> Navigation parameters which might have the following properties:
 timeout <number> Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
 waitUntil <string|Array<string>> When to consider navigation succeeded, defaults to load. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
 load - consider navigation to be finished when the load event is fired.
 domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
 networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
 networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
 returns: <Promise<?Response>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If can not go back, resolves to null.
 Navigate to the next page in history.

 page.goto(url, options)

 url <string> URL to navigate page to. The url should include scheme, e.g. https://.
 options <Object> Navigation parameters which might have the following properties:
 timeout <number> Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
 waitUntil <string|Array<string>> When to consider navigation succeeded, defaults to load. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
 load - consider navigation to be finished when the load event is fired.
 domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
 networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
 networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
 returns: <Promise<?Response>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.
 The page.goto will throw an error if:

 there's an SSL error (e.g. in case of self-signed certificates).
 target URL is invalid.
 the timeout is exceeded during navigation.
 the main resource failed to load.
 NOTE page.goto either throw or return a main resource response. The only exception is navigation to about:blank, which would succeed and return null.
 NOTE Headless mode doesn't support navigating to a PDF document. See the upstream issue.
 page.hover(selector)

 selector <string> A selector to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
 returns: <Promise> Promise which resolves when the element matching selector is successfully hovered. Promise gets rejected if there's no element matching selector.
 This method fetches an element with selector, scrolls it into view if needed, and then uses page.mouse to hover over the center of the element. If there's no element matching selector, the method throws an error.

 page.keyboard

 returns: <Keyboard>
 page.mainFrame()

 returns: <Frame> returns page's main frame.
 Page is guaranteed to have a main frame which persists during navigations.

 page.metrics()

 returns: <Promise<Object>> Object containing metrics as key/value pairs.
 Timestamp <number> The timestamp when the metrics sample was taken.
 Documents <number> Number of documents in the page.
 Frames <number> Number of frames in the page.
 JSEventListeners <number> Number of events in the page.
 Nodes <number> Number of DOM nodes in the page.
 LayoutCount <number> Total number of full or partial page layout.
 RecalcStyleCount <number> Total number of page style recalculations.
 LayoutDuration <number> Combined durations of all page layouts.
 RecalcStyleDuration <number> Combined duration of all page style recalculations.
 ScriptDuration <number> Combined duration of JavaScript execution.
 TaskDuration <number> Combined duration of all tasks performed by the browser.
 JSHeapUsedSize <number> Used JavaScript heap size.
 JSHeapTotalSize <number> Total JavaScript heap size.
 NOTE All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.
 page.mouse

 returns: <Mouse>
 page.pdf(options)

 options <Object> Options object which might have the following properties:
 path <string> The file path to save the PDF to. If path is a relative path, then it is resolved relative to current working directory. If no path is provided, the PDF won't be saved to the disk.
 scale <number> Scale of the webpage rendering. Defaults to 1.
 displayHeaderFooter <boolean> Display header and footer. Defaults to false.
 printBackground <boolean> Print background graphics. Defaults to false.
 landscape <boolean> Paper orientation. Defaults to false.
 pageRanges <string> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
 format <string> Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.
 width <string> Paper width, accepts values labeled with units.
 height <string> Paper height, accepts values labeled with units.
 margin <Object> Paper margins, defaults to none.
 top <string> Top margin, accepts values labeled with units.
 right <string> Right margin, accepts values labeled with units.
 bottom <string> Bottom margin, accepts values labeled with units.
 left <string> Left margin, accepts values labeled with units.
 returns: <Promise<Buffer>> Promise which resolves with PDF buffer.
 NOTE Generating a pdf is currently only supported in Chrome headless.
 page.pdf() generates a pdf of the page with print css media. To generate a pdf with screen media, call page.emulateMedia('screen') before calling page.pdf():

 // Generates a PDF with 'screen' media type.
 await page.emulateMedia('screen');
 await page.pdf({path: 'page.pdf'});
 The width, height, and margin options accept values labeled with units. Unlabeled values are treated as pixels.

 A few examples:

 page.pdf({width: 100}) - prints with width set to 100 pixels
 page.pdf({width: '100px'}) - prints with width set to 100 pixels
 page.pdf({width: '10cm'}) - prints with width set to 10 centimeters.
 All possible units are:

 px - pixel
 in - inch
 cm - centimeter
 mm - millimeter
 The format options are:

 Letter: 8.5in x 11in
 Legal: 8.5in x 14in
 Tabloid: 11in x 17in
 Ledger: 17in x 11in
 A0: 33.1in x 46.8in
 A1: 23.4in x 33.1in
 A2: 16.5in x 23.4in
 A3: 11.7in x 16.5in
 A4: 8.27in x 11.7in
 A5: 5.83in x 8.27in
 A6: 4.13in x 5.83in
 page.queryObjects(prototypeHandle)

 prototypeHandle <JSHandle> A handle to the object prototype.
 returns: <Promise<JSHandle>> Promise which resolves to a handle to an array of objects with this prototype.
 The method iterates JavaScript heap and finds all the objects with the given prototype.

 // Create a Map object
 await page.evaluate(() => window.map = new Map());
 // Get a handle to the Map object prototype
 const mapPrototype = await page.evaluateHandle(() => Map.prototype);
 // Query all map instances into an array
 const mapInstances = await page.queryObjects(mapPrototype);
 // Count amount of map objects in heap
 const count = await page.evaluate(maps => maps.length, mapInstances);
 await mapInstances.dispose();
 await mapPrototype.dispose();
 Shortcut for page.mainFrame().executionContext().queryObjects(prototypeHandle).

 page.reload(options)

 options <Object> Navigation parameters which might have the following properties:
 timeout <number> Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
 waitUntil <string|Array<string>> When to consider navigation succeeded, defaults to load. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
 load - consider navigation to be finished when the load event is fired.
 domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
 networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
 networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
 returns: <Promise<Response>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.
 page.screenshot([options])

 options <Object> Options object which might have the following properties:
 path <string> The file path to save the image to. The screenshot type will be inferred from file extension. If path is a relative path, then it is resolved relative to current working directory. If no path is provided, the image won't be saved to the disk.
 type <string> Specify screenshot type, can be either jpeg or png. Defaults to 'png'.
 quality <number> The quality of the image, between 0-100. Not applicable to png images.
 fullPage <boolean> When true, takes a screenshot of the full scrollable page. Defaults to false.
 clip <Object> An object which specifies clipping region of the page. Should have the following fields:
 x <number> x-coordinate of top-left corner of clip area
 y <number> y-coordinate of top-left corner of clip area
 width <number> width of clipping area
 height <number> height of clipping area
 omitBackground <boolean> Hides default white background and allows capturing screenshots with transparency. Defaults to false.
 returns: <Promise<Buffer>> Promise which resolves to buffer with captured screenshot
 page.select(selector, ...values)

 selector <string> A selector to query page for
 ...values <...string> Values of options to select. If the <select> has the multiple attribute, all values are considered, otherwise only the first one is taken into account.
 returns: <Promise<Array<string>>> Returns an array of option values that have been successfully selected.
 Triggers a change and input event once all the provided options have been selected. If there's no <select> element matching selector, the method throws an error.

 page.select('select#colors', 'blue'); // single selection
 page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
 Shortcut for page.mainFrame.select()

 page.setContent(html)

 html <string> HTML markup to assign to the page.
 returns: <Promise>
 page.setCookie(...cookies)

 ...cookies <...Object>
 name <string> required
 value <string> required
 url <string>
 domain <string>
 path <string>
 expires <number> Unix time in seconds.
 httpOnly <boolean>
 secure <boolean>
 sameSite <string> "Strict" or "Lax".
 returns: <Promise>
 page.setExtraHTTPHeaders(headers)

 headers <Object> An object containing additional http headers to be sent with every request. All header values must be strings.
 returns: <Promise>
 The extra HTTP headers will be sent with every request the page initiates.

 NOTE page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.
 page.setJavaScriptEnabled(enabled)

 enabled <boolean> Whether or not to enable JavaScript on the page.
 returns: <Promise>
 NOTE changing this value won't affect scripts that have already been run. It will take full effect on the next navigation.
 page.setOfflineMode(enabled)

 enabled <boolean> When true, enables offline mode for the page.
 returns: <Promise>
 page.setRequestInterception(value)

 value <boolean> Whether to enable request interception.
 returns: <Promise>
 Activating request interception enables request.abort, request.continue and request.respond methods.

 An example of a naïve request interceptor that aborts all image requests:

 const puppeteer = require('puppeteer');

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 await page.setRequestInterception(true);
 page.on('request', interceptedRequest => {
 if (interceptedRequest.url.endsWith('.png') || interceptedRequest.url.endsWith('.jpg'))
 interceptedRequest.abort();
 else
 interceptedRequest.continue();
 });
 await page.goto('https://example.com');
 await browser.close();
 });
 NOTE Enabling request interception disables page caching.
 page.setUserAgent(userAgent)

 userAgent <string> Specific user agent to use in this page
 returns: <Promise> Promise which resolves when the user agent is set.
 page.setViewport(viewport)

 viewport <Object>
 width <number> page width in pixels.
 height <number> page height in pixels.
 deviceScaleFactor <number> Specify device scale factor (can be thought of as dpr). Defaults to 1.
 isMobile <boolean> Whether the meta viewport tag is taken into account. Defaults to false.
 hasTouch<boolean> Specifies if viewport supports touch events. Defaults to false
 isLandscape <boolean> Specifies if viewport is in landscape mode. Defaults to false.
 returns: <Promise>
 NOTE in certain cases, setting viewport will reload the page in order to set the isMobile or hasTouch properties.
 In the case of multiple pages in a single browser, each page can have its own viewport size.

 page.tap(selector)

 selector <string> A selector to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped.
 returns: <Promise>
 This method fetches an element with selector, scrolls it into view if needed, and then uses page.touchscreen to tap in the center of the element. If there's no element matching selector, the method throws an error.

 page.title()

 returns: <Promise<string>> Returns page's title.
 Shortcut for page.mainFrame().title().

 page.touchscreen

 returns: <Touchscreen>
 page.tracing

 returns: <Tracing>
 page.type(selector, text[, options])

 selector <string> A selector of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
 text <string> A text to type into a focused element.
 options <Object>
 delay <number> Time to wait between key presses in milliseconds. Defaults to 0.
 returns: <Promise>
 Sends a keydown, keypress/input, and keyup event for each character in the text.

 To press a special key, like Control or ArrowDown, use keyboard.press.

 page.type('#mytextarea', 'Hello'); // Types instantly
 page.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
 page.url()

 returns: <string>
 This is a shortcut for page.mainFrame().url()

 page.viewport()

 returns: <Object>
 width <number> page width in pixels.
 height <number> page height in pixels.
 deviceScaleFactor <number> Specify device scale factor (can be though of as dpr). Defaults to 1.
 isMobile <boolean> Whether the meta viewport tag is taken into account. Defaults to false.
 hasTouch<boolean> Specifies if viewport supports touch events. Defaults to false
 isLandscape <boolean> Specifies if viewport is in landscape mode. Defaults to false.
 page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])

 selectorOrFunctionOrTimeout <string|number|function> A selector, predicate or timeout to wait for
 options <Object> Optional waiting parameters
 ...args <...Serializable> Arguments to pass to pageFunction
 returns: <Promise>
 This method behaves differently with respect to the type of the first parameter:

 if selectorOrFunctionOrTimeout is a string, then the first argument is treated as a selector to wait for and the method is a shortcut for page.waitForSelector
 if selectorOrFunctionOrTimeout is a function, then the first argument is treated as a predicate to wait for and the method is a shortcut for page.waitForFunction().
 if selectorOrFunctionOrTimeout is a number, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout
 otherwise, an exception is thrown
 Shortcut for page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]]).

 page.waitForFunction(pageFunction[, options[, ...args]])

 pageFunction <function|string> Function to be evaluated in browser context
 options <Object> Optional waiting parameters
 polling <string|number> An interval at which the pageFunction is executed, defaults to raf. If polling is a number, then it is treated as an interval in milliseconds at which the function would be executed. If polling is a string, then it can be one of the following values:
 raf - to constantly execute pageFunction in requestAnimationFrame callback. This is the tightest polling mode which is suitable to observe styling changes.
 mutation - to execute pageFunction on every DOM mutation.
 timeout <number> maximum time to wait for in milliseconds. Defaults to 30000 (30 seconds).
 ...args <...Serializable> Arguments to pass to pageFunction
 returns: <Promise> Promise which resolves when the pageFunction returns a truthy value.
 The waitForFunction can be used to observe viewport size change:

 const puppeteer = require('puppeteer');

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 const watchDog = page.waitForFunction('window.innerWidth < 100');
 page.setViewport({width: 50, height: 50});
 await watchDog;
 await browser.close();
 });
 Shortcut for page.mainFrame().waitForFunction(pageFunction[, options[, ...args]]).

 page.waitForNavigation(options)

 options <Object> Navigation parameters which might have the following properties:
 timeout <number> Maximum navigation time in milliseconds, defaults to 30 seconds, pass 0 to disable timeout.
 waitUntil <string|Array<string>> When to consider navigation succeeded, defaults to load. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
 load - consider navigation to be finished when the load event is fired.
 domcontentloaded - consider navigation to be finished when the DOMContentLoaded event is fired.
 networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
 networkidle2 - consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
 returns: <Promise<Response>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.
 page.waitForSelector(selector[, options])

 selector <string> A selector of an element to wait for,
 options <Object> Optional waiting parameters
 visible <boolean> wait for element to be present in DOM and to be visible, i.e. to not have display: none or visibility: hidden CSS properties. Defaults to false.
 hidden <boolean> wait for element to not be found in the DOM or to be hidden, i.e. have display: none or visibility: hidden CSS properties. Defaults to false.
 timeout <number> maximum time to wait for in milliseconds. Defaults to 30000 (30 seconds).
 returns: <Promise> Promise which resolves when element specified by selector string is added to DOM.
 Wait for the selector to appear in page. If at the moment of calling the method the selector already exists, the method will return immediately. If the selector doesn't appear after the timeout milliseconds of waiting, the function will throw.

 This method works across navigations:

 const puppeteer = require('puppeteer');

 puppeteer.launch().then(async browser => {
 const page = await browser.newPage();
 let currentURL;
 page
 .waitForSelector('img')
 .then(() => console.log('First URL with image: ' + currentURL));
 for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com'])
 await page.goto(currentURL);
 await browser.close();
 });
 Shortcut for page.mainFrame().waitForSelector(selector[, options]).

 */

const puppeteer = require('puppeteer');

function run() {
    puppeteer.launch().then(async browser => {
        console.log('正在打开浏览器');
        const page = await browser.newPage();
        console.log('正在打开https://baidu.com');
        await page.goto('https://baidu.com');
        console.log('正在打开截屏');
        await page.screenshot({path: '../test/baidu.png'});
        console.log('截屏完成');
        await browser.close();
    });
}

run();
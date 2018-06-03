const puppeteer = require('puppeteer');

async function run() {
    puppeteer.launch().then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://www.biquge5200.cc/75_75835/');
        // other actions...
        const xsName = '纯真逆流年代';
        // 点击搜索框拟人输入
        const result = await page.evaluate(() => {
            return document.getElementById('list');

        });
        await console.log(result)
        // const a = await page.$eval('.grid tr:eq(1) td:eq(0) a', el => el.href);
        // console.log(a)
        // //输入值
        // await page.type('#searchkey', xsName);
        // // 回车
        // await page.click('#sss');

        //等待页面跳转
        // page.waitForNavigation();
        // Create a new incognito browser context
        // const page2 = await browser.pages();
        // const context = await browser.browserContexts()
        // Create a new page inside context.
        // const page2 = await context.newPage();

        console.log('截图中。。');
        await page.screenshot({
            path: './test/jianshu.png',
            type: 'png',
            // quality: 100, 只对jpg有效
            fullPage: true,
            // 指定区域截图，clip和fullPage两者只能设置一个
            // clip: {
            //   x: 0,
            //   y: 0,
            //   width: 1000,
            //   height: 40
            // }
        });
        browser.close();
    });


}

run();
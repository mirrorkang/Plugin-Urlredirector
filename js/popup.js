

var storage = chrome.storage.local;
var viewModel = {}; //Just an object for the databinding

function applyBinding() {
	dataBind(document.body, viewModel);
}

function toggle(prop) {
	storage.get({ [prop]: false }, function (obj) {
		storage.set({ [prop]: !obj[prop] });
		viewModel[prop] = !obj[prop];
		applyBinding();
	});
}

// Todo 修改后的 inputValue 函数，使用防抖
function inputValue(e, prop) {
    const value = e.target.value;

    // // 使用防抖包装的逻辑
    // const debouncedInputLogic = debounce(function(value) {
	// 	console.log(11, value, prop);
      
    // }, 500); // 设置防抖延迟为 500 毫秒

    // debouncedInputLogic(value);
	storage.get([prop] , function (obj) {
		// if (!value || value == obj[prop]) {
		//     return;
		// }
		console.log('inputValue', value, obj);
		storage.set({ [prop]: value });
		viewModel[prop] = value;
		applyBinding();

		// chrome.runtime.sendMessage({ type: "currutEnv", currutEnv: value });
	});
}

function openRedirectorSettings() {

	//switch to open one if we have it to minimize conflicts
	var url = chrome.extension.getURL('redirector.html');

	//FIREFOXBUG: Firefox chokes on url:url filter if the url is a moz-extension:// url
	//so we don't use that, do it the more manual way instead.
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].url == url) {
				chrome.tabs.update(tabs[i].id, { active: true }, function (tab) {
					close();
				});
				return;
			}
		}

		chrome.tabs.create({ url: url, active: true });
	});
	return;
};

function createPageNode() {
	// 示例数组
	const options = getUniqueRepos(data)

	// 获取要添加节点的容器
	const container = document.querySelector('#pages'); // 示例中直接添加到 body，根据需要选择合适的容器

	// 遍历数组，为每个选项创建节点
	options.forEach(option => {
		// 创建 label 元素
		const label = document.createElement("label");

		// 创建 input 元素
		const input = document.createElement("input");
		input.setAttribute("type", "checkbox");
		input.setAttribute("id", option);
		input.setAttribute("data-bind", option);

		// 创建 span 元素
		const span = document.createElement("span");
		span.textContent = option;

		// 将 input 和 span 添加到 label
		label.appendChild(input);
		label.appendChild(span);

		// 将 label 添加到容器
		container.appendChild(label);
	});
}

let data = {
	"createdBy": "Nike Redirector",
	"createdAt": "2024-06-12T00:00:00.000Z",
	"redirects": [
		{
			"description": "Landing page",
			"repo": "Landing page",
			"exampleUrl": "https://www.nike.com.cn/",
			"exampleResult": "https://www.nike.com.cn?nikeEnv=staging",
			"error": null,
			"includePattern": "^https://www.nike.com.cn/(men|women|kids|nike-by-you|jordan)?$",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$1?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Help",
			"repo": "help",
			"exampleUrl": "https://www.nike.com.cn/help/a/exchange-policy-cn",
			"exampleResult": "https://www.nike.com.cn/help/a/exchange-policy-cn?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/help)(\\/a\\/)?([A-z0-9-\\/]+)?(\\/)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/help$2$3?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Orders",
			"repo": "orders",
			"exampleUrl": "https://www.nike.com.cn/orders/sales/CC0055690987/",
			"exampleResult": "https://www.nike.com.cn/orders/sales/CC0055690987/?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/orders)(\\/sales\\/)?([A-z0-9-\\/]+)?(\\/)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/orders$2$3?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "404",
			"repo": "404",
			"exampleUrl": "https://www.nike.com.cn/not-found",
			"exampleResult": "https://www.nike.com.cn/not-found?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/not-found)([^\\?]*)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/not-found?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Cart",
			"repo": "Cart",
			"exampleUrl": "https://www.nike.com.cn/cart",
			"exampleResult": "https://www.nike.com.cn/cart?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/cart)([^\\?]*)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/cart$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Favorites",
			"repo": "Favorites",
			"exampleUrl": "https://www.nike.com.cn/favorites",
			"exampleResult": "https://www.nike.com.cn/favorites?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/favorites)([^\\?]*)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/favorites$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Checkout",
			"repo": "Checkout",
			"exampleUrl": "https://www.nike.com.cn/checkout",
			"exampleResult": "https://www.nike.com.cn/checkout?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/)(checkout)(?!\\/confirmation)([^\\?]*)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$2$3?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Membership (default disabled)",
			"repo": "Membership",
			"exampleUrl": "https://www.nike.com.cn/member/settings",
			"exampleResult": "https://www.nike.com.cn/member/settings?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn/)(member/(settings|profile|inbox))([^\\?]*)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": true,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Membership-settings",
			"repo": "settings",
			"exampleUrl": "https://www.nike.com.cn/member/settings",
			"exampleResult": "https://www.nike.com.cn/member/settings?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn/)(member/settings)([^\\?]*)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Membership-profile",
			"repo": "profile",
			"exampleUrl": "https://www.nike.com.cn/member/profile",
			"exampleResult": "https://www.nike.com.cn/member/profile?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn/)(member/profile)([^\\?]*)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Membership-inbox",
			"repo": "inbox",
			"exampleUrl": "https://www.nike.com.cn/member/inbox",
			"exampleResult": "https://www.nike.com.cn/member/inbox?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn/)(member/inbox)([^\\?]*)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Membership",
			"repo": "Membership",
			"exampleUrl": "https://www.nike.com.cn/member/settings",
			"exampleResult": "https://www.nike.com.cn/member/settings?nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn/)(member/(settings|profile|inbox))([^\\?]*)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$2?nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},


		{
			"description": "Product Wall (search)",
			"repo": "Product Wall",
			"exampleUrl": "https://www.nike.com.cn/w?q=12345&vst=12345",
			"exampleResult": "https://www.nike.com.cn/w-dark?q=12345&vst=12345&nikeEnv=staging",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w)(\\?q=.*)(&vst=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/w-dark$2&nikeEnv=staging",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Product Wall(with nikeEnv in url)",
			"repo": "Product Wall",
			"exampleUrl": "https://www.nike.com.cn/w/bhfbewburyfbewuhu-10001101?nikeEnv=staging&abc=1",
			"exampleResult": "https://www.nike.com.cn/w-dark/bhfbewburyfbewuhu-10001101?nikeEnv=staging&abc=1",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w(?:-dark){0,1}\\/)(.+(?=nikeEnv=[^$]*))(?:[?&]*nikeEnv=[^&]*)?([&]?.*|$)",
			"excludePattern": "",
			"patternDesc": "redirect p-wall to staging",
			"redirectUrl": "https://www.nike.com.cn/w-dark/$2nikeEnv=staging$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Product Wall(without nikeEnv in url)",
			"repo": "Product Wall",
			"exampleUrl": "https://www.nike.com.cn/w/bhfbewburyfbewuhu-10001101",
			"exampleResult": "https://www.nike.com.cn/w-dark/bhfbewburyfbewuhu-10001101?nikeEnv=staging&",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w(?:-dark){0,1}\\/)(.[^\\?]*)(?:\\?)*(.*)?",
			"excludePattern": "",
			"patternDesc": "redirect p-wall to staging",
			"redirectUrl": "https://www.nike.com.cn/w-dark/$2?nikeEnv=staging&$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "pdp (with nikeEnv in origin url)",
			"repo": "pdp",
			"exampleUrl": "https://www.nike.com.cn/t/sportswear-%E7%94%B7%E5%AD%90%E5%85%A8%E9%95%BF%E6%8B%89%E9%93%BE%E5%BC%80%E8%A5%9F%E9%92%88%E7%BB%87%E8%BF%9E%E5%B8%BD%E8%A1%AB-VhbrCx/DM6549-072?abc=123&nikeEnv=staging&ts=1231312",
			"exampleResult": "https://www.nike.com.cn/t-dark/sportswear-%E7%94%B7%E5%AD%90%E5%85%A8%E9%95%BF%E6%8B%89%E9%93%BE%E5%BC%80%E8%A5%9F%E9%92%88%E7%BB%87%E8%BF%9E%E5%B8%BD%E8%A1%AB-VhbrCx/DM6549-072?abc=123&nikeEnv=staging&ts=1231312",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/t(?:-dark){0,1}\\/)(.+(?=nikeEnv=[^$]*))(?:[?&]*nikeEnv=[^&]*)?([&]?.*|$)",
			"excludePattern": "",
			"patternDesc": "pdp redirect to dark",
			"redirectUrl": "https://www.nike.com.cn/t-dark/$2nikeEnv=staging$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "pdp (without nikeEnv in origin url)",
			"repo": "pdp",
			"exampleUrl": "https://www.nike.com.cn/t/sportswear-%E7%94%B7%E5%AD%90%E5%85%A8%E9%95%BF%E6%8B%89%E9%93%BE%E5%BC%80%E8%A5%9F%E9%92%88%E7%BB%87%E8%BF%9E%E5%B8%BD%E8%A1%AB-VhbrCx/DM6549-072?abc=123&ts=1231312",
			"exampleResult": "https://www.nike.com.cn/t-dark/sportswear-%E7%94%B7%E5%AD%90%E5%85%A8%E9%95%BF%E6%8B%89%E9%93%BE%E5%BC%80%E8%A5%9F%E9%92%88%E7%BB%87%E8%BF%9E%E5%B8%BD%E8%A1%AB-VhbrCx/DM6549-072?nikeEnv=staging&abc=123&ts=1231312",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/t(?:-dark){0,1}\\/)(.[^\\?]*)(?:\\?)*(.*)?",
			"excludePattern": "",
			"patternDesc": "pdp redirect to dark",
			"redirectUrl": "https://www.nike.com.cn/t-dark/$2?nikeEnv=staging&$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Nby (with nikeEnv in url)",
			"repo": "pdp",
			"exampleUrl": "https://www.nike.com.cn/u/bhfbewburyfbewuhu-10001101?nikeEnv=dev&abc=1",
			"exampleResult": "https://www.nike.com.cn/u-dark/bhfbewburyfbewuhu-10001101?nikeEnv=staging&abc=1",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/u(?:-dark){0,1}\\/)(.+(?=nikeEnv=[^$]*))(?:[?&]*nikeEnv=[^&]*)?([&]?.*|$)",
			"excludePattern": "",
			"patternDesc": "redirect nby to staging",
			"redirectUrl": "https://www.nike.com.cn/u-dark/$2nikeEnv=staging$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Nby (without nikeEnv in url)",
			"repo": "pdp",
			"exampleUrl": "https://www.nike.com.cn/u/bhfbewburyfbewuhu-10001101",
			"exampleResult": "https://www.nike.com.cn/u-dark/bhfbewburyfbewuhu-10001101?nikeEnv=staging&",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/u(?:-dark){0,1}\\/)(.[^\\?]*)(?:\\?)*(.*)?",
			"excludePattern": "",
			"patternDesc": "redirect nby to staging",
			"redirectUrl": "https://www.nike.com.cn/u-dark/$2?nikeEnv=staging&$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "Other page",
			"repo": "other page",
			"exampleUrl": "https://www.nike.com.cn/gift-cards",
			"exampleResult": "https://www.nike.com.cn/gift-cards?nikeEnv=staging",
			"error": null,
			"includePattern": "^https://www.nike.com.cn/(gift-cards)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/$1?nikeEnv=staging$3",
			"patternType": "R",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		},
		{
			"description": "auth",
			"repo": "auth",
			"exampleUrl": "https://www.nike.com.cn/auth/login",
			"exampleResult": "https://www.nike.com.cn/auth/login",
			"error": null,
			"includePattern": "https://www.nike.com.cn/auth*",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn/auth$1",
			"patternType": "W",
			"processMatches": "noProcessing",
			"disabled": false,
			"grouped": false,
			"appliesTo": [
				"main_frame"
			]
		}
	]
}

function pageLoad() {
	storage.get({
		logging: false,
		enableNotifications: false,
		disabled: false,
		currutEnv: 'staging'
	}, function (obj) {
		viewModel = obj;
		applyBinding();
	})
	
	storage.set({redirects: data.redirects})


	el('#currutEnv').addEventListener('keyup', (e) => inputValue(e, 'currutEnv'));
	el('#enable-notifications').addEventListener('input', () => toggle('enableNotifications'));
	el('#enable-logging').addEventListener('input', () => toggle('logging'));
	el('#toggle-disabled').addEventListener('click', () => toggle('disabled'));
	el('#open-redirector-settings').addEventListener('click', openRedirectorSettings);
	// createPageNode();
}

pageLoad();
//Setup page...



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

function inputValue(e, prop) {
	console.log('inputValue', prop, e.target.value);
	const value = e.target.value;
	storage.get({ [prop]: 'staging' }, function () {
		storage.set({ [prop]: value });
		viewModel[prop] = value;
		applyBinding();

		getNikeJson(value);
		
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

	el('#currutEnv').addEventListener('mouseout', (e) => inputValue(e, 'currutEnv'));
	el('#enable-notifications').addEventListener('input', () => toggle('enableNotifications'));
	el('#enable-logging').addEventListener('input', () => toggle('logging'));
	el('#toggle-disabled').addEventListener('click', () => toggle('disabled'));
	el('#open-redirector-settings').addEventListener('click', openRedirectorSettings);

}

function getNikeJson(nikeEnv) {

	function getDefaultRedirects(data) {
		// try {
		// 	data = JSON.parse(dataJson);
		// } catch(e) {
		// 	console.log(e);
		// 	showMessage('Failed to parse JSON data, invalid JSON: ' + (e.message||'').substr(0,100));
		// 	return;
		// }

		if (!data.redirects) {
			showMessage('Invalid JSON, missing "redirects" property');
			return;
		}

		var imported = 0, existing = 0;
		for (var i = 0; i < data.redirects.length; i++) {
			var r = new Redirect(data.redirects[i]);
			r.updateExampleResult();
			if (REDIRECTS.some(function (i) { return new Redirect(i).equals(r); })) {
				existing++;
			} else {
				REDIRECTS.push(r.toObject());
				imported++;
			}
		}

		showImportedMessage(imported, existing);

		saveChanges();
		renderRedirects();
	}
	let data = {
		"createdBy": "Redirector v3.5.3",
		"createdAt": "2023-06-12T02:54:20.265Z",
		"redirects": [
			{
				"description": "product-wall",
				"exampleUrl": "https://www.nike.com.cn/w/abc-123",
				"exampleResult": "https://www.nike.com.cn/w-dark/abc-123&nikeEnv=staging",
				"error": null,
				"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w\\/)([A-z0-9-\\/]+)(\\?cp=[A-z0-9-\\/]*)?(\\&nikeEnv=staging)?(&ts=[0-9]*)?",
				"excludePattern": "",
				"patternDesc": "",
				"redirectUrl": "https://www.nike.com.cn/w-dark/$2$3&nikeEnv=staging",
				"patternType": "R",
				"processMatches": "noProcessing",
				"disabled": true,
				"grouped": false,
				"appliesTo": [
					"main_frame"
				]
			},
			{
				"description": "product-wall",
				"exampleUrl": "https://www.nike.com.cn/w/abc-123",
				"exampleResult": "https://www.nike.com.cn/w-dark/abc-123?&nikeEnv=staging",
				"error": null,
				"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w\\/)([A-z0-9-\\/]+)(\\?irclickid=[A-z0-9-\\/]*)?(\\&irgwc=[A-z0-9-\\/]*)?(\\&utm_source=[A-z0-9-\\/]*)?(\\&cp=[A-z0-9-\\/]*)?(\\&nikeEnv=staging)?(&ts=[0-9]*)?",
				"excludePattern": "",
				"patternDesc": "",
				"redirectUrl": "https://www.nike.com.cn/w-dark/$2?$3$4$5$6&nikeEnv=staging",
				"patternType": "R",
				"processMatches": "noProcessing",
				"disabled": true,
				"grouped": false,
				"appliesTo": [
					"main_frame"
				]
			},
			{
				"description": "p-wall search new",
				"exampleUrl": "https://www.nike.com.cn/w/nnn?vst=12345",
				"exampleResult": "https://www.nike.com.cn/w-dark/nnn?vst=12345&nikeEnv=staging",
				"error": null,
				"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w\\/)([\\s\\S?]+)(\\?vst=[\\s\\S]+)+",
				"excludePattern": "",
				"patternDesc": "",
				"redirectUrl": "https://www.nike.com.cn/w-dark/$2$3&nikeEnv=staging",
				"patternType": "R",
				"processMatches": "noProcessing",
				"disabled": false,
				"grouped": false,
				"appliesTo": [
					"main_frame"
				]
			},
			{
				"description": "order payment",
				"exampleUrl": "https://www.nike.com.cn/orders/sales/CC0055690987/",
				"exampleResult": "https://www.nike.com.cn/orders/sales/CC0055690987/?nikeEnv=staging",
				"error": null,
				"includePattern": "^(https:\\/\\/www.nike.com.cn\\/orders\\/sales\\/)([A-z0-9-\\/]+)?(\\/)?(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
				"excludePattern": "",
				"patternDesc": "",
				"redirectUrl": "https://www.nike.com.cn/orders/sales/$2$3?nikeEnv=staging",
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
			},
			{
				"description": "product-wall",
				"exampleUrl": "https://www.nike.com.cn/w/abc-123",
				"exampleResult": "https://www.nike.com.cn/w-dark/abc-123?nikeEnv=staging",
				"error": null,
				"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w\\/)([A-z0-9-\\/]+)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
				"excludePattern": "",
				"patternDesc": "",
				"redirectUrl": "https://www.nike.com.cn/w-dark/$2?nikeEnv=staging",
				"patternType": "R",
				"processMatches": "noProcessing",
				"disabled": false,
				"grouped": false,
				"appliesTo": [
					"main_frame"
				]
			},
			{
				"description": "p-wall search",
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
				"description": "pdp (with nikeEnv in origin url)",
				"exampleUrl": "https://www.nike.com.cn/t/sportswear-%E7%94%B7%E5%AD%90%E5%85%A8%E9%95%BF%E6%8B%89%E9%93%BE%E5%BC%80%E8%A5%9F%E9%92%88%E7%BB%87%E8%BF%9E%E5%B8%BD%E8%A1%AB-VhbrCx/DM6549-072?abc=123&nikeEnv=dev&ts=1231312",
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
				"description": "redirect nby to staging(with nikeEnv in url)",
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
				"description": "redirect nby to staging(without nikeEnv in url)",
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
				"description": "other pages",
				"exampleUrl": "https://www.nike.com.cn/cart",
				"exampleResult": "https://www.nike.com.cn/cart?nikeEnv=staging",
				"error": null,
				"includePattern": "^(https:\\/\\/www.nike.com.cn\\/)(?!checkout\\/confirmation)([^\\?]*)(\\?nikeEnv=staging)?(&ts=[0-9]*)?",
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
				"description": "home page",
				"exampleUrl": "https://www.nike.com.cn/",
				"exampleResult": "https://www.nike.com.cn/?nikeEnv=staging",
				"error": null,
				"includePattern": "(^https://www.nike.com.cn/$)",
				"excludePattern": "",
				"patternDesc": "",
				"redirectUrl": "https://www.nike.com.cn/?nikeEnv=staging",
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
	function modifyJson(data) {
	
		data.redirects.forEach((item) => {
			item.includePattern = item.includePattern.replace('nikeEnv=staging', `nikeEnv=${nikeEnv}`);
			item.redirectUrl = item.redirectUrl.replace(/\\/g, '\\\\');
		})
		return data;
	}
	getDefaultRedirects(modifyJson(data))
}

pageLoad();
//Setup page...

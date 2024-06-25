// Shows a message explaining how many redirects were imported.
function showImportedMessage(imported, existing) {
	if (imported == 0 && existing == 0) {
		showMessage('No redirects existed in the file.');
	}
	if (imported > 0 && existing == 0) {
		showMessage('Successfully imported ' + imported + ' redirect' + (imported > 1 ? 's.' : '.'), true);
	}
	if (imported == 0 && existing > 0) {
		showMessage('All redirects in the file already existed and were ignored.');
	}
	if (imported > 0 && existing > 0) {
		var m = 'Successfully imported ' + imported + ' redirect' + (imported > 1 ? 's' : '') + '. ';
		if (existing == 1) {
			m += '1 redirect already existed and was ignored.';
		} else {
			m += existing + ' redirects already existed and were ignored.';
		}
		showMessage(m, true);
	}
}

function importRedirects(ev) {

	let file = ev.target.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();

	reader.onload = function (e) {
		var data;
		try {
			data = JSON.parse(reader.result);
		} catch (e) {
			showMessage('Failed to parse JSON data, invalid JSON: ' + (e.message || '').substr(0, 100));
			return;
		}

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
	};

	try {
		reader.readAsText(file, 'utf-8');
	} catch (e) {
		showMessage('Failed to read import file');
	}
}




function updateExportLink() {
	var redirects = REDIRECTS.map(function (r) {
		return new Redirect(r).toObject();
	});

	let version = chrome.runtime.getManifest().version;

	var exportObj = {
		createdBy: 'Redirector v' + version,
		createdAt: new Date(),
		redirects: redirects
	};

	var json = JSON.stringify(exportObj, null, 4);

	//Using encodeURIComponent here instead of base64 because base64 always messed up our encoding for some reason...
	el('#export-link').href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(json);
}

updateExportLink();

function setupImportExportEventListeners() {
	el("#import-file").addEventListener('change', importRedirects);
	el("#export-link").addEventListener('mousedown', updateExportLink);
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
			"includePattern": "(^https://www.nike.com.cn/$)",
			"excludePattern": "",
			"patternDesc": "",
			"redirectUrl": "https://www.nike.com.cn?nikeEnv=staging",
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
			"repo": "Cart/Favorites",
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
			"repo": "Cart/Favorites",
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
			"description": "p-wall search new",
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
			"description": "w(with nikeEnv in url)",
			"repo": "Product Wall",
			"exampleUrl": "https://www.nike.com.cn/w/bhfbewburyfbewuhu-10001101?nikeEnv=dev&abc=1",
			"exampleResult": "https://www.nike.com.cn/w-dark/bhfbewburyfbewuhu-10001101?nikeEnv=staging&abc=1",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w(?:-dark){0,1}\\/)(.+(?=nikeEnv=[^$]*))(?:[?&]*nikeEnv=[^&]*)?([&]?.*|$)",
			"excludePattern": "",
			"patternDesc": "redirect nby to staging",
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
			"description": "w(without nikeEnv in url)",
			"repo": "Product Wall",
			"exampleUrl": "https://www.nike.com.cn/w/bhfbewburyfbewuhu-10001101",
			"exampleResult": "https://www.nike.com.cn/w-dark/bhfbewburyfbewuhu-10001101?nikeEnv=staging&",
			"error": null,
			"includePattern": "^(https:\\/\\/www.nike.com.cn\\/w(?:-dark){0,1}\\/)(.[^\\?]*)(?:\\?)*(.*)?",
			"excludePattern": "",
			"patternDesc": "redirect nby to staging",
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
			"description": "redirect nby to staging(with nikeEnv in url)",
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
			"description": "redirect nby to staging(without nikeEnv in url)",
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

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type == 'currutEnv') {
			console.log(33, 'request');
			getNikeJson(request.currutEnv)
		}

		return true; //This tells the browser to keep sendResponse alive because
		//we're sending the response asynchronously.
	}
);

function getUniqueRepos(data) {
	let repos = data.redirects.map(item => item.repo);
	const uniqueRepos = [...new Set(repos)];
	return uniqueRepos;
}

function getNikeJson(nikeEnv) {

	function getDefaultRedirects(data) {
		// 先清空数组
		deleteAll();
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

	function modifyJson(data) {

		data.redirects.forEach((item) => {
			item.includePattern = item.includePattern.replace('nikeEnv=staging', `nikeEnv=${nikeEnv}`);
			item.redirectUrl = item.redirectUrl.replace('nikeEnv=staging', `nikeEnv=${nikeEnv}`);
		})
		return data;
	}
	getDefaultRedirects(modifyJson(data))
}

setupImportExportEventListeners();
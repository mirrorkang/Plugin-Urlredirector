

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
	storage.get([prop], function (obj) {
		// if (!value) {
		//     return;
		// }
		console.log('inputValue', value, obj);
		storage.set({ [prop]: value || 'staging'});
		viewModel[prop] = value;
		applyBinding();

		// chrome.runtime.sendMessage({ type: "currentEnv", currentEnv: value });
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

/**
 * show repo list
 * @param {*} data 
 */
function createPageNode(data) {
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

function pageLoad() {
	storage.get({
		logging: false,
		enableNotifications: false,
		disabled: false,
		currentEnv: 'staging'
	}, function (obj) {
		viewModel = obj;
		applyBinding();
	})

	el('#currentEnv').addEventListener('keyup', (e) => inputValue(e, 'currentEnv'));
	el('#enable-notifications').addEventListener('input', () => toggle('enableNotifications'));
	el('#enable-logging').addEventListener('input', () => toggle('logging'));
	el('#toggle-disabled').addEventListener('click', () => toggle('disabled'));
	el('#open-redirector-settings').addEventListener('click', openRedirectorSettings);
}

pageLoad();
//Setup page...

function getDefaultsetting() {
	storage.get('redirects', (obj) => {
		if (!obj.redirects) {
			console.log('首次加载');
			// 首次加载时，如果没有设置，则使用默认配置
			fetch('../default-setting.json')
				.then(response => response.json())
				.then(data => storage.set({ redirects: data.redirects }))
				.catch(error => console.error(error));
		}

	})

}
getDefaultsetting();



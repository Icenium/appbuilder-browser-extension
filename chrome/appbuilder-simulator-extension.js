// Copyright 2014 Telerik. All Rights Reserved.

(function module() {
	var consts,
		ports = {},
		requestQueue = {},
		isAllowedOriginRegEx = /(\.icenium\.com|\.telerik\.com)/;

	consts = {
		headers: {
			ALLOW_ORIGIN: "Access-Control-Allow-Origin",
			ORIGIN: "Origin"
		}
	};

	function getHeaderByKey(headers, key) {
		var result;

		for (var i = 0, l = headers.length; i < l; i++) {
			if (headers[i].name === key) {
				result = headers[i];
				break;
			}
		}
		return result;
	}

	function onHeadersReceivedHandler(details) {
		var request,
			hAllowOrigin,
			requestId = details.requestId,
			headers = details.responseHeaders || [];

		if (!requestQueue[requestId]) {
			return;
		}

		hAllowOrigin = getHeaderByKey(headers, consts.headers.ALLOW_ORIGIN);
		request = requestQueue[requestId];
		if (!hAllowOrigin && request) {
			hAllowOrigin = { name: consts.headers.ALLOW_ORIGIN, value: request.origin }
			headers.push(hAllowOrigin);
			delete requestQueue[requestId];
		}
		
		return { responseHeaders: headers };
	}

	function onSendHeadersHandler(details) {
		var requestId = details.requestId,
			headers = details.requestHeaders || [],
			hOrigin = getHeaderByKey(headers, consts.headers.ORIGIN);

			if (hOrigin && isAllowedOriginRegEx.test(hOrigin.value)) {
				requestQueue[requestId] = { origin: hOrigin.value };
			}

		return { requestHeaders: headers };
	}

	// attach to events
	chrome.webRequest.onHeadersReceived.addListener(
		onHeadersReceivedHandler,
		{
			urls: ["<all_urls>"],
			types: ["xmlhttprequest","image"]
		},
		["blocking","responseHeaders"]
	);

	chrome.webRequest.onSendHeaders.addListener(
		onSendHeadersHandler,
		{
			urls: ["<all_urls>"],
			types: ["xmlhttprequest"]
		},
		["requestHeaders"]
	);

	chrome.runtime.onConnectExternal.addListener(function (port) {
		var sender = port.sender;

		if (sender && sender.tab && sender.tab.url &&
			sender.tab.url.indexOf("/appbuilder/webclient/simulator.html") >= 0) {
			port.onMessage.addListener(function (request) {
				if (request.command === "attachDebugger") {
					attachExceptionHandler(port);
				} else if (request.command === "detachDebugger") {
					detachDebugger(sender.tab)
				}
			});
			ports[sender.tab.id] = port;
			port.onDisconnect.addListener(function (port) {
				if (port.sender.tab &&
					port.sender.tab.id &&
					ports[port.sender.tab.id]) {
					delete ports[port.sender.tab.id];
				}
			})
		}
	});

	function attachExceptionHandler(port) {
		tabTarget = port.sender.tab;

		chrome.debugger.getTargets(function (targets) {
			var tab = getDebuggerTab(targets, tabTarget);

			if (!tab.attached) {
				chrome.debugger.attach({ tabId: tab.tabId }, "1.1");
			}
			chrome.debugger.sendCommand({ tabId: tab.tabId }, "Debugger.enable");
			chrome.debugger.sendCommand({ tabId: tab.tabId }, "Debugger.setPauseOnExceptions", { state: "uncaught" });
		});
	}

	chrome.debugger.onEvent.addListener(function (source, method, params) {
		if (method === "Debugger.paused" && ports[source.tabId]) {
			chrome.debugger.sendCommand({ tabId: source.tabId }, "Debugger.resume");
			if (params.reason === "exception") {
				ports[source.tabId].postMessage({ message: "exceptionThrown", exception: JSON.stringify(params.data) });
			}
		}
	});

	chrome.debugger.onDetach.addListener(function (source) {
		if (ports[source.tabId]) {
			ports[source.tabId].postMessage({message:"detached"});
		}
	})

	function detachDebugger(tabTarget) {
		chrome.debugger.getTargets(function (targets) {
			var tab = getDebuggerTab(targets, tabTarget)
			if (tab.attached) {
				chrome.debugger.detach({ tabId: tab.tabId });
			}
		});
	}

	function getDebuggerTab(targets, tabTarget) {
		for (var i = 0, l = targets.length; i < l; i++) {
			if (targets[i].tabId !== tabTarget.id) {
				continue;
			}

			return targets[i];
		}
	}

})(chrome);



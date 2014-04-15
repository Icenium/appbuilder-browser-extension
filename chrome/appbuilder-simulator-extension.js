// Copyright 2014 Telerik. All Rights Reserved.

(function module() {
	var consts,
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

})(chrome);



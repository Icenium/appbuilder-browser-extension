// Copyright 2013 Telerik. All Rights Reserved.

(function module() {

	//TODO alter only requests from app.icenium.com

	function onHeadersReceivedHandler(details) {
		var headers = details.responseHeaders,
			hOrigin;

		for (var i = 0, l = headers.length; i < l; i++) {
			if (headers[i].name === "Access-Control-Allow-Origin") {
				hOrigin = headers[i];
				break;
			}
		}

		if (!hOrigin) {
			//TODO
			hOrigin = { name: "Access-Control-Allow-Origin", value: "http://app.icenium.com" }
			headers.push(hOrigin);
		}

		return { responseHeaders: headers };
	}


	// attach to events
	chrome.webRequest.onHeadersReceived.addListener(
		onHeadersReceivedHandler,
		{
			urls: ["<all_urls>"],
			types: ["xmlhttprequest"]
		},
		["blocking", "responseHeaders"]
	);

})(chrome);



javascript: (function() {
	let index = 0;
	let docElem,
		delRunFlag = 1;
	const cZa = []; /* 全要素に対してイベントを作成 */
	while ((docElem = document.body.getElementsByTagName('*').item(index++))) {
		docElem.onmouseover = function(winEve = window.event) {
			winEve.cancelBubble = true;
			if (winEve.stopPropagation) winEve.stopPropagation();
			if (delRunFlag) {
				this.style.background = 'yellow';
			}
		};
		docElem.onmouseout = function(winEve = window.event) {
			winEve.cancelBubble = true;
			if (winEve.stopPropagation) winEve.stopPropagation();
			if (delRunFlag) {
				this.style.background = '';
			}
		};
		docElem.onclick = function(winEve = window.event) {
			winEve.cancelBubble = true;
			if (winEve.stopPropagation) winEve.stopPropagation();
			if (!delRunFlag) {
				return true;
			}
			this.style.background = '';
			const h = document.createTextNode('');
			cZa.push(this, this.parentNode, h);
			this.parentNode.replaceChild(h, this);
			return false;
		};
	} /* 中央上にコントローラーを表示 */
	const controller = document.createElement('div');
	const innerController = document.createElement('div');
	controller.style.color = '#fff';
	controller.style.position = 'fixed';
	controller.style.zIndex = '9999999';
	controller.style.top = '0';
	controller.style.right = '0';
	controller.style.left = '0';
	controller.style.textAlign = 'center';
	controller.style.marginRight = 'auto';
	controller.style.marginLeft = 'auto';
	innerController.innerHTML =
		'<' +
		'u id=blackPrint> print <' +
		'/u> | <' +
		'u id=delMode> disable <' +
		'/u> | <' +
		'u id=delUndo> undo <' +
		'/u> | <' +
		'u id=delEnd> end <' +
		'/u>';
	innerController.style.marginRight = 'auto';
	innerController.style.marginLeft = 'auto';
	innerController.style.margin = 'auto';
	innerController.style.width = 'fit-content';
	innerController.style.background = 'red';
	controller.appendChild(innerController);
	document.body.insertBefore(controller, document.body.firstChild);
	controller.onclick = function(winEve = window.event) {
		winEve.cancelBubble = true;
		if (winEve.stopPropagation) winEve.stopPropagation();
	};
	document.getElementById('blackPrint').onclick = function() {
		document.getElementById('delMode').onclick();
		document.body.removeChild(controller);
		const style = document.createElement('style');
		const head = document.getElementsByTagName('head');
		style.setAttribute('type', 'text/css');
		style.innerHTML = '* { color:#000!important;} a{ text-decoration: underline!important; color:#000!important; }';
		head[0].appendChild(style); /* 文字色をすべて黒色に */
		window.print();
	};
	document.getElementById('delMode').onclick = function() {
		delRunFlag = delRunFlag ? 0 : 1;
		this.innerHTML = delRunFlag ? 'disable' : 'enable';
	};
	document.getElementById('delUndo').onclick = function() {
		if (!cZa.length) return;
		const h = cZa.pop(),
			p = cZa.pop(),
			r = cZa.pop();
		p.replaceChild(r, h);
	};
	document.getElementById('delEnd').onclick = function() {
		document.getElementById('delMode').onclick();
		document.body.removeChild(controller);
	};
})();

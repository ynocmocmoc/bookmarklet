javascript: (function() {
	let duration = 50; /* 初期インターバル時間設定 */
	let Timer; /* インターバルタイマー宣言 */
	let restart = 0; /* 一時停止情報フラグ */
	let pxmove = 1; /* 移動px初期値設定 */
	let timebuf = duration; /* 初回タイマー時間の変更記録用変数への記録 */

	/* スクロールインターバル時間減少ボタン設定 */
	const speedUp = document.createElement('input');
	speedUp.value = '-'; /*-*/
	speedUp.setAttribute('type', 'button');
	speedUp.style.position = 'fixed';
	speedUp.style.right = '15px';
	speedUp.style.width = '25px';
	speedUp.style.top = '20px';
	speedUp.style.zIndex = '600000';

	/* スクロールインターバル時間ラベル設定 */
	const speedvalue = document.createElement('span');
	speedvalue.innerHTML = duration;
	speedvalue.style.position = 'fixed';
	speedvalue.style.right = '18px';
	speedvalue.style.top = '43px';
	speedvalue.style.zIndex = '600000';

	/* スクロールインターバル時間増加ボタン設定 */
	const speedDown = document.createElement('input');
	speedDown.value = '+'; /*+*/
	speedDown.setAttribute('type', 'button');
	speedDown.style.position = 'fixed';
	speedDown.style.right = '15px';
	speedDown.style.top = '65px';
	speedDown.style.zIndex = '600000';

	/* 一時停止ボタン設定 */
	const stop = document.createElement('input');
	stop.value = '='; /*Ⅱ uFE66*/
	stop.setAttribute('type', 'button');
	stop.style.position = 'fixed';
	stop.style.right = '15px';
	stop.style.top = '105px';
	stop.style.zIndex = '600000';

	/* 自動スクロール終了ボタン設定 */
	const reset = document.createElement('input'); /* 関数名にremoveは使えない */
	reset.value = '#'; /*■*/
	reset.setAttribute('type', 'button');
	reset.style.position = 'fixed';
	reset.style.right = '15px';
	reset.style.top = '135px';
	reset.style.zIndex = '600000';

	/* 移動px減少ボタン設定 */
	const decelerate = document.createElement('input');
	decelerate.value = 'A'; /*↑*/
	decelerate.setAttribute('type', 'button');
	decelerate.style.position = 'fixed';
	decelerate.style.right = '15px';
	decelerate.style.top = '170px';
	decelerate.style.zIndex = '600000';

	/* 移動px表示ラベル設定 */
	const pxview = document.createElement('span');
	pxview.innerHTML = pxmove;
	pxview.style.position = 'fixed';
	pxview.style.right = '18px';
	pxview.style.top = '195px';
	pxview.style.zIndex = '600000';

	/* 移動px増加ボタン設定 */
	const acceleration = document.createElement('input');
	acceleration.value = 'V'; /*↓*/
	acceleration.setAttribute('type', 'button');
	acceleration.style.position = 'fixed';
	acceleration.style.right = '15px';
	acceleration.style.top = '220px';
	acceleration.style.zIndex = '600000';

	/* ボタン追加処理 */
	document.body.appendChild(speedDown);
	document.body.appendChild(speedvalue);
	document.body.appendChild(speedUp);
	document.body.appendChild(decelerate);
	document.body.appendChild(pxview);
	document.body.appendChild(acceleration);
	document.body.appendChild(stop);
	document.body.appendChild(reset);
	stop.focus(); /* ストップボタンへフォーカスを当てる */

	/* インターバルによるスクロール処理部分 */
	function doTimer(t) {
		/* タイマー処理時前回のインターバルと違うなら初期化 */
		if (timebuf != t) {
			clearInterval(Timer);
			timebuf = t;
		}
		/* インターバルタイマー処理 */
		Timer = setInterval(function() {
			/* durationがnullの場合の例外処理 */
			if (duration == null) {
				remove();
			}
			/* 一時停止フラグが有効時処理をしない */
			if (restart == 0) {
				scrollBy(0, pxmove);
			}
		}, t);
	}

	doTimer(duration); /* タイマーの初回起動 */

	/* ストップをクリック */
	function stopClick() {
		/* || or = */
		if (restart == 0) {
			restart = 1;
			stop.value = '||'; /*?*/
		} else {
			restart = 0;
			stop.value = '='; /*Ⅱ*/
		}
	}

	/* 移動PX減少 */
	function decelerateClick() {
		/* < */
		if (pxmove == 1) {
			pxmove = pxmove - 2;
		} else {
			pxmove = pxmove - 1;
		}
		pxview.innerHTML = pxmove;
	}

	/* 移動PX増加 */
	function accelerationClick() {
		/* > */
		if (pxmove == -1) {
			pxmove = pxmove + 2;
		} else {
			pxmove = pxmove + 1;
		}
		pxview.innerHTML = pxmove;
	}

	/* インターバル時間減少 */
	function speedUpClick() {
		/* - */
		if (duration <= 0) {
			duration = 0;
		} else if (duration <= 2) {
			duration = duration - 1;
		} else if (duration <= 10) {
			duration = duration - 2;
		} else if (duration <= 30) {
			duration = duration - 5;
		} else {
			duration = duration - 10;
		}
		/* 多重インターバル起動防止 */
		if (timebuf != duration) {
			speedvalue.innerHTML = duration;
			doTimer(duration);
		}
	}

	/* インターバル時間増加 */
	function speedDownClick() {
		/* + */
		if (duration < 2) {
			duration = duration + 1;
		} else if (duration < 10) {
			duration = duration + 2;
		} else if (duration < 30) {
			duration = duration + 5;
		} else {
			duration = duration + 10;
		}
		/* 多重インターバル起動防止 */
		if (timebuf != duration) {
			speedvalue.innerHTML = duration;
			doTimer(duration);
		}
	}

	/* キーボードショートカット設定 */
	function nextForm() {
		if (event.keyCode == 13) {
			/* Enter */
			stop.focus(); /* ストップ */
		} else if (event.keyCode == 107) {
			/* + */
			speedDownClick(); /* インターバル増加 */
		} else if (event.keyCode == 109) {
			/* - */
			speedUpClick(); /* インターバル減少 */
		} else if (event.keyCode == 106) {
			/* * */
			accelerationClick(); /* 移動px増加 */
			pxview.innerHTML = pxmove; /* pxの表示更新 */
		} else if (event.keyCode == 111) {
			/* / */
			decelerateClick(); /* 移動px減少 */
			pxview.innerHTML = pxmove; /* pxの表示更新 */
		}
	}

	/* ボタンクリックでの関数呼び出し */
	reset.onclick = remove;
	decelerate.onclick = decelerateClick;
	acceleration.onclick = accelerationClick;
	speedUp.onclick = speedUpClick;
	speedDown.onclick = speedDownClick;
	stop.onclick = stopClick;
	window.document.onkeydown = nextForm;

	/* 自動スクロール終了処理 */
	function remove() {
		clearInterval(Timer);
		stop.parentNode.removeChild(stop);
		reset.parentNode.removeChild(reset);
		decelerate.parentNode.removeChild(decelerate);
		pxview.parentNode.removeChild(pxview);
		acceleration.parentNode.removeChild(acceleration);
		speedDown.parentNode.removeChild(speedDown);
		speedvalue.parentNode.removeChild(speedvalue);
		speedUp.parentNode.removeChild(speedUp);
	}
})();

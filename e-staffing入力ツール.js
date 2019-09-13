javascript: (function() {
	const getHostname = window.location.hostname;
	const hostname = {
		aso: 'www2.a-work.jp',
		e_staffing: 'm.e-staffing.ne.jp',
	};
	const rightValue = 15,
		topValue = 30,
		buttnWidht = 40;
	/* D勤ボタン */
	const D = document.createElement('input');
	D.value = 'D';
	D.setAttribute('type', 'button');
	D.style.position = 'fixed';
	D.style.right = rightValue + 'px';
	D.style.top = topValue + 'px';
	D.style.zIndex = '600000';
	D.style.width = buttnWidht + 'px';
	D.style.margin = 0;

	/* N勤ボタン */
	const N = document.createElement('input');
	N.value = 'N';
	N.setAttribute('type', 'button');
	N.style.position = 'fixed';
	N.style.right = rightValue + 'px';
	N.style.top = topValue + 40 + 'px';
	N.style.zIndex = '600000';
	N.style.width = buttnWidht + 'px';
	N.style.margin = 0;

	/* Q勤ボタン */
	const Q = document.createElement('input');
	Q.value = 'Q';
	Q.setAttribute('type', 'button');
	Q.style.position = 'fixed';
	Q.style.right = rightValue + 'px';
	Q.style.top = topValue + 80 + 'px';
	Q.style.zIndex = '600000';
	Q.style.width = buttnWidht + 'px';
	Q.style.margin = 0;

	/* MTG勤ボタン */
	const MTG = document.createElement('input');
	MTG.value = 'MTG';
	MTG.setAttribute('type', 'button');
	MTG.style.position = 'fixed';
	MTG.style.right = rightValue + 'px';
	MTG.style.top = topValue + 120 + 'px';
	MTG.style.zIndex = '600000';
	MTG.style.width = buttnWidht + 10 + 'px';
	MTG.style.margin = 0;

	/* 削除ボタン */
	const X = document.createElement('input');
	X.value = 'X';
	X.setAttribute('type', 'button');
	X.style.position = 'fixed';
	X.style.right = rightValue + 'px';
	X.style.top = topValue + 170 + 'px';
	X.style.zIndex = '600000';
	X.style.width = buttnWidht + 'px';
	X.style.margin = 0;

	/* 登録実施の可否ボタン */
	const reg = document.createElement('input');
	reg.value = 'X';
	reg.setAttribute('type', 'checkbox');
	reg.style.position = 'fixed';
	reg.style.right = rightValue + 10 + 'px';
	reg.style.top = topValue + 230 + 'px';
	reg.style.zIndex = '600000';
	reg.style.width = '20px';
	reg.style.height = '20px';
	reg.checked = true;

	const regCheckboxLabel = document.createElement('text');
	let regCheckboxLabelValue;
	if (getHostname == hostname.e_staffing) {
		regCheckboxLabelValue = '申請実施';
	} else if (getHostname == hostname.aso) {
		regCheckboxLabelValue = '登録実施';
	} else {
		regCheckboxLabelValue = '申請/登録 実施';
	}
	regCheckboxLabel.innerHTML = regCheckboxLabelValue;
	regCheckboxLabel.style.position = 'fixed';
	regCheckboxLabel.style.right = rightValue + 'px';
	regCheckboxLabel.style.top = topValue + 220 + 'px';
	regCheckboxLabel.style.zIndex = '600000';
	regCheckboxLabel.style.backgroundColor = 'white';

	const hostnameLabel = document.createElement('text');
	let hostnameLabelValue;
	if (getHostname == hostname.e_staffing) {
		hostnameLabelValue = 'e-staffing';
	} else if (getHostname == hostname.aso) {
		hostnameLabelValue = 'アソウWeb勤怠';
	} else {
		hostnameLabelValue = 'Error:対象外のページ';
	}
	hostnameLabel.innerHTML = hostnameLabelValue;
	hostnameLabel.style.position = 'fixed';
	hostnameLabel.style.right = rightValue + 'px';
	hostnameLabel.style.top = topValue - 20 + 'px';
	hostnameLabel.style.zIndex = '600000';
	hostnameLabel.style.backgroundColor = 'white';

	/* ボタン追加処理 */
	document.body.appendChild(hostnameLabel);
	document.body.appendChild(D);
	document.body.appendChild(N);
	document.body.appendChild(Q);
	document.body.appendChild(MTG);
	document.body.appendChild(X);
	document.body.appendChild(regCheckboxLabel);
	document.body.appendChild(reg);

	let startTime, saveTime, nightSaveTime, startHour, endDay, endHour, endTime, saveHour, nightSaveHour, bikou;

	/* e-staffing勤怠入力 */
	function e_staffingInputData() {
		document.getElementsByName('0')[0].value = '1'; /* 通常 */
		document.getElementsByName('3')[0].value = startTime; /* 出社時間 */
		document.getElementsByName('4')[0].value = endTime; /* 退社時間 */
		document.getElementsByName('5')[0].value = saveTime; /* 休憩時間 */
		document.getElementsByName('6')[0].value = nightSaveTime; /* 深夜休憩時間 */
		document.getElementsByName('7')[0].value = bikou; /* 備考 */
		if (reg.checked) {
			document.getElementsByName('12')[0].click(); /* 申請ボタンクリック */
		}
		remove();
	}
	/* アソウWeb勤怠入力 */
	function asoInputData() {
		/*todo 備考の入力の対応*/
		const from = document.getElementsByName('SWPF105');
		const startHourConv = startHour + 1;
		const startTimeConv = startTime / 5 + 1;
		const endHourConv = endHour + 1;
		const endTimeConv = endTime / 5 + 1;
		const saveHourConv = saveHour + 1;
		const saveTimeConv = saveTime / 5 + 1;
		const nightSaveHourConv = nightSaveHour + 1;
		const nightSaveTimeConv = Math.floor(nightSaveTime / 5) + 1;
		/* 出勤時間入力 */
		from[0].elements['startKinmuJikan'].options[startHourConv].selected = true; /* 出社時間(+1) */
		from[0].elements['startKinmuFun'].options[startTimeConv].selected = true; /* 00分(5分毎に+1) */
		/* 退勤日付入力 */
		from[0].elements['endKinmuDate'].options[endDay].selected = true;
		/* 退勤時間入力 */
		from[0].elements['endKinmuJikan'].options[endHourConv].selected = true; /* 退社時間(+1) */
		from[0].elements['endKinmuFun'].options[endTimeConv].selected = true; /* 00分(5分毎に+1) */
		/* 休憩時間入力 */
		from[0].elements['kyukeiTimeJikan'].options[saveHourConv].selected = true;
		from[0].elements['kyukeiTimeFun'].options[saveTimeConv].selected = true;
		/* 夜勤休憩時間入力 */
		from[0].elements['shinyaKyukeiTimeJikan'].options[nightSaveHourConv].selected = true;
		from[0].elements['shinyaKyukeiTimeFun'].options[nightSaveTimeConv].selected = true;
		from[0].elements['bikoOther'].value = bikou;
		remove(); /* ボタン削除 */
		if (reg.checked) {
			const Registration = document.getElementsByClassName('standardbutton');
			Registration[Registration.length - 1].click(); /* 登録ボタン */
		}
	}

	/* Dクリック時処理 */
	function Dclick() {
		if (getHostname == hostname.e_staffing) {
			startTime = '0800';
			endTime = '2000';
			saveTime = '60';
			nightSaveTime = '';
			bikou = '';
			e_staffingInputData();
		} else if (getHostname == hostname.aso) {
			startHour = 8;
			startTime = 0;
			endDay = 0;
			endHour = 20;
			endTime = 0;
			saveHour = 1;
			saveTime = 0;
			nightSaveHour = -1;
			nightSaveTime = -1;
			bikou = '';
			asoInputData();
		} else {
			alertCall();
		}
	}

	/* Nクリック時処理 */
	function Nclick() {
		if (getHostname == hostname.e_staffing) {
			startTime = '2000';
			endTime = '3200';
			saveTime = '';
			nightSaveTime = '60';
			bikou = '';
			e_staffingInputData();
		} else if (getHostname == hostname.aso) {
			startHour = 20;
			startTime = 0;
			endDay = 1;
			endHour = 8;
			endTime = 0;
			saveHour = 1;
			saveTime = 0;
			nightSaveHour = 1;
			nightSaveTime = 0;
			bikou = '';
			asoInputData();
		} else {
			alertCall();
		}
	}

	/* Qクリック時処理 */
	function Qclick() {
		if (getHostname == hostname.e_staffing) {
			startTime = '1000';
			endTime = '1900';
			saveTime = '60';
			nightSaveTime = '';
			bikou = '';
			e_staffingInputData();
		} else if (getHostname == hostname.aso) {
			startHour = 10;
			startTime = 0;
			endDay = 0;
			endHour = 19;
			endTime = 0;
			saveHour = 1;
			saveTime = 0;
			nightSaveHour = -1;
			nightSaveTime = -1;
			bikou = '';
			asoInputData();
		} else {
			alertCall();
		}
	}

	/* MTGクリック時処理 */
	function MTGclick() {
		if (getHostname == hostname.e_staffing) {
			startTime = '1800';
			endTime = '2000';
			saveTime = '';
			nightSaveTime = '';
			bikou = 'MTG';
			e_staffingInputData();
		} else if (getHostname == hostname.aso) {
			startHour = 18;
			startTime = 0;
			endDay = 0;
			endHour = 20;
			endTime = 0;
			saveHour = 0;
			saveTime = 0;
			nightSaveHour = -1;
			nightSaveTime = -1;
			bikou = 'MTG';
			asoInputData();
		} else {
			alertCall();
		}
	}

	/* キーボードショートカット設定 */
	function nextForm(event) {
		if (event.keyCode == 49 || event.keyCode == 68) {
			/* 1 document */
			Dclick();
		} else if (event.keyCode == 50 || event.keyCode == 78) {
			/* 2 n */
			Nclick();
		} else if (event.keyCode == 51 || event.keyCode == 81) {
			/* 3 q */
			Qclick();
		} else if (event.keyCode == 52 || event.keyCode == 77) {
			/* 4 m */
			MTGclick();
		}
	}

	function alertCall() {
		alert('対象外のサイトです。');
	}

	/* ボタンクリックで関数呼び出し */
	D.onclick = Dclick;
	N.onclick = Nclick;
	Q.onclick = Qclick;
	MTG.onclick = MTGclick;
	X.onclick = remove;
	window.document.onkeydown = function(e) {
		nextForm(e);
	};

	/* ボタン削除処理 */
	function remove() {
		hostnameLabel.parentNode.removeChild(hostnameLabel);
		D.parentNode.removeChild(D);
		N.parentNode.removeChild(N);
		Q.parentNode.removeChild(Q);
		MTG.parentNode.removeChild(MTG);
		X.parentNode.removeChild(X);
		regCheckboxLabel.parentNode.removeChild(regCheckboxLabel);
		reg.parentNode.removeChild(reg);
		document.onkeydown = null;
	}
})();

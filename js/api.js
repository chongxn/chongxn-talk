const API = (function () {
	const BASE_URl = 'https://study.duyiedu.com';
	const TOKEN_KEY = 'token';

	function get(path) {
		const headers = {};
		const token = localStorage.getItem(TOKEN_KEY);
		if (token) {
			headers.authoriation = `Bearer ${token}`;
		}

		return fetch(BASE_URl + path, {
			headers,
		});
	}

	function post(path, bodyObj) {
		const headers = {
			'Content-Type': 'application/json',
		};
		const token = localStorage.getItem(TOKEN_KEY);
		if (token) {
			headers.authoriation = `Bearer ${token}`;
		}
		return fetch(BASE_URl + path, {
			headers,
			method: 'POST',
			body: JSON.stringify(bodyObj),
		});
	}

	// 注册
	async function reg(userInfo) {
		const resp = await post('/api/user/reg', userInfo);
		return await resp.json();
	}
	//  登录
	async function login(loginInfo) {
		const resp = await post('/api/user/login', loginInfo);
		const result = await resp.json();
		if (result.code === 0) {
			// 登录成功,获取token
			const token = resp.headers.get('authorization');
			localStorage.setItem(TOKEN_KEY, token);
		}
		return result;
	}
	// 验证账号
	async function exists(loginId) {
		const resp = await get(`/api/user/exists?loginId=${loginId}`);
		return await resp.json();
	}
	// 当前用户登录信息
	async function profile() {
		const resp = await get('/api/user/profile');
		return await resp.json();
	}
	// 发送消息
	async function sendChat(content) {
		const resp = await post('/api/chat', { content });
		return await resp.json();
	}
	// 获取历史消息
	async function getHistory() {
		const resp = await get('/api/chat/history');
		return await resp.json();
	}
	// 登出
	function loginOut() {
		localStorage.removeItem(TOKEN_KEY);
	}
	
	return {
		reg,
		login,
		exists,
		profile,
		sendChat,
		getHistory,
		loginOut,
	}
})();

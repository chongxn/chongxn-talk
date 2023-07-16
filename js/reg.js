const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
	if (!val) {
		return '请填写账号!';
	}
	const resp = await API.exists(val);
	if (resp.data) {
		// 账号已存在
		return '账号已存在,请重新输入!';
	}
});

const nickNameValidator = new FieldValidator('txtNickname', async function (
	val,
) {
	if (!val) {
		return '请填写昵称!';
	}
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function (
	val,
) {
	if (!val) {
		return '请填写密码!';
	}
});

const loginPwdConfirmValidator = new FieldValidator(
	'txtLoginPwdConfirm',
	async function (val) {
		if (!val) {
			return '请填写确认密码!';
		}
		if (val !== loginPwdValidator.input.value) {
			return '两次密码不一致!';
		}
	},
);

const form = $('.user-form');
form.onsubmit = async function (e) {
	e.preventDefault();
	const result = await FieldValidator.validate(
		loginIdValidator,
		loginPwdConfirmValidator,
		loginPwdValidator,
		nickNameValidator,
	);
	if (!result) {
		return; // 验证未通过
	}
  const formData = new FormData(form); // 传入表单，得到一个表单数据对象
  const data =  Object.fromEntries(formData.entries())
  console.log(data);
  const resp = await API.reg(data);
  if(resp.code === 0) {
    alert('注册成功!点击确定，跳转至登录页');
    location.href = './login.html'
  }
};

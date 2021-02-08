import apiLogin from './interface/login';
import apiModifyPwd from './interface/modifyPwd';
import apiLogout from './interface/logout';
import apiUpdatePassword from './interface/updatePassword';
import apiUnlock from './interface/unlock';
import apiUploadAvatar from './interface/uploadAvatar';

const install = Vue => {
	if (install.installed) {
		return;
	}
	install.installed = true

	Object.defineProperties(Vue.prototype, {
		$http: {
			get() {
				return Object.assign(  // assign->拼接
					{},
					apiLogin,
					apiModifyPwd,
					apiLogout,
					apiUnlock,
					apiUpdatePassword,
					apiUploadAvatar
				)
			}
		}
	})
}

export default install
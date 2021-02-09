import apiLogin from './interface/login';
import apiModifyPwd from './interface/modifyPwd';
import apiLogout from './interface/logout';
import apiUnlock from './interface/unlock';
import apiUploadAvatar from './interface/uploadAvatar';
import apiPosition from './interface/position';

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
					apiUploadAvatar,
					apiPosition
				)
			}
		}
	})
}

export default install
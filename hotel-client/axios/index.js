import apiLogin from './interface/login';
import apiModifyPwd from './interface/modifyPwd';
import apiLogout from './interface/logout';
import apiUnlock from './interface/unlock';

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
					apiUnlock
				)
			}
		}
	})
}

export default install
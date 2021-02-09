import apiLogin from './interface/login';
import apiModifyPwd from './interface/modifyPwd';
import apiLogout from './interface/logout';
import apiUpdatePassword from './interface/updatePassword';
import apiUnlock from './interface/unlock';
import apiUploadAvatar from './interface/uploadAvatar';
import apiAddPosition from './interface/addPosition';
import apiShowPositionInfo from './interface/showPositionInfo';
import apiUpdateStatus from './interface/updateStatus';
import apiUpdatePositionInfo from './interface/updatePositionInfo';

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
					apiUploadAvatar,
					apiAddPosition,
					apiShowPositionInfo,
					apiUpdateStatus,
					apiUpdatePositionInfo
				)
			}
		}
	})
}

export default install
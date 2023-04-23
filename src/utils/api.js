import { get, post } from './http';
//获取验证码
export const getCaptcha = (url, p) => get(url, p);
//登录
export const reqLogin = p => post('/login', p);
//修改手机短信
export const reqSendSms = p => post('/send_sms', p);
//发送邮箱
export const reqSendEmail = p => post('/send_email', p);
//修改密码
export const reqUpdatePswd = p => post('/update_password', p);
//检查账号是否存在
export const reqCheckkeys = p => post('/check_keys', p);
//注册账号
export const reqRegister = p => post('/register', p);
//保存反馈意见
export const reqSaveReport = p => post('/save_report', p);
//保存规格
export const reqSaveSpec = p => post('/save_spec', p);
//删除规格
export const reqDelSpec = p => post('/del_spec', p);
//查询规格
export const getSpecOne = p => get('/get_spec/parentOne', p);
//查询规格
export const getSpecArea = p => get('/get_spec/parentArea', p);
//按照重量计算
export const reqStockByWeight = p => post('/stocks_1d_by_weight', p);

export const reqStockByLen = p => post('/stocks_1d_by_len', p); //按照规格计算

export const reqStock2DByWeight = p => post('/stocks_2d_by_weight', p); //按照重量计算

export const reqStock2DByArea = p => post('/stocks_2d_by_area', p, { timeout: 3000000 }); //按照重量计算,计算超时时间 5分钟

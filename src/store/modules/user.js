import { defineStore } from 'pinia'
import {getAccessToken, removeAccessToken, setAccessToken,} from '@/utils/accessToken'
import { getUserInfo, login, wxLogin, logout } from '@/api/user'
import { tokenName } from '@/config'
export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            // accessToken:getAccessToken(),
            accessToken:'55_I00_JjwDa6yk4X-fWySPCtlA_y1DJvJKyusirv7p52HbSagcDaWDTkZNq5lf98RRfTTqro1o3kHW9Ya96tkdtr1JvcnSmpvtBHDKPZKvtNE',
            username: '',
            nickname: '小明GOGO',
            avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIrAkicKperIgK2JQibYk82GYzDp2T5t9AxLfZY15Slic7BSyLp6mu53Syc5oJgI58Sgibq2IfL83XNaw/132',
            role:[],
        }
    },
    getters: {},
    actions: {
        setUserData(data){
            this.username = data.username
            this.nickname = data.nickname
            this.avatar = data.avatar
        },
        /*微信登录*/
        async wxLogin(code) {
            const { data } = await wxLogin(code)
            const accessToken = data[tokenName]
            if (accessToken) {
                this.accessToken = accessToken
                setAccessToken(accessToken)
                //设置用户信息
                const { data } = await getUserInfo(this.accessToken)
                if (!data) {
                    // message.error('验证失败，请重新登录...')
                    return false
                }
                let { username, openid } = data
                if (username || openid) {
                    this.setUserData(data)
                    // message.success(`欢迎登录`)
                } else {
                    // message.error('用户信息接口异常')
                    return false
                }
            } else {
                // message.error(`登录接口异常，未正确返回${tokenName}...`,)
            }
        },
        /*账号登录*/
        async login(userInfo) {
            const { data } = await login(userInfo)
            const accessToken = data[tokenName]
            if (accessToken) {
                setAccessToken(accessToken)
                // message.success(`欢迎登录`)
            } else {
                // message.error(`登录接口异常，未正确返回${tokenName}...`)
            }
        },
        /*获取用户信息*/
        async getUserInfo() {
            const { data } = await getUserInfo(this.accessToken)
            if (!data) {
                // message.error('验证失败，请重新登录...')
                return false
            }
            let {username,openid } = data
            if (username || openid) {
                this.setUserData(data)
            } else {
                // message.error('用户信息接口异常')
                return false
            }
        },
        /*登出*/
        async logout() {
            // await logout(this.accessToken)
            this.setUserData({
                username:'',
                nickname:'',
                avatar:'',
            })
            removeAccessToken()
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ['username', 'nickname','avatar']
            }
        ]
    }
})

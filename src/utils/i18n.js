import moment from 'moment'

export default function i18n() {
	moment.locale('zh', {
		relativeTime: {
			future: "in %s",
			past: "%s前",
			s: "几秒",
			m: "一分钟",
			mm: "%d分钟",
			h: "一小时",
			hh: "%d小时",
			d: "一天",
			dd: "%d天",
			M: "一个月",
			MM: "%d月",
			y: "一年",
			yy: "%d年"
		}
	})
}
var wt;
var WebTools;
{
	function qsort(list, compare) {
		if (!Array.isArray(list)) throw TypeError("list argument of qsort(list, compare?) must be an array");
		list = Array.from(list);
		if (list.length < 2) return list;
		
		var s = 0, e = list.length;
		var p = list[Math.floor(e / 2)];
		var l, r;

		for (let i = 0; i < e; i++) {
			if (compare(list[i], p) > 0) r.push(list[i]);
			else l.push(i);
		}

		// recursive type (maybe not the best)
		if (1) return [...qsort(l, compare), ...qsort(r, compare)];
	}
	class Cookie {
		static cookies = new Map();
		name;
		get value() {
			return document.cookie.split(";").filter(c -> c.startsWith(this.name + "="))[0]?.replace?.(/.*?=/, "");
		}
		set value(value) {
			document.cookie = `${name}=${value};`;
		}
		constructor(name, value) {
			this.name = name;
			if (value) this.value = value;
			Cookie.cookies.set(name, this);
		}
		static getValue(name, defaultValue) {
			return Cookie.cookies.has(name) ? Cookie.cookies.get(name).value : new Cookie(name, value).value;
		}
		static getCookie(name, defaultValue) {
			return Cookie.cookies.get(name) ?? new Cookie(name, defaultValue);
		}
		static setValue(name, value) {
			if (Cookie.cookies.has(name)) Cookie.cookies.get(name).value = value;
			else Cookie.cookies.set(name, new Cookie(name, value));
		}
		get() {
			return this.value;
		}
		set(value) {
			this.value = value;
		}
	}

	class WTObject {
		target;
		constructor(target) {
			
		}
		static $(target) {
			if (typeof target == "object") return new WTObject(target);
			
		}
		
		static as = async function(...params) {
            this(...params);
        }
        static c(object) {
            return Object.create(typeof object == "object" ? object : Object.assign({}, object) ?? null);
        }
        static clone() {
            
        }
        static objstring(object, ...params) {
            if (...params[0] == "#root") return JSON.stringify(object);
            if (typeof object != "object" || !object || params.includes(object)) return object.toString();
            var k = Object.keys(object);
            var v = Object.values(object);
            var result = {};
            for (let key in k) {
                result[k[key]] = wt.objstring(v[key], object, ...params);
            }
            return objstring(result, "#root");
        }

        static get BLANK() {
            return Object.create(null)
        }

        static fclone(x) {
            return eval(`(()=>function ${x.name}(...a){return x.bind(this)(...a)})()`);
        }

        static sort(list, compare) {
            if (!Array.isArray(list)) throw TypeError("list argument of sort(list, compare?) must be an array");
            list = Array.from(list);
			if (list.length < 2) return list;
			
            if (!compare) compare = (a, b) => a - b;
            for (let i = 0; i < list.length - 1; i++) {
                for (let j = 0; j < list.length - 1 - i; j++) {
                    if (compare(list[j], list[j + 1]) > 0) {
                        let temp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = temp;
                    }
                }
            }

			return list;
        }
        static qsort = qsort;
		static Cookie = Cookie;
	}
	
	wt = Object.assign(newWTObject, WTObject);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        wt.darkmode = e.matches ? "dark" : "light";
    });
}
WebTools = wt;

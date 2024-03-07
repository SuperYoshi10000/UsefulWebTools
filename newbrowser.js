const browser = (function(){
    const _secretKey = Symbol(crypto.randomUUID());
    function _nativeFunction(f, n) {
        f.toString = `function ${n || f.name}() { [hidden code] }`;
        return f;
    }
    function _nativeClass(f, s, p, n) {
        p[Symbol.toStringTag] = (n ?? f.name).toString();
        Object.assign(_nativeFunction(f), Object.assign(s, {
            prototype: Object.assign(p, {
                constructor: f
            })
        }));
    }
    function _construct(f, ...a) {
        return new f(_secretKey, ...a);
    }
    function _requireSecret() {
        if (arguments[0] != _secretKey) throw new TypeError("Illegal constructor");
    }
    function _enumerable(name, keys) {
        return Object.assign(Object.fromEntries(keys.map(k => [Symbol(name + "." + k), k])), {
            name: name,
            [Symbol.toStringTag]: `enum${name ? " " + name : ""} [${keys.join()}]`,
        });
    }

    const _flags = {
        "cookies": false,
        "cors": false,
        "csp-override": false,
        "file-access": false,
    }
    
    const Cookie = _nativeClass(function Cookie(s, name, value, expires, maxage, domain, path, samesite, host, secure, httponly) {
        _requireSecret(s);
        this.name = name;
        this.value = value;
        this.expires = expires ?? new Date(Date.now() + maxage) ?? "";
        this.domain = domain ?? location.host;
        this.path = path ?? location.href;
        this.samesite = samesite ?? "lax";
        this.host = !!host;
        this.secure = !!secure;
        this.httponly = !!httponly;
    }, {
        create: _nativeFunction(function create(name, value, expires, maxage, domain, path, samesite, host, secure, httponly) {
            return _construct(Cookie, name, value, expires, maxage, domain, path, samesite, host, secure, httponly);
        })
    }, {
        name: null,
        set value(v) {
            document.cookie =
                `${this.name}=${v};${this.expires ? `expires=${this.expires};` : ""}` +
                `domain=${this.domain};path=${this.path};samesite=${this.samesite};httponly=${this.httponly}` + 
                ``;
        },
        get value() {
            return document.cookie.split(";").filter(c => c.startsWith(this.name + "="))[0].replace(this.name + "=", "");
        },
        expires: null,
        domain: location.host,
        path: location.href,
        samesite: "lax",
        host: false,
        secure: false,
        httponly: false
    });
    const CookieStorage = _nativeClass(function CookieStorage() {_requireSecret(arguments);}, {}, {
        get: _nativeFunction(function get(name) {
            
        })
    }, "CookieStorage");
    const cookies = _construct(CookieStorage);
    const Browser = _nativeClass(function Browser() {_requireSecret(arguments);}, {}, {
        requestSpecialAccess(...flags) {
            validFlags = flags.filter(f => f.in(["cookies", "cors", "csp-override", "file-access"]));
            if (validFlags.length == 0) return;
            var accepted;
            if (validFlags.length == 1) accepted = prompt(`Allow ${location.host} to use ${validFlags[0]}?`);
            else if (validFlags.length == 2) accepted = prompt(`Allow ${location.host} to use ${validFlags[0]} and ${validFlags[1]}?`);
            else accepted = prompt(`Allow ${location.host} to use ${validFlags.slice(0, validFlags.length - 1).join(", ")} and ${validFlags[validFlags.length - 1]}?`);
            if (accepted.toLowerCase() == "yes") validFlags.forEach(f => _flags[f] = true);
        },
        flags: {
            get cors() {
                return _flags["cors"] ? "" : null;
            },
            set cors(v) {},
            get csp() {
                return _flags["csp-override"] ? "" : null;
            },
            set csp(v) {
                if (!v || !_flags.csp) return;
                if (typeof v == "string") {}
                if (typeof v == "object") {
                    v.script;
                }
            },
        },
        CookieStorage: CookieStorage,
        get cookies() {
            return _flags["cookies"] ? cookies : null;
        },
        
    }, "Browser");    
    return = _construct(Browser);
})();

// TODO add, change, and fix some stuff
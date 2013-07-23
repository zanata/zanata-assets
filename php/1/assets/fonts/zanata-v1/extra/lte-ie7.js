/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Zanata\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-z-list' : '&#xf0ac;',
			'icon-z-code' : '&#xe000;',
			'icon-z-eye' : '&#xe002;',
			'icon-z-globe' : '&#xe003;',
			'icon-z-star' : '&#xe001;',
			'icon-z-bell' : '&#xe004;',
			'icon-z-clipboard' : '&#xe005;',
			'icon-z-document-alt-fill' : '&#xe007;',
			'icon-z-clock' : '&#xe008;',
			'icon-z-history' : '&#xe009;',
			'icon-z-infinity' : '&#xe00a;',
			'icon-z-network' : '&#xe00b;',
			'icon-z-users' : '&#xe00c;',
			'icon-z-user' : '&#xe00e;',
			'icon-z-cog' : '&#xe00f;',
			'icon-z-plus' : '&#xe011;',
			'icon-z-pencil' : '&#xe014;',
			'icon-z-cross' : '&#xe006;',
			'icon-z-checkmark' : '&#xe00d;',
			'icon-z-arrow-left' : '&#xe010;',
			'icon-z-arrow-down' : '&#xe012;',
			'icon-z-arrow-up' : '&#xe013;',
			'icon-z-arrow-right' : '&#xe015;',
			'icon-z-star-2' : '&#xe016;',
			'icon-z-search' : '&#xe017;',
			'icon-z-keyboard' : '&#xe018;',
			'icon-z-comment' : '&#xe019;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-z-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};
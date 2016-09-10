'use strict';

var paginate = function() {
	paginate.prototype.ul = function() {
		return '<ul class="pagination">' +  this.liPage() + '</ul>';
	};

	paginate.prototype.previousPage = function(number) {
		return '<li><a href="'+ this.url + '?page='+ number +'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
	};

	paginate.prototype.nextPage = function(number) {
		return '<li><a href="'+ this.url + '?page='+ number +'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
	};

	paginate.prototype.active = function(number) {
		return this.objpage.current_page == number ? 'class="active"' : '';
	};

	paginate.prototype.liPage = function() {
		var li = '';
		for (var y = 1; y <= this.objpage.total_pages; y++) {
			li+= '<li ' + this.active(y)  + '><a href="' + this.url + '?page=' + y +'">' + y + '</a></li>'; 
		}

		var previous = this.objpage.current_page != this.objpage.min_page ? this.previousPage(parseInt(this.objpage.current_page) - 1) : '';
		var next = this.objpage.current_page != this.objpage.total_pages ? this.nextPage(parseInt(this.objpage.current_page) + 1) : '';

		return previous + li + next;
	};

	paginate.prototype.generate = function(url, objpage) {
		this.url     = url;
		this.objpage = objpage;
		return this.ul();
	};
};

module.exports = paginate;
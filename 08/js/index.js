var direct = 0; //点击方向
var pageSize = 20; //每页显示的数量
var total; //所有的页码
var begin; //显示开始的位置
var end; // 显示结束的位置
var curPage = 0; //当前页
var alist = [];
var len; //所有商品总数
var prve; //前一页按钮
var last; // 下一页按钮
var changePage;
window.onload = function() {
	$.getJSON("url.json", function(result) {
		$.each(result, function(i, field) {
			len = field.length; //json数据的长度
			//console.log(len);//所要显示的商品总数
			var putpage = document.getElementById("putpage");
			var surebtn = document.getElementById("sure");
			var pageNav = document.getElementById("pageNav");
			var btnbox = document.getElementById("listbox");
			var ulbox = document.getElementById("goods");
			// var lis = ulbox.getElementsByClassName("goods");
			// len = lis.length; 
			var totalPage = pageNav.getElementsByClassName("tatlePage") //显示的商品总数的位置元素
			total = len % pageSize == 0 ? len / pageSize : Math.floor(len / pageSize) + 1;
			totalPage[0].innerHTML = total;

			for (var i = 2; i <= total; i++) {
				showPages(i, total);
			}

			btnbox.innerHTML = showPages(1, total);
			alist = document.getElementsByClassName("pages"); //获取所生成并显示的page按钮
			prve = document.getElementsByClassName("prev"); //设置前一页点击事件
			last = document.getElementsByClassName("last"); //设置下一页点击事件

			changePage = function changePage(obj) {
				//console.log(obj);
				for (var i = 0; i < alist.length; i++) {
					if (alist[i].innerHTML == obj) {
						alist[i].setAttribute('class', 'pages on');
					}
					alist[i].index = i;
					alist[i].onclick = function() {
						var nowpage = Number(this.textContent);
						putpage.value = nowpage;
						btnbox.innerHTML = showPages(nowpage, total);
						alist = document.getElementsByClassName("pages"); //更新页码按钮数组
						changePage(nowpage); //再次对新的按钮数组添加点击事件
						showContaint(nowpage); //点击页码按钮时更换对应的内容
						prve = document.getElementsByClassName("prev");
						last = document.getElementsByClassName("last");
						prveNext(prve[0], last[0], nowpage);
					}
				}
			}
			changePage(1);
			showContaint(1);

			function prveNext(obj1, obj2, pagenum) {
				obj1.onclick = function() {
					pagenum--;
					if (pagenum < 1) {
						alert("已经是第一页了");
						pagenum += 1;
						return;
					}
					goPrve(pagenum);
				}
				if (obj2) {
					obj2.onclick = function() {
						pagenum++;
						if (pagenum > total) {
							alert("已经是最后一页了");
							pagenum -= 1;
							return;
						}

						goNext(pagenum);
					}
				}
			}
			prveNext(prve[0], last[0], 1);
			surebtn.onclick = function(e) {
				e.preventDefault();
				var page = Number(putpage.value);
				if (page > total) {
					alert("超出数据页面");
					return;
				}
				btnbox.innerHTML = showPages(page, total);
				changePage(page);
				showContaint(page);
			}

			function showContaint(curPage) {
				var ulbox = document.getElementById("goods");
				//var lis = ulbox.getElementsByClassName("goods");
				begin = pageSize * (curPage - 1); // 起始记录号
				end = pageSize * (curPage - 1) + (pageSize - 1); // 末尾记录号
				//console.log(begin);
				//console.log(end);
				//console.log(field);
				//console.log(field[0].img1);
				var html = "";

				if (end < field.length) {
					for (var i = begin; i <= end; i++) {
						html += '<li class="goods">' + '<a href="">' + '<div class="images">' + '<img src="images/' + field[i].img1 + '">' + '</div>' + '<ul><li class="name"><a href="">商品名称</a></li><li class="price"><a href="">商品价格</a></li></ul>' + '</a>' + '</li>';
						ulbox.innerHTML = html;
					}
				}
			}

			function showPages(page, total) {
				var str = '<a class="pages" href="#">' + page + '</a>' + '';
				for (var i = 1; i <= 3; i++) {
					if (page - i > 1 && page > 1) {
						str = '<a class="pages" href="#">' + (page - i) + '</a>' + '' + str;
					}
					if (page + i < total) {
						str = str + '' + '<a class="pages" href="#">' + (page + i) + '</a>';
					}
				}

				if (page - 4 > 1) {
					str = '<b>' + '...' + '</b>' + '' + str;
				}
				if (page == 1) {
					str = '<a class="prev" href="#">' + '上一页' + '</a>' + '' + str;
				}

				if (page > 1) {
					str = '<a class="prev" href="#">' + '上一页' + '</a>' + '<a class="pages" href="#">' + 1 + '</a>' + '' + str;
				}

				if (page + 4 < total) {
					str = str + '' + '<b>' + '...' + '</b>';
				}

				if (page < total) {
					str = str + '' + '<a class="pages" href="#">' + total + '</a>' + '' + '<a class="last" href="#">' + '下一页' + '</a>';
				}
				return str;
			}

			function goPrve(curPage) {
				putpage.value = curPage;
				showContaint(curPage);
				setColor(curPage);

			}

			function goNext(curPage) {
				putpage.value = curPage;
				showContaint(curPage);
				setColor(curPage);
			}

			function setColor(curPage) {
				console.log(curPage);
				for (var i = 0; i < alist.length; i++) {
					if (alist[i].innerHTML == curPage) {
						alist[i].setAttribute('class', 'pages on');
					} else {
						alist[i].setAttribute('class', 'pages');
					}
				}
			}
		});
	});
}
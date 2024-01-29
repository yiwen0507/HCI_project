let body = document.querySelector('body');
let tooltip = document.getElementsByClassName("tooltip")[0];

// set rating stars
function setRate(id){
	let p_star = tooltip.querySelector(`#${id}`);
	console.log(p_star)
	let clicked = true
	let boundBox = p_star.getBoundingClientRect()
	let rating
	p_star.addEventListener("mousemove", (e) => {
		if(clicked && e.y){
			rating = ((e.x - boundBox.left) / boundBox.width * 5).toFixed(1);
			if(rating > 4.8) rating = 5;
			p_star.innerHTML = printStars(rating);
			p_star.data = rating;
		}
	})
	p_star.addEventListener("click", (e) => {
		clicked = !clicked;
		if(clicked && e.y){
			rating = ((e.x - boundBox.left) / boundBox.width * 5).toFixed(1);
			if(rating > 4.8) rating = 5;
			p_star.innerHTML = printStars(rating);
			p_star.data = rating;
		}
	})

	return rating
}

/************************************************************
 *                                                          *
 * All Initialize Functions                                 *
 *                                                          *
 * **********************************************************/
var parsedData;

document.addEventListener("DOMContentLoaded", async function(){
    parsedData = await fetchCSVData('review_sheet.csv',"review");
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const courseName = urlParams.get('courseName');
	const teacherName = urlParams.get('teacherName');
	
	const searchInput = document.querySelector("[name='search']");
	if(courseName && teacherName) searchInput.value = `${courseName} ${teacherName}`;
	
	var keyword_data = keyword_split(searchInput.value);
	//console.log("Search words: ", keyword_data);
	
	if (courseName && teacherName) {
		//console.log("The data has been set");
		// Wait for fetchReviewsFromCSV to complete
		var pre_render = filter_data(keyword_data,parsedData);
		//console.log(pre_render.length);
		if(pre_render.length===0){
			render("fail");
		}else{
			render(pre_render);
			//console.log("===== End of listing =====\nCurrent values of render list:\n", document.getElementsByClassName('all-course')[0]);
		}
	}
});
document.querySelector("[search-container]").addEventListener("submit", (e) => {
	e.preventDefault;
	//var keyword_data = keyword_split(e.target.search.value);
	//var finale = filter_data(keyword_data,parsedData);
	var finale = searchClick();
	//console.log("List: ",finale);
	if(finale.length===0){
		render("fail");
	}else render(finale);
})

document.querySelector("#wode").addEventListener("click", (e) => {
	render(parsedData.filter(d => d.user == "109550200"));
})

document.querySelector("#quanbu").addEventListener("click", (e) => {
	render(parsedData);
})

document.querySelector("#edit").addEventListener("click", (e) => {
	// console.log("Search Detected.",e);
	e.preventDefault();
	d = parsedData[1]
	tooltip.animate({opacity: 1},{
		duration: 500,
		fill: "both",	
	  });
	tooltip.style["pointer-events"] = "initial";

	let div_left = body.offsetLeft;
	let div_top = body.offsetTop;
	let Ar_width = body.offsetWidth;
	let Ar_height = body.offsetHeight;
	let div_width = 800;
	let div_height = 500;

	tooltip.style.top = `${200}px`;
	tooltip.style.left = `${Ar_width/2}px`;
	tooltip.style.width = `${div_width}px`;
	tooltip.style.height = `${div_height}px`;


	tooltip.querySelector('.review-container').innerHTML = `
	<div class="left">
		<p>課程名稱：<textarea id="course" rows="1"></textarea></h2>
		<p>授課教師：<textarea id="teach" rows="1"></textarea></p>
		<p class="reviewarea">評論區：</p>
		<textarea class="text-box" id="rev"></textarea>
	</div>
	<div class="right">
		<div class="button-container">
			<div id="exit-tooltip"><i class="fa fa-close"></i></div>
		</div>
		<div class="star-container" style="margin-top:45%; margin-right:10%">
			<p>
				<span> 甜度 </span>
				<span id="score" style="z-index:99">
				${printStars(0)}
				</span>
			</p>
			<p>
				<span> 涼度 </span>
				<span id="work" sty	le="z-index:99">
				${printStars(0)}
				</span>
			</p>
			<p>
				<span> 推薦 </span>
				<span id="rec" style="z-index:99">
				${printStars(0)}
				</span>
			</p>
			<div id="submit-tooltip" style="margin-top: 120%">
				<span id="submit">提交</span>
			</div>
		</div>
	</div>
	`;
	setRate('score');
	setRate('work');
	setRate('rec');
	tooltip.querySelector('#submit-tooltip').onclick = function() {
		let temp = {}
		Object.assign(temp, parsedData[1]);
		
		temp.scoring_star = tooltip.querySelector(`#score`).data;
		temp.workload_star = tooltip.querySelector(`#work`).data;
		temp.recommend_star = tooltip.querySelector(`#rec`).data;
		temp.course_name = tooltip.querySelector(`#course`).value;
		temp.prof_name = tooltip.querySelector(`#teach`).value;
		temp.review_box = tooltip.querySelector(`#rev`).value;
		temp.review_id = parsedData.length + 1;
		temp.user = 109550200;
		console.log(temp)

		parsedData.push(temp);
		writeDataToCSV()

		tooltip.animate({opacity: 0},{
			duration: 500,
			fill: "both",
		  });
		tooltip.style["pointer-events"] = "none";

		render(parsedData);

	};

	tooltip.querySelector("#exit-tooltip").addEventListener("click",(e) => {
		tooltip.animate({opacity: 0},{
			duration: 500,
			fill: "both",
		  });
		tooltip.style["pointer-events"] = "none";
	});
});

/************************************************************/

function printStars(stars){
	let text = '';
	for(let i = 0; i < 5; i++){
		if(stars >= 1){
			text += `<span class="fa fa-star checked"></span>`;
			stars -= 1;
		}
		else if(stars >= 0.5){
			text += `<span class="fa fa-star-half-full checked"></span>`;
			stars -= 0.5;
		}
		else{
			text += `<span class="fa fa-star-o checked"></span>`;
		}
	}
	return text;
}
// console.log(window.event)
function render(data){
	
	let container = document.getElementsByClassName('all-course')[0];
	/* =======================================================
		Below is the renew setting of 'all-course' element
	======================================================= */
	container.innerHTML = "";
	/* =======================================================
		Above is the renew setting of 'all-course' element
	======================================================= */

	//if failure on finding data value
	if(data==="fail"){
		container.innerHTML =
		`
		<div class="course">
			<span class="review_failure"
			styles="text-align: center;
					font-size: 10em;
					overflow: hidden;
					float: center;
			">
				<p><b>並未有相關評論，請重新查詢</b></p>
			</span>
			<!--<div class='left'>
				<p><b></b></p>
			</div>
			<div class='right'></div>-->
		</div>
		`;
		return false;
	}

	//顯示更多
	var txt_detail = "\u986f\u793a\u66f4\u591a";
	//推薦
	var txt_suggest = "\u63a8\u85a6:";
	
	//console.log(data);
	data.forEach((d, i) => {
		//console.log(d)

		//change from cloning the nodes into creating the element on js
		const element = document.createElement('div');
		element.className = "course";
		element.innerHTML = `
			<div class='left'>
				<p><b>${d.course_name}</b></p>
				<p class = "profname">${d.prof_name}</p>
				<a href="#/">${txt_detail}</a>
			</div>
			<div class='right'>
				<p>${txt_suggest}</p>
				<span> ${d.recommend_star}/5 </span>
				${printStars(d.recommend_star)}
			</div>
		`;

		container.appendChild(element)
		
		let link = element.querySelector('a');
		let div_left = element.offsetLeft;
		let div_top = element.offsetTop;
		let Ar_width = element.offsetWidth;
		let Ar_height = element.offsetHeight;
		let div_width = 800;
		let div_height = 500;

		link.onclick = function(){
			
			tooltip.animate({opacity: 1},{
				duration: 500,
				fill: "both",
			  });
			
			tooltip.style["pointer-events"] = "initial";
			tooltip.style.top = `${div_top - Ar_height }px`;
			tooltip.style.left = `${div_left + Ar_width/2}px`;
			tooltip.style.width = `${div_width}px`;
			tooltip.style.height = `${div_height}px`;
			
			tooltip.querySelector('.review-container').innerHTML = `
			<div class="left">
				<h1 style="margin-bottom: 0; margin-top:10px">${d.course_name}</h1>
				<p class="prof_rb">${d.prof_name}</p>
				<textarea class="text-box" disabled>${d.review_box}</textarea>
			</div>
			<div class="right">
				<div class="button-container">
					<div id="exit-tooltip"><i class="fa fa-close"></i></div>
				</div>
				<div class="star-container"  style="margin-top:165%; margin-right:10%">
					<p>
					<span> 甜度 </span>
					${printStars(d.scoring_star)}
					</p>
					<p>
					<span> 涼度 </span>
					${printStars(d.workload_star)}
					</p>
					<p>
					<span> 推薦 </span>
					${printStars(d.recommend_star)}
					</p>
				</div>
			</div>
			`;
			
			tooltip.querySelector("#exit-tooltip").addEventListener("click",(e) => {
				tooltip.animate({opacity: 0},{
					duration: 500,
					fill: "both",
				  });
				tooltip.style["pointer-events"] = "none";
			});

			console.log(tooltip)
			return false;
		}	
	});
}
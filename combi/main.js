let body = document.querySelector('body');
let tooltip = document.getElementsByClassName("tooltip")[0];
const USERID = 109550200;

// When the user clicks on the button, toggle between hiding and showing the dropdown content
function coursedd()
{
    document.getElementById("semesterdropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event)
{
    if (!event.target.matches('.dropbtn'))
    {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++)
        {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show'))
            {
                openDropdown.classList.remove('show');
            }
        }
    }
    if (!event.target.matches(".filterMenu")&&!event.target.matches(".filtext")){
        var filterPop = document.getElementsByClassName("filterMenu");
        //console.log("list: ",filterPop.classList);
        if(filterPop.classList){
            if(filterPop.classList.contains('show')){
                filterPop.classList.remove('show');
            }
        }
    }
}

var parsedData, parsedData2 , parsedData3, semesters = [];
const header = ["學期","課號","開課單位","課程名稱","時間地點","課程選別","學分","等級成績","成績狀態","任課老師","我的評價"]

document.addEventListener("DOMContentLoaded", async function(){
    parsedData = await fetchCSVData('ClassSampleData.csv',"course");
    parsedData2 = await fetchCSVData('review_sheet.csv',"review");
    //parsedData3 = await fetchCSVData('data112spring_courseselect.csv');
    showVerticalMode();

    parsedData.forEach(d => {
        if(!semesters.includes(d.學期)) semesters.push(d.學期)
        //console.log(semesters)
    });
    //console.log(parsedData)

    render();
});

function render(){
    var select = document.querySelector('#semesterdropdown');
        //全部 BUTTON
        var all = document.createElement('input');
        all.type = "button";
        all.value = `全部`;
        all.className = "uibtn btn-info";
        all.onclick = function(){
            makeTable(semesters);
        }   
        select.appendChild(all);

    //REST OF THE SEMESTER BUTTON
    semesters.forEach(sem => {
        const element = document.createElement('input');
        element.type = "button";

        const last_char = sem.slice(-1);
        const num_sem = sem.slice(0,-1);
        if( last_char == "上")element.value = `${num_sem}學年度 第1學期`;
        else if( last_char == "下")element.value = `${num_sem}學年度 第2學期`;
        else element.value = `${num_sem}學年度 ${last_char}期`;

        element.className = "uibtn btn-info";
        element.onclick = function(){
            makeTable([sem]);
        }   
        select.appendChild(element);
    });

    makeTable(semesters);
}

function makeTable(head)
{   
    const tabel = document.querySelector('.courseTable');
    tabel.innerHTML = "";
    head.forEach(sem => {
        const title = document.createElement('h4');
        title.innerHTML = sem;
        tabel.appendChild(title);

        const table = document.createElement('table');
        table.id = "semester_table"
        var trHead = document.createElement('tr');
        trHead.className = "borderHead";

        header.forEach(d => {
            var th = document.createElement('th');
            th.innerHTML = d;
            trHead.appendChild(th);
        })
        table.appendChild(trHead)

        var filteredDat = parsedData.filter(d => d.學期 == sem);
        filteredDat.forEach(d => {
            var tr = document.createElement('tr');

            header.forEach(col => {
                var td = document.createElement('td');
                if(col == "我的評價"){
                    CheckReview(td,d);
                    tr.appendChild(td);
                }
                else td.innerHTML = d[col];
                
                tr.appendChild(td);
            })

            table.appendChild(tr);
        });
        
        tabel.appendChild(table);

    });

}

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

function OnclickEdit(td,dat){
    td.querySelector("#edit").addEventListener("click", (e) => {
        console.log("Search Detected.",e);
        e.preventDefault();
        d = parsedData2[1]
        tooltip.animate({opacity: 1},{
            duration: 500,
            fill: "both",	
        });
        tooltip.style["pointer-events"] = "initial";

        let div_left = body.offsetLeft;
        let div_top = e.pageY
        let Ar_width = body.offsetWidth;
        let Ar_height = body.offsetHeight;
        let div_width = 800;
        let div_height = 500;

        tooltip.style.top = `${div_top - div_height/2}px`;
        tooltip.style.left = `${Ar_width/2}px`;
        tooltip.style.width = `${div_width}px`;
        tooltip.style.height = `${div_height}px`;


        tooltip.querySelector('.review-container').innerHTML = `
        <div class="left">
            <p>課程名稱：<textarea id="course" rows="1">${dat.課程名稱}</textarea></h2>
            <p>授課教師：<textarea id="teach" rows="1">${dat.任課老師}</textarea></p>
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
            Object.assign(temp, parsedData2[1]);
            
            temp.scoring_star = tooltip.querySelector(`#score`).data;
            temp.workload_star = tooltip.querySelector(`#work`).data;
            temp.recommend_star = tooltip.querySelector(`#rec`).data;
            temp.course_name = tooltip.querySelector(`#course`).value;
            temp.prof_name = tooltip.querySelector(`#teach`).value;
            temp.review_box = tooltip.querySelector(`#rev`).value;
            temp.review_id = parsedData2.length + 1;
            temp.user = USERID
            console.log(temp)

            parsedData2.push(temp);
            writeDataToCSV(parsedData2);

            tooltip.animate({opacity: 0},{
                duration: 500,
                fill: "both",
            });
            tooltip.style["pointer-events"] = "none";
            location.reload();

        };

        tooltip.querySelector("#exit-tooltip").addEventListener("click",(e) => {
            tooltip.animate({opacity: 0},{
                duration: 500,
                fill: "both",
            });
            tooltip.style["pointer-events"] = "none";
        });
    });
}

function OnclickRev(td,dat){
    td.querySelector("#review").addEventListener("click", (e) =>{
        // console.log(dat)
		
        console.log(parsedData2)
        console.log(dat)
        tooltip.animate({opacity: 1},{
            duration: 500,
            fill: "both",
          });
          tooltip.style["pointer-events"] = "initial";
        
          let div_left = body.offsetLeft;
          let div_top = e.pageY;
          let Ar_width = body.offsetWidth;
          let Ar_height = body.offsetHeight;
          let div_width = 800;
          let div_height = 500;
  
          tooltip.style.top = `${div_top - div_height/2}px`;
          tooltip.style.left = `${Ar_width/2}px`;
          tooltip.style.width = `${div_width}px`;
          tooltip.style.height = `${div_height}px`;
        
        tooltip.querySelector('.review-container').innerHTML = `
        <div class="left">
            <h1 style="margin-bottom: 0; margin-top:10px">${dat.course_name}</h1>
            <p class="prof_rb">${dat.prof_name}</p>
            <textarea class="text-box" disabled>${dat.review_box}</textarea>
        </div>
        <div class="right">
            <div class="button-container">
                <div id="exit-tooltip"><i class="fa fa-close"></i></div>
            </div>
            <div class="star-container"  style="margin-top:165%; margin-right:10%">
                <p>
                <span> 甜度 </span>
                ${printStars(dat.scoring_star)}
                </p>
                <p>
                <span> 涼度 </span>
                ${printStars(dat.workload_star)}
                </p>
                <p>
                <span> 推薦 </span>
                ${printStars(dat.recommend_star)}
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

    });
}
function CheckReview(td,dat){
    var da = parsedData2.filter(d => (d.course_name == dat.課程名稱) && (d.user == USERID) && (d.prof_name == dat.任課老師));
    console.log(da)
    if(da.length == 0){
        td.innerHTML = '<a href="#/" id="edit">評價</a>';
        OnclickEdit(td,dat);
    }
    else{
        td.innerHTML = '<a href="#/" id="review">我的評價</a>';
        OnclickRev(td,da[0]);
    }
}


// -------------- above is for list, below is for grid ----------------  

// for grid list layout switch
function showVerticalMode() {
    // 顯示 List 模式，隱藏 Grid 模式
    document.getElementById('gridContainer').style.display = 'flex';
    document.getElementById('listContainer').style.display = 'none';
}

// for grid list layout switch
function showHorizontalMode() {
    // 顯示 Grid 模式，隱藏 List 模式
    document.getElementById('gridContainer').style.display = 'none';
    document.getElementById('listContainer').style.display = 'block';
}

// -------------- above is for list, below is for grid ----------------
// moved to grid.js

// newsURL
var fetchNews = 'https://webit-news-search.p.rapidapi.com/search?q=covid&language=en';


//検索機能
function search() {
	let search = document.getElementById("search").value;
	let spSearch = document.getElementById("spSearch").value;
	let replacing = search.replace(/\s|　/g,'%20');
	let spReplacing = spSearch.replace(/\s|　/g,'%20');

	if(search.length = 0 ){
		var fetchNews = fetchNews;
	} else if(search.length > 1) {
		var fetchNews = 'https://webit-news-search.p.rapidapi.com/search?' +
						`q=${replacing}&` +
						'language=en';
	} else if(spSearch.length > 1) {
		var fetchNews = 'https://webit-news-search.p.rapidapi.com/search?' +
						`q=${spReplacing}&` +
						'language=en';
	} else{
		console.log("検索エラー")
	}

	fetch(fetchNews, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "***********************************",
			"x-rapidapi-host": "**************************************"
		}
	})
	.then((response) => {
		return response.json();
	}).then((result) => {
		const articleData = result.data['results'];
		articleLists = [];
		for(let item in articleData ){
			const newsURL = articleData[item]['url']
			const newsDate = articleData[item]['date']
			const imgUrl = articleData[item]['image'];
			const putUrl = ( typeof imgUrl !== 'undefined') ? imgUrl : './imgs/noImagePhoto.png';
			const title = articleData[item]['title'];
			
			articleLists.push(
				`<a href="${newsURL}" target="_blank" rel="noopener noreferrer">` +
				'<div class="newsBox">' +
				 `<img src="${putUrl}" class="newsImg" />` +
				 '<p class="newsTitle">' + title
				+ '</p>'
				+ '<small>' +  newsDate
				+ '</small>'
				+ '</div>'
				+ '</a>'
				);
		}
	
		document.getElementById('newsContainer').innerHTML = articleLists.join('');
	
		
		
		
		
		
		var x = document.getElementsByClassName('newsTitle');
		for (var i = 0; i < x.length; i++) {
			let titleText = x[i].textContent;
			titleText.replace(/\s+/g,'')
			x[i].innerHTML = truncate(titleText, 20);
		}
		function truncate(str, len){
				return str.length <= len ? str: (str.substr(0, len)+"...　>>続きはこちら");
		};
	}).catch((err) => {
		console.log(err)
	})
}


// 初期news表示

const newsData = fetch(fetchNews,{
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "************************************",
		"x-rapidapi-host": "****************************************"
	}
})
.then((response) => {
	return response.json();
}).then((result) => {
	const articleData = result.data['results'];
	articleLists = [];
	for(let item in articleData ){
		const newsURL = articleData[item]['url'];
		const newsDate = articleData[item]['date']
		const imgUrl = articleData[item]['image'];
		const putUrl = ( typeof imgUrl !== 'undefined') ? imgUrl : './imgs/noImagePhoto.png';
		const title = articleData[item]['title'];
		
		articleLists.push(
			`<a href="${newsURL}" target="_blank" rel="noopener noreferrer">` +
			'<div class="newsBox">' +
			 `<img src="${putUrl}" class="newsImg" />` +
			 '<p class="newsTitle">' + title
			+ '</p>'
			+ '<small>' +  newsDate
			+ '</small>'
			+ '</div>'
			+ '</a>'
			);
	}

	document.getElementById('newsContainer').innerHTML = articleLists.join('');

	
	
	
	
	
	var x = document.getElementsByClassName('newsTitle');
	for (var i = 0; i < x.length; i++) {
		let titleText = x[i].textContent;
		titleText.replace(/\s+/g,'')
		x[i].innerHTML = truncate(titleText, 25);
	}
	function truncate(str, len){
			return str.length <= len ? str: (str.substr(0, len)+"...　>>続きはこちら");
	};
}).catch((err) => {
	console.log(err)
})

